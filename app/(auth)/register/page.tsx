import { Metadata } from 'next';
import { RegisterForm } from '../_components/register-form';
import { Suspense } from 'react';

export const metadata: Metadata = {
   title: "Sign In",
}

function RegisterPage() {
   return (
      <Suspense>
         <RegisterForm />
      </Suspense>
   )
}

export default RegisterPage