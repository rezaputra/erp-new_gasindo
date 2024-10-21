import { Metadata } from 'next';
import { LoginForm } from '../_components/login-form';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Sign In",
}

function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage
