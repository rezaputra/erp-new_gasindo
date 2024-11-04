'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { WeighingLog } from '@prisma/client';



export const columns: ColumnDef<WeighingLog>[] = [
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
        checked={!!row.original.exitTime}
        // onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        disabled={true}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'plateNo',
    header: 'PLATE',
  },
  {
    accessorKey: 'driver',
    header: 'DRIVER'
  },
  {
    accessorKey: 'item.item.name',
    header: 'PRODUCT'
  },
  {
    accessorKey: 'grossWeight',
    header: 'GROSS'
  },
  {
    accessorKey: 'tareWeight',
    header: 'TARE'
  },
  {
    accessorKey: 'quality',
    header: 'SORTING'
  },
  {
    accessorKey: 'finalWeight',
    header: 'FINAL WEIGHT'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
