export async function getSuppliers() {
   try {
      const response = await fetch('/api/suppliers');

      if (!response.ok) {
         const errorDetails = await response.json();
         throw new Error(`Failed to fetch suppliers: ${errorDetails.message || response.statusText}`);
      }

      const data = (await response.json()) as unknown;

      if (!Array.isArray(data) || !data.every((item) => 'supplierProducts' in item)) {
         throw new Error('Invalid response structure');
      }

      return data;
   } catch (error) {
      console.error('Error in getSuppliers:', error);
      throw new Error(`Unable to fetch suppliers: ${(error as Error).message}`);
   }
}