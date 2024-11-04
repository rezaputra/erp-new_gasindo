'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { columns } from './columns';
import { usePruchasingScaleTableFilters } from './use-employee-table-filters';
import { Item, WeighingLog } from '@prisma/client';

export default function PurchasingScalesTable({ data, totalData, products }: {
  data: WeighingLog[];
  totalData: number;
  products: Item[];
}) {
  const {
    productFilter,
    setProductFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = usePruchasingScaleTableFilters();

  const PRODUCT_OPTIONS = products.map(product => ({
    value: product.id,
    label: product.name,
  }));

  // const productOptions = useGenerateProductOptions(products as any)


  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="plate or driver"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="product"
          title="Product"
          options={PRODUCT_OPTIONS}
          setFilterValue={setProductFilter}
          filterValue={productFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
