import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET() {
   try {
      const suppliers = await db.supplier.findMany({
         include: {
            supplierProducts: {
               include: {
                  product: true,
               },
               where: {
                  product: {
                     isScalable: true,
                     isSellable: false,
                  }
               }
            }
         }
      });
      return NextResponse.json(suppliers);

   } catch (error) {
      console.error('Error fetching suppliers:', error);
      return NextResponse.json({ message: 'Failed to fetch suppliers' }, { status: 500 });
   }
}
