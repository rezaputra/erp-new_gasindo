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

import { purchasingOutSchema } from '@/lib/schema-scales';
import { cn } from '@/lib/utils';
import { useState, startTransition, useEffect } from "react";
import { purchasingScaleOut } from '@/actions/scales/purchasing-scale-out';
import { toast } from 'sonner';
import { FormError } from '@/components/form-error';


interface FormExitProps {
   id: string
   onClose: () => void;
   className?: string
}

export function FormExit({ id, onClose, className }: FormExitProps) {
   const [isPending, setIspending] = useState(false)
   const [error, setError] = useState<string | undefined>(undefined)


   const form = useForm<z.infer<typeof purchasingOutSchema>>({
      resolver: zodResolver(purchasingOutSchema),
      defaultValues: {
         id: id,
         tareWeight: 0,
         qualityFactor: ''
      }
   });

   const { setValue } = form;


   useEffect(() => {
      const fetchWeight = async () => {
         try {
            const response = await fetch("http://localhost:5000/api/scale/scale-test");
            const jsonData = await response.json();
            const fetchedWeight = jsonData.data.weight;
            setValue("tareWeight", fetchedWeight);
         } catch (error) {
            console.error("Error fetching weight data:", error);
         }
      };

      const interval = setInterval(fetchWeight, 1000);
      return () => clearInterval(interval);
   }, [setValue]);


   function onSubmit(values: z.infer<typeof purchasingOutSchema>) {
      setError(undefined)
      setIspending(true)
      startTransition(() => {
         purchasingScaleOut(values)
            .then((res) => {
               form.reset()
               setIspending(false)
               if (res?.error) {
                  setError(res.error)
                  toast.error(res.error)
               }
               if (res?.success) {
                  onClose()
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
               name="tareWeight"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Weight</FormLabel>
                     <FormControl>
                        <Input
                           type='number'
                           {...field}
                           disabled={isPending}
                           className='text-4xl py-10 text-center'
                        // placeholder='######'
                        // onChange={(e) => {
                        //    const value = e.target.value;
                        //    if (!value || value.length <= 7) {
                        //       field.onChange(value ? String(value) : '');
                        //    }
                        // }}
                        // onKeyDown={(e) => {
                        //    if (e.key.match(/[^0-9]/) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                        //       e.preventDefault();
                        //    }
                        // }}
                        // onPaste={(e) => {
                        //    const paste = e.clipboardData.getData('text');
                        //    if (paste.match(/[^0-9]/)) {
                        //       e.preventDefault();
                        //    }
                        // }}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="qualityFactor"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Sorting</FormLabel>
                     <FormControl>
                        <Input
                           type="text"
                           disabled={isPending}
                           placeholder='Enter sorting persentage'
                           {...field}
                           maxLength={4}
                           onKeyDown={(e) => {
                              if (
                                 e.key.match(/[^0-9.]/) &&
                                 e.key !== 'Backspace' &&
                                 e.key !== 'Tab' &&
                                 e.key !== 'ArrowLeft' &&
                                 e.key !== 'ArrowRight'
                              ) {
                                 e.preventDefault();
                              }
                              const currentValue = e.currentTarget.value;
                              if (e.key === '.' && currentValue.includes('.')) {
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
            <FormField
               control={form.control}
               name="id"
               render={({ field }) => (
                  <FormItem className='hidden'>
                     <FormControl>
                        <Input type='hidden' {...field} />
                     </FormControl>
                  </FormItem>
               )}
            />

            <FormError message={error} />

            <div className='flex justify-end'>
               <Button disabled={isPending} type="submit">Submit</Button>
            </div>

         </form>
      </Form >
   );
}
