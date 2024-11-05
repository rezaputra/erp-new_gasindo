'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select';

import { purchasingInSchema } from '@/lib/schema-scales';
import { useQuery } from '@tanstack/react-query';
import { useState, startTransition, useEffect } from "react";
import { purchasingScaleIn } from '@/actions/scales/purchasing-scale-in';
import { toast } from 'sonner';
import { getSuppliers } from '@/data/api';
import { useFormPurScaleEntryStore } from '@/hooks/use-form-scale';
import { FormError } from '@/components/form-error';
import { cn } from '@/lib/utils';
import { Item } from '@prisma/client';
import { SupplierWithItems } from '@/app/api/suppliers/route';



export function FormEntry({ className }: { className?: string }) {
   const [isPending, setIspending] = useState(false)
   const [error, setError] = useState<string | undefined>(undefined)
   const [products, setProducts] = useState<Item[]>([]);
   const { setOpen } = useFormPurScaleEntryStore();

   const form = useForm<z.infer<typeof purchasingInSchema>>({
      resolver: zodResolver(purchasingInSchema),
      defaultValues: {
         grossWeight: 0,
         supplierId: '',
         // quarterId: 'cm2wwmm5p0000w3falr8zqfzt',
         itemId: '',
         driver: '',
         licenseNo: '',
         plateNo: '',
         origin: ''
      }
   });

   const { setValue } = form;

   useEffect(() => {
      const fetchWeight = async () => {
         try {
            const response = await fetch("http://localhost:5000/api/scale/scale-test");
            const jsonData = await response.json();
            const fetchedWeight = jsonData.data.weight;
            setValue("grossWeight", fetchedWeight);
         } catch (error) {
            console.error("Error fetching weight data:", error);
         }
      };
      const interval = setInterval(fetchWeight, 1000);

      return () => clearInterval(interval);
   }, [setValue]);


   const handleSetProduct = (selectedProducts: Item[]) => setProducts(selectedProducts);

   const { data: suppliers, isLoading: is_supplier_pending, error: supplier_error } = useQuery<SupplierWithItems[]>({
      queryKey: ["suppliers", "SP"],
      queryFn: () => getSuppliers("SP"),
      staleTime: 60000,
   });


   function onSubmit(values: z.infer<typeof purchasingInSchema>) {
      setError(undefined)
      setIspending(true)
      startTransition(() => {
         purchasingScaleIn(values)
            .then((res) => {
               form.reset()
               setIspending(false)
               if (res?.error) {
                  setError(res.error)
                  toast.error(res.error)
               }
               if (res?.success) {
                  setOpen(false)
                  toast.success(res.success)
               }
            })
            .catch(() => toast.error("Something went wrong!"))
      })
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8 text-foreground/80", className)} >
            <FormField
               control={form.control}
               name="grossWeight"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Weight</FormLabel>
                     <FormControl>
                        <Input
                           type="number"
                           {...field}
                           disabled={isPending}
                           className="text-4xl py-10 text-center"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <Select
                           disabled={is_supplier_pending || isPending}
                           onValueChange={(supplierId) => {
                              field.onChange(supplierId);
                              const selectedSupplier = suppliers?.find((supplier) => supplier.id === supplierId);
                              if (selectedSupplier) {
                                 handleSetProduct(selectedSupplier.items.map(sp => sp.item));
                              }
                           }}
                           value={field.value}
                        >
                           <FormControl>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select a supplier" />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              {is_supplier_pending ? (
                                 <div className="text-sm px-2 py-1">Loading suppliers...</div>
                              ) : supplier_error ? (
                                 <div>Error fetching suppliers</div>
                              ) : suppliers?.length ? (
                                 suppliers.map((supplier) => (
                                    <SelectItem key={supplier.id} value={supplier.id}>
                                       <div className=' text-sm text-foreground/80'>
                                          <p>{supplier.name}</p><p className='text-xs text-muted-foreground font-semibold'>{supplier.code}</p>
                                       </div>
                                    </SelectItem>
                                 ))
                              ) : (
                                 <div className="text-sm px-2 py-1">No suppliers available</div>
                              )}
                           </SelectContent>
                        </Select>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="itemId"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Product</FormLabel>
                        <Select
                           disabled={!products.length || isPending}
                           onValueChange={field.onChange}
                           value={field.value}
                        >
                           <FormControl>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select a product" />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              {products.length ? (
                                 products.map((product) => (
                                    <SelectItem key={product.id} value={product.id}>
                                       {product.name}
                                    </SelectItem>
                                 ))
                              ) : (
                                 <div className="text-sm px-2 py-1">No products available</div>
                              )}
                           </SelectContent>
                        </Select>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="driver"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Driver</FormLabel>
                        <FormControl>
                           <Input
                              type="text"
                              placeholder="Enter driver name"
                              disabled={isPending}
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="plateNo"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>License plate</FormLabel>
                        <FormControl>
                           <Input type='text' min={0} placeholder="Enter car plate number" disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="licenseNo"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Driving Licence</FormLabel>
                        <FormControl>
                           <Input
                              type='text'
                              placeholder="Enter driver's driving licence"
                              disabled={isPending}
                              {...field}
                              onKeyDown={(e) => {
                                 if (e.key.match(/[^0-9]/) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                    e.preventDefault();
                                 }
                              }}
                              onPaste={(e) => {
                                 const paste = e.clipboardData.getData('text');
                                 if (paste.match(/[^0-9]/)) {
                                    e.preventDefault();
                                 }
                              }}
                              onChange={(e) => {
                                 const value = String(e.target.value);
                                 if (!isNaN(Number(value)) && Number(value) >= 0) {
                                    field.onChange(value);
                                 } else {
                                    field.onChange('');
                                 }
                              }}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Origin</FormLabel>
                        <FormControl>
                           <Input placeholder="Enter car origin" disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               {/* <FormField
                  control={form.control}
                  name="quarterId"
                  render={({ field }) => (
                     <FormItem className='hidden'>
                        <FormControl>
                           <Input type='hidden' {...field} />
                        </FormControl>
                     </FormItem>
                  )}
               /> */}
            </div>

            <FormError message={error} />

            <div className='flex justify-end'>
               <Button type="submit" disabled={isPending}>Submit</Button>
            </div>

         </form>
      </Form>
   );
}
