import { Supplier } from "@prisma/client";

export async function getSuppliers(): Promise<Supplier[]> {
   const response = await fetch('/api/suppliers');
   if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
   }
   return response.json();
}