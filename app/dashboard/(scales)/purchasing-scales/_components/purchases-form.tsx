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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PurchaseTypeEnum } from '@prisma/client';
import { purchaseInSchema } from '@/lib/schema-scales';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState, startTransition } from "react";
import { savePurchasingScale } from '@/actions/scales/purchasing';
import { toast } from 'sonner';
import { getSuppliers } from '@/data/api';


export function PurchasesForm() {
   const [isPending, setIspending] = useState(false)

   const form = useForm<z.infer<typeof purchaseInSchema>>({
      resolver: zodResolver(purchaseInSchema),
      defaultValues: {
         id: '',
         weight: '',
         product: '',
         supplier: '',
         driver: '',
         licence_plate: '',
         driving_licence: '',
         origin: ''
      }
   });

   const { data: suppliers, isLoading: is_supplier_pending, error: supplier_error, } = useQuery({
      queryKey: ["suppliers"],
      queryFn: getSuppliers,
   })


   function onSubmit(values: z.infer<typeof purchaseInSchema>) {
      setIspending(true)
      startTransition(() => {
         savePurchasingScale(values)
            .then((res) => {
               form.reset()
               setIspending(false)
               if (res?.error) {
                  toast.error(res.error)
               }
               if (res?.success) {
                  toast.success(res.success)
               }
            })
            .catch(() => toast.error("Something went wrong!"))
      })
   }

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-left text-xl font-bold">
               Records In
            </CardTitle>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                     control={form.control}
                     name="weight"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Weight</FormLabel>
                           <FormControl>
                              <Input
                                 type='text'
                                 {...field}
                                 disabled={isPending}
                                 className='text-4xl py-10 text-center'
                                 placeholder='######'
                                 onChange={(e) => {
                                    const value = e.target.value;
                                    if (!value || value.length <= 7) {
                                       field.onChange(value ? String(value) : '');
                                    }
                                 }}
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
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                     <FormField
                        control={form.control}
                        name="supplier"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Supplier</FormLabel>
                              <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select a supplier" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {is_supplier_pending ? (
                                       <div className='text-sm px-2 py-1'>Loading suppliers...</div>
                                    ) : supplier_error ? (
                                       <div>Error fetching suppliers</div>
                                    ) : suppliers && suppliers.length > 0 ? (
                                       suppliers.map((supplier) => (
                                          <SelectItem key={supplier.id} value={supplier.id}>
                                             {supplier.name}
                                          </SelectItem>
                                       ))
                                    ) : (
                                       <div className='text-sm px-2 py-1'>No suppliers available</div>
                                    )}
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Product</FormLabel>
                              <FormControl>
                                 <Input placeholder="Enter product" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     /> */}
                     <FormField
                        control={form.control}
                        name="product"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Product</FormLabel>
                              <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select a product" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value={PurchaseTypeEnum.PALM_FRUIT}>Palm fruit</SelectItem>
                                    <SelectItem value={PurchaseTypeEnum.DIESEL_FUEL}>Deasel fuel</SelectItem>
                                    <SelectItem value={PurchaseTypeEnum.CALCIUM}>Calcium</SelectItem>
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
                        name="licence_plate"
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
                        name="driving_licence"
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
                  </div>
                  {/* <FormField
                     control={form.control}
                     name="gender"
                     render={({ field }) => (
                        <FormItem className="space-y-3">
                           <FormLabel>Gender</FormLabel>
                           <FormControl>
                              <RadioGroup
                                 onValueChange={field.onChange}
                                 value={field.value}
                                 className="flex space-x-4"
                              >
                                 <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                       <RadioGroupItem value="male" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Male</FormLabel>
                                 </FormItem>
                                 <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                       <RadioGroupItem value="female" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Female</FormLabel>
                                 </FormItem>
                                 <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                       <RadioGroupItem value="other" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Other</FormLabel>
                                 </FormItem>
                              </RadioGroup>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  /> */}
                  <Button type="submit" disabled={isPending}>Submit</Button>

               </form>
            </Form>
         </CardContent>
      </Card>
   );
}
