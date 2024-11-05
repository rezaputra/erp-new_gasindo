"use server";

import { currentUser } from "@/data/user";
import { db } from "@/lib/db";
import { purchasingOutSchema } from "@/lib/schema-scales";
import { LocationType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function purchasingScaleOut(values: z.infer<typeof purchasingOutSchema>) {
   try {
      // Authenticate user
      const user = await currentUser();
      if (!user) return { error: "User is not authenticated" };

      // Verify user permissions
      const userDb = await db.user.findUnique({
         where: { id: user.id },
         include: { location: true }
      });

      if (!userDb || userDb.location?.type !== LocationType.MILL) {
         return { error: "User is not authorized" };
      }

      // Validate input schema
      const validationResult = purchasingOutSchema.safeParse(values);
      if (!validationResult.success) return { error: "Invalid fields", issues: validationResult.error.errors };

      const { id, tareWeight, qualityFactor } = validationResult.data;
      // const intTareWeight = tareWeight
      const floatQualityFactor = qualityFactor != null ? parseFloat(qualityFactor) : 0;

      // Fetch weighing log for validation
      const weighingLogDb = await db.weighingLog.findFirst({ where: { id, exitTime: null }, include: { item: true } });
      if (!weighingLogDb) return { error: "Driver not found" };
      if (weighingLogDb.grossWeight <= tareWeight) {
         return { error: "Tare weight cannot be greater than gross weight" };
      }

      // Calculate weights
      const netWeight = weighingLogDb.grossWeight - tareWeight;
      const finalWeight = netWeight * (1 - floatQualityFactor / 100);

      // Perform database updates within a transaction for atomicity
      await db.$transaction(async (tx) => {
         // Update weighing log
         await tx.weighingLog.update({
            where: { id },
            data: {
               locationId: userDb.location?.id,
               operatorId: userDb.id,
               tareWeight: tareWeight,
               quality: floatQualityFactor,
               exitTime: new Date(),
               netWeight,
               finalWeight,
            }
         });

         // Update stock
         await tx.stock.update({
            where: { itemId_locationId: { itemId: weighingLogDb.item.itemId, locationId: userDb.locationId! } },
            data: {
               remaining: {
                  increment: finalWeight
               }
            }
         });
      });

      // Revalidate the cache for updated view
      revalidatePath("/dashboard/purchasing-scale");

      return { success: "Purchase updated successfully" };

   } catch (error) {
      console.error("Error updating purchasing scale:", error);
      return {
         error: "An unexpected error occurred.",
         details: error instanceof Error ? error.message : "Unknown error."
      };
   }
}
