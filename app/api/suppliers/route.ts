import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { Supplier, Item, SupplierItem } from '@prisma/client';

export type SupplierWithItems = Supplier & {
   items: (SupplierItem & {
      item: Item;
   })[];
};

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const itemTypeCode = searchParams.get("code");

   if (!itemTypeCode) {
      return NextResponse.json({ message: 'Item parameter is required' }, { status: 400 });
   }

   try {
      const suppliersByItemType: SupplierWithItems[] = await db.supplier.findMany({
         include: {
            items: {
               include: {
                  item: true,
               },
               where: {
                  item: {
                     itemType: {
                        code: itemTypeCode
                     }
                  }
               }
            }
         }
      });

      // Filter out suppliers without matching items
      const filteredSuppliers = suppliersByItemType.filter(supplier => supplier.items.length > 0);

      // Check if filtered suppliers array is empty
      if (filteredSuppliers.length === 0) {
         return NextResponse.json({ message: 'Supplier not found' }, { status: 404 });
      }

      return NextResponse.json(filteredSuppliers);

   } catch (error) {
      console.error('Error fetching suppliers:', error);
      return NextResponse.json({ message: 'Failed to fetch suppliers' }, { status: 500 });
   }
}
