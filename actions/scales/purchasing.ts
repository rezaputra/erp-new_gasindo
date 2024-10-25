"use server";

import { currentUser } from "@/data/user";
import { db } from "@/lib/db";
import { purchaseInSchema } from "@/lib/schema-scales";
import { PurchaseTypeEnum } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function savePurchasingScale(values: z.infer<typeof purchaseInSchema>) {
   const user = await currentUser();

   if (!user) {
      return { error: "User is not authenticated." };
   }

   try {
      const validationResult = purchaseInSchema.safeParse(values);

      if (!validationResult.success) {
         const errors = validationResult.error.flatten().fieldErrors;
         return { error: "Invalid fields", details: errors };
      }

      const { id, weight, supplier, product, driver, licence_plate, driving_licence, origin } = validationResult.data;

      // console.log("Validated data:", validationResult.data);

      // return { success: "Purchase updated successfully" };

      // if (!id) {
      await db.purchasingScales.create({
         data: {
            bruto: Number(weight),
            supplierId: supplier,
            purchaseType: product as PurchaseTypeEnum,
            driver,
            entryTime: new Date(),
            drivingLicense: driving_licence,
            licensePlate: licence_plate,
            origin,
            operatorId: user.id,
         },
      });

      revalidatePath('dashboard/purchasing-scales');

      return { success: "Purchase created successfully" };
      // } else {
      //    const existingScale = await db.purchasingScales.findUnique({ where: { id } });

      //    if (!existingScale) {
      //       return { error: "Data not found." };
      //    } else {
      //       await db.purchasingScales.update({
      //          where: { id },
      //          data: {
      //             tara: weight,
      //             operatorId: user.id,
      //          },
      //       });

      //       revalidatePath('/dashboard/purchasing-scales');
      //       return { success: "Purchase updated successfully" };
      //    }
      // }

   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error creating/updating purchase scale:", error);
         return { error: "An unexpected error occurred", details: error.message };
      }

      console.error("Unknown error creating/updating purchase scale:", error);
      return { error: "An unknown error occurred." };
   }
}
