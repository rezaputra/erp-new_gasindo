import { PurchaseTypeEnum } from "@prisma/client";
import { z } from "zod";

export const purchaseInSchema = z.object({
   id: z.string().optional(),  // Optional field for identifying an existing purchase record
   weight: z.string().min(1, {
      message: 'Supplier is required.'
   }),
   supplier: z.string().min(1, {
      message: 'Supplier is required.'
   }),
   product: z.string().min(1, {
      message: 'Product is required.'
   }),
   driver: z.string().min(1, {
      message: 'Driver name is required.'
   }),
   licence_plate: z.string().min(1, {
      message: 'Licence plate is required.'
   }),
   driving_licence: z.string().min(1, {
      message: 'Driving licence is required.'
   }),
   origin: z.string().min(1, {
      message: 'Origin is required.'
   }),
});
