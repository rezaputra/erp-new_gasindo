'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { PurchasingScale } from '@prisma/client';
import { Edit, FileText, MoreHorizontal, Printer, SquareArrowOutUpRight, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ExitView } from '../exit-view';

interface CellActionProps {
  data: PurchasingScale;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true)
  };

  return (
    <>
      <ExitView id={data.id} isOpen={open} onClose={() => setOpen(false)} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/user/${data.id}`)}
          >
            <FileText className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          {
            data.exitTimestamp ? (
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Printer className="mr-2 h-4 w-4" /> Print
              </DropdownMenuItem>

            ) : (
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <div className="flex items-center space-x-4"><SquareArrowOutUpRight className=" size-4" /><span>Exit</span></div>
              </DropdownMenuItem>

            )
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
