'use client';

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
import { AuthWrapper } from './auth-wrapper';
import { FormError } from './form-error';

import { RegisterSchema } from '@/lib/schema-auth';
import { register } from '@/actions/auth/register';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation"
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import Link from 'next/link';


export function RegisterForm() {
   const router = useRouter()
   const [error, setError] = useState<string | undefined>(undefined)
   const [isPending, startTransition] = useTransition()

   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirm_password: ""
      },
   })

   const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
      setError(undefined)

      startTransition(async () => {
         const res = await register(values)
         form.reset()

         if (res.error) {
            setError(res.error)
            toast.error(res.error)
         }
         if (res.success) {
            toast.success(res.success)
            router.push('/login')
         }
      })
   }



   return (
      <>
         <AuthWrapper title='Sign up' description='Create new account'>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-2"
               >
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input
                                 type="text" placeholder="John doe" disabled={isPending} {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 type="email" placeholder="example@mail.com" disabled={isPending} {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 type="password" placeholder="********" disabled={isPending} {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="confirm_password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Confirm password</FormLabel>
                           <FormControl>
                              <Input
                                 type="password" placeholder="********" disabled={isPending} {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormError message={error!} />

                  <Button disabled={isPending} className="ml-auto w-full" type="submit">
                     Continue
                  </Button>
               </form>
            </Form>
            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                     Or sign in
                  </span>
               </div>
            </div>
            <Link href={'/login'} className='mx-auto'>
               <Button variant={'link'}>
                  Sign In
               </Button>
            </Link>
         </AuthWrapper>
      </>
   );
}
