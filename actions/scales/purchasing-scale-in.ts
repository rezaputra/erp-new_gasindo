"use server";

import { currentUser } from "@/data/user";
import { db } from "@/lib/db";
import { purchasingInSchema } from "@/lib/schema-scales";
import { QuarterTypeEnum } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function purchasingScaleIn(values: z.infer<typeof purchasingInSchema>) {
   const user = await currentUser();
   if (!user) {
      return { error: "User is not authenticated." };
   }

   const userDb = await db.user.findUnique({ where: { id: user.id }, include: { quarter: true } })

   if (!userDb || userDb.quarter?.type != QuarterTypeEnum.MILL) {
      return { error: "User is not authorized." };
   }

   const validationResult = purchasingInSchema.safeParse(values);
   if (!validationResult.success) {
      return { error: "Invalid fields" };
   }

   const { supplierId, productId, driver, licensePlate, drivingLicense, origin, grossWeight } = validationResult.data;

   const supplierProductDb = await db.supplierProduct.findFirst({
      where: {
         productId, supplierId, product: {
            isScalable: true,
            isSellable: false,
         }
      }
   })

   if (!supplierProductDb) {
      return { error: "Product is not found in supplier." };
   }

   const existingDriverEntry = await db.purchasingScale.findFirst({
      where: {
         OR: [
            { drivingLicense },
            { licensePlate },
         ],
         exitTimestamp: null,
      },
   });

   if (existingDriverEntry) {
      return { error: "An active entry for this driver or license plate already exists." };;
   }

   const productPriceHistoryDb = await db.productPriceHistory.findFirst({
      where: { supplierProductId: supplierProductDb.id },
      orderBy: { createdAt: 'desc' },
   });

   if (!productPriceHistoryDb) {
      return { error: "No price found for this supplier." };
   }

   try {

      await db.purchasingScale.create({
         data: {
            quarterId: userDb.quarter.id,
            operatorId: userDb.id,
            supplierProductId: supplierProductDb.id,
            productPriceHistoryId: productPriceHistoryDb.id,
            driver,
            entryTimestamp: new Date(),
            drivingLicense,
            licensePlate,
            origin,
            grossWeight: parseInt(grossWeight),
         },
      });

      revalidatePath('dashboard/purchasing-scale');

      return { success: "Purchase created successfully" };

   } catch (error) {
      console.error("Error creating purchase scale:", error);
      return {
         error: "An unexpected error occurred",
         details: error instanceof Error ? error.message : "Unknown error.",
      };
   }
}
