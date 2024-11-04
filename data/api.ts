import { SupplierWithItems } from "@/app/api/suppliers/route";

export async function getSuppliers(code: string): Promise<SupplierWithItems[]> {
   try {
      const response = await fetch(`/api/suppliers?code=${encodeURIComponent(code)}`);

      if (!response.ok) {
         const errorDetails = await response.json();
         throw new Error(errorDetails.message || 'Failed to fetch suppliers');
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data) || !data.every((item) => typeof item === 'object' && 'items' in item)) {
         throw new Error('Invalid response structure');
      }

      return data as SupplierWithItems[];
   } catch (error) {
      console.error('Error in getSuppliers:', error);

      if (error instanceof SyntaxError) {
         throw new Error('Error parsing response');
      }
      throw new Error(`Unable to fetch suppliers: ${(error as Error).message}`);
   }
}
