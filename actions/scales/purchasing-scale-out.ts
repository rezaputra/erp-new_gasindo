"use server";

import { currentUser } from "@/data/user";
import { db } from "@/lib/db";
import { purchasingOutSchema } from "@/lib/schema-scales";
import { QuarterTypeEnum } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function purchasingScaleOut(values: z.infer<typeof purchasingOutSchema>) {
   const user = await currentUser();

   // Check for authenticated user
   if (!user) return { error: "User is not authenticated." };

   // Fetch user and quarter data
   const userDb = await db.user.findUnique({
      where: { id: user.id },
      include: { quarter: true }
   });

   // Ensure user is authorized
   if (!userDb || userDb.quarter?.type !== QuarterTypeEnum.MILL) {
      return { error: "User is not authorized." };
   }

   // Validate input data
   const validationResult = purchasingOutSchema.safeParse(values);
   if (!validationResult.success) {
      return { error: "Invalid fields.", issues: validationResult.error.errors };
   }

   const { id, tareWeight, qualityFactor } = validationResult.data;

   // Fetch the purchasing scale entry
   const purchasingScaleDb = await db.purchasingScale.findFirst({
      where: { id, exitTimestamp: null }
   });

   // Check if the purchasing scale entry exists and is valid
   if (!purchasingScaleDb) {
      return { error: "Data not found or driver has exited." };
   }

   // Validate tareWeight against grossWeight
   if (purchasingScaleDb.grossWeight <= Number(tareWeight)) {
      return { error: "Tare weight cannot be greater than gross weight." };
   }

   try {
      const intTareWeight = Number(tareWeight);
      const floatQualityFactor = qualityFactor ? parseFloat(qualityFactor) : undefined;

      // Calculate initial net weight
      const initialNetWeight = purchasingScaleDb.grossWeight - intTareWeight;

      // Calculate final net weight with quality factor adjustment if applicable
      const finalNetWeight = floatQualityFactor !== undefined
         ? initialNetWeight * (1 - floatQualityFactor / 100)
         : initialNetWeight;

      await db.purchasingScale.update({
         where: { id },
         data: {
            tareWeight: intTareWeight,
            ...(floatQualityFactor !== undefined && { qualityFactor: floatQualityFactor }),
            exitTimestamp: new Date(),
            initialNetWeight,
            finalNetWeight,
         }
      });

      revalidatePath("/dashboard/purchasing-scale");

      return { success: "Purchase update successfully" };

   } catch (error) {
      console.error("Error updating purchasing scale:", error);
      return {
         error: "An unexpected error occurred.",
         details: error instanceof Error ? error.message : "Unknown error."
      };
   }
}
