import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
   const session = await auth();

   if (!session?.user) {
      return redirect('/login');
   } else {
      redirect('/dashboard/overview');
      // return (
      //    <div>Hola</div>
      // )
   }
}