'use client';

import { productSearchParams } from '@/lib/productSearchParams';
import { Product } from '@prisma/client';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

// export function useGenerateProductOptions({ products }: { products: Product[] }) {
//   const PRODUCT_OPTIONS = products.map(product => ({
//     value: product.id,
//     label: product.name,
//   }));


//   return PRODUCT_OPTIONS
// }

// export const PRODUCT_OPTIONS = [
//   { value: 'PurchasingScaleProductEnum.PALM_FRUIT', label: 'Palm fruit' },
//   { value: 'PurchasingScaleProductEnum.DIESEL_FUEL', label: 'Deasel fuel' },
//   { value: 'PurchasingScaleProductEnum.CALCIUM', label: 'Calcium' },
// ];

export function usePruchasingScaleTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    productSearchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [productFilter, setProductFilter] = useQueryState(
    'product',
    productSearchParams.product.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    productSearchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setProductFilter(null);

    setPage(1);
  }, [setSearchQuery, setProductFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!productFilter;
  }, [searchQuery, productFilter]);

  return {
    searchQuery,
    setSearchQuery,
    productFilter,
    setProductFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  };
}
