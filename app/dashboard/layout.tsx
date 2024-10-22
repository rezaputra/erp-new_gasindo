import AppSidebar from '@/components/layout/app-sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Dashboard',
   description: 'ERP dashboard for PT. NEW GASINDO'
};

export default function DashboardLayout({
   children
}: {
   children: React.ReactNode;
}) {
   return (
      <>
         <AppSidebar>{children}</AppSidebar>
      </>
   );
}