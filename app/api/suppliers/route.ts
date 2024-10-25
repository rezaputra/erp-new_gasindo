// app/api/suppliers/route.ts

import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { Supplier } from '@prisma/client';


export async function GET() {
   try {
      const suppliers: Supplier[] = await db.supplier.findMany();
      return NextResponse.json(suppliers); // Send the data as JSON response
   } catch (error) {
      console.error('Error fetching suppliers:', error);
      return NextResponse.json({ message: 'Failed to fetch suppliers' }, { status: 500 }); // Return JSON response with error message and status code
   }
}
