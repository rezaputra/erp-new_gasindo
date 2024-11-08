import { z } from "zod";

export const purchasingInSchema = z.object({
   // quarterId: z.string().min(1, {
   //    message: 'Mill origin is required.'
   // }),
   supplierId: z.string().min(1, {
      message: 'Supplier is required'
   }),
   itemId: z.string().min(1, {
      message: 'Item is required'
   }),
   driver: z.string().min(1, {
      message: 'Driver name is required'
   }),
   plateNo: z.string().min(1, {
      message: 'Licence plate is required'
   }),
   licenseNo: z.string().min(1, {
      message: 'Driving licence is required'
   }),
   origin: z.string().min(1, {
      message: 'Origin is required'
   }),
   grossWeight: z.number().min(1, {
      message: 'Gross weight is required'
   }),
});

export const purchasingOutSchema = z.object({
   id: z.string().min(1, { message: 'Mill origin is required.' }),
   qualityFactor: z.string()
      .optional()
      .refine(value => {
         if (!value) return true;
         const floatValue = parseFloat(value);
         const isValidFloat = !isNaN(floatValue) && floatValue >= 1 && floatValue <= 100;

         return isValidFloat;
      }, {
         message: "Quality factor must between 1 and 100.",
      }),
   tareWeight: z.number().min(1, { message: 'Tare weight is required.' })
});
