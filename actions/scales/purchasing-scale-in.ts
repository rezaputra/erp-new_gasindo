"use server";

import { currentUser } from "@/data/user";
import { db } from "@/lib/db";
import { purchasingInSchema } from "@/lib/schema-scales";
import { LocationType, WeighingType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function purchasingScaleIn(values: z.infer<typeof purchasingInSchema>) {
   try {
      // Authenticate and validate the user
      const user = await currentUser();
      if (!user) return { error: "User is not authenticated" };

      const userDb = await db.user.findUnique({
         where: { id: user.id },
         include: { location: true }
      });
      if (!userDb || userDb.location?.type !== LocationType.MILL) {
         return { error: "User is not authorized" };
      }

      // Validate the input schema
      const { success, data: parsedValues } = purchasingInSchema.safeParse(values);
      if (!success) return { error: "Invalid fields" };

      const { supplierId, itemId, driver, licenseNo, plateNo, origin, grossWeight } = parsedValues;

      // Retrieve supplier item details
      const supplierItemDb = await db.supplierItem.findUnique({
         where: { supplierId_itemId: { supplierId, itemId } }
      });
      // const supplierItemDb = await db.supplierItem.findFirst({
      //    where: { item: { itemType: { code: "SP" } } }
      // });
      if (!supplierItemDb) return { error: "Item is not found in supplier." };

      // Check for existing active entries
      const existingEntry = await db.weighingLog.findFirst({
         where: {
            OR: [{ licenseNo }, { plateNo }],
            type: WeighingType.INCOMING,
            exitTime: null,
         },
      });
      if (existingEntry) return { error: "An active entry for this driver or license plate already exists." };

      // Fetch latest price history
      const productPriceHistoryDb = await db.priceHistory.findFirst({
         where: { item: { itemId, supplierId } },
         orderBy: { createdAt: "desc" },
      });
      if (!productPriceHistoryDb) return { error: "No price found for this supplier." };

      // Perform operations within a transaction
      await db.$transaction(async (tx) => {
         // Ensure stock record exists or create if missing
         await tx.stock.upsert({
            where: { itemId_locationId: { itemId, locationId: userDb.locationId! } },
            update: {},  // No updates are required if the stock entry already exists
            create: { itemId, locationId: userDb.locationId!, remaining: 0 }
         });

         // Create weighing log entry
         await tx.weighingLog.create({
            data: {
               locationId: userDb.locationId!,
               operatorId: userDb.id,
               itemId: supplierItemDb.id,
               type: WeighingType.INCOMING,
               priceId: productPriceHistoryDb.id,
               driver,
               licenseNo,
               plateNo,
               origin,
               grossWeight: grossWeight,
            },
         });
      });


      // Revalidate the dashboard path
      revalidatePath("dashboard/purchasing-scale");

      return { success: "Purchase created successfully" };

   } catch (error) {
      console.error("Error creating purchase scale:", error);
      return {
         error: "An unexpected error occurred",
         details: error instanceof Error ? error.message : "Unknown error.",
      };
   }
}
