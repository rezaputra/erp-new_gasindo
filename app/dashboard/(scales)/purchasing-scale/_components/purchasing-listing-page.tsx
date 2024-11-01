import PageContainer from '@/components/layout/page-container';
import { Button, buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import EmployeeTable from './purchasing-tables';
import { productSearchParamsCache } from '@/lib/productSearchParams';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { currentUser } from '@/data/user';
import { EntryView } from './entry-view';

export default async function PurchasingListingPage() {
  const user = await currentUser();

  const page = productSearchParamsCache.get('page');
  const search = productSearchParamsCache.get('q') || '';
  const product = productSearchParamsCache.get('product') || '';
  const pageLimit = productSearchParamsCache.get('limit');
  const productsArray = product ? product.split('.') : [];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const filters: Prisma.PurchasingScaleFindManyArgs = {
    skip: (page - 1) * pageLimit,
    take: pageLimit,
    where: {
      ...(search
        ? {
          OR: [
            { licensePlate: { contains: search, mode: 'insensitive' } },
            { driver: { contains: search, mode: 'insensitive' } },
          ],
        }
        : {}),
      ...(productsArray.length > 0
        ? { supplierProduct: { productId: { in: productsArray } } }
        : {}),
      createdAt: { gte: sevenDaysAgo },
      quarterId: user?.quarterId,
    },
    orderBy: [
      { entryTimestamp: 'asc' },
      { createdAt: 'desc' },
    ],
    include: {
      supplierProduct: {
        include: {
          supplier: true,
          product: true,
        },
      },
    },
  };


  const data = await db.purchasingScale.findMany(filters);

  const products = await db.product.findMany({ where: { isScalable: true, isSellable: false } })
  const totalData = data.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Purchase`}
            description="Manage last 7 days of purchase data"
          />
          <EntryView />
        </div>
        <Separator />
        <EmployeeTable data={data} totalData={totalData} products={products} />
      </div>
    </PageContainer>
  );
}
