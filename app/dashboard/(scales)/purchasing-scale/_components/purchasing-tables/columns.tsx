'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { PurchasingScale } from '@prisma/client';



export const columns: ColumnDef<PurchasingScale>[] = [
  {
    id: 'select',
    // header: 'Exit',
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={table.getIsAllPageRowsSelected()}
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
    cell: ({ row }) => (
      <Checkbox className=' mb-2'
        checked={!!row.original.exitTimestamp}
        // onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        disabled={true}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'licensePlate',
    header: 'PLATE',
  },
  {
    accessorKey: 'driver',
    header: 'DRIVER'
  },
  {
    accessorKey: 'supplierProduct.product.name',
    header: 'PRODUCT'
  },
  {
    accessorKey: 'origin',
    header: 'ORIGIN'
  },
  {
    accessorKey: 'grossWeight',
    header: 'GROSS'
  },
  {
    accessorKey: 'tareWeight',
    header: 'TARE'
  },
  // {
  //   accessorKey: 'sorting',
  //   header: 'SORTING'
  // },
  {
    accessorKey: 'finalNetWeight',
    header: 'FINAL WEIGHT'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
