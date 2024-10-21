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
import { loginSchema } from '@/lib/auth-schema';
import { login } from '@/actions/auth/login';
import { AuthWrapper } from './auth-wrapper';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import Link from 'next/link';
import { FormError } from './form-error';


export function LoginForm() {
  const [error, setError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(undefined)

    startTransition(async () => {
      const res = await login(values, callbackUrl)
      form.reset()

      if (res?.error) {
        setError(res.error)
        toast.error(res.error)
      }
      if (res?.redirect) {
        toast.success("Login successfull")
        router.push(res?.redirect)
      }
    })
  }
  return (
    <>
      <AuthWrapper title='Sign In' description='Sign in to your account'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
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
              Or create account
            </span>
          </div>
        </div>
        <Link href={'/register'} className='mx-auto'>
          <Button variant={'link'}>
            Sign Up
          </Button>
        </Link>
      </AuthWrapper>
    </>
  );
}
