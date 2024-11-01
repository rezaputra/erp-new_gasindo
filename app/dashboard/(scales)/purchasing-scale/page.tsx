import { productSearchParamsCache } from '@/lib/productSearchParams';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import PurchasingListingPage from './_components/purchasing-listing-page'
type pageProps = {
   searchParams: SearchParams;
};

export const metadata = {
   title: 'Dashboard : Purchasing Scales'
};

export default async function Page({ searchParams }: pageProps) {
   // Allow nested RSCs to access the search params (in a type-safe way)
   productSearchParamsCache.parse(searchParams);

   return <PurchasingListingPage />;
}