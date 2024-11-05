import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import EmployeeTable from './purchasing-tables';
import { productSearchParamsCache } from '@/lib/productSearchParams';
import { Prisma, WeighingType } from '@prisma/client';
import { db } from '@/lib/db';
import { currentUser } from '@/data/user';
import { EntryView } from './entry-view';
import { redirect } from 'next/navigation';

export default async function PurchasingListingPage() {
  const user = await currentUser();

  const userDb = await db.user.findUnique({ where: { id: user?.id } })

  if (!userDb) {
    return
  }

  const page = productSearchParamsCache.get('page');
  const search = productSearchParamsCache.get('q') || '';
  const product = productSearchParamsCache.get('product') || '';
  const pageLimit = productSearchParamsCache.get('limit');
  const productsArray = product ? product.split('.') : [];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const filters: Prisma.WeighingLogFindManyArgs = {
    skip: (page - 1) * pageLimit,
    take: pageLimit,
    where: {
      ...(search
        ? {
          OR: [
            { plateNo: { contains: search, mode: 'insensitive' } },
            { driver: { contains: search, mode: 'insensitive' } },
          ],
        }
        : {}),
      ...(productsArray.length > 0
        ? { item: { itemId: { in: productsArray } } }
        : {}),
      createdAt: { gte: sevenDaysAgo },
      locationId: userDb.locationId!,
      type: WeighingType.INCOMING
    },
    orderBy: [
      { entryTime: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      item: {
        include: {
          supplier: true,
          item: true,
        },
      },
    },
  };


  const data = await db.weighingLog.findMany(filters);

  const products = await db.item.findMany({ where: { itemType: { code: "SP" } } })
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
