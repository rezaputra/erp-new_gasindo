'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format, isAfter } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

type CalendarDateRangePickerProps = {
  className?: string;
  startDate?: Date | null;
  endDate?: Date | null;
};

export function CalendarDateRangePicker({
  className,
  startDate,
  endDate
}: CalendarDateRangePickerProps) {
  // Set default to last two days if startDate and endDate are not provided
  const defaultStartDate = addDays(new Date(), -2);
  const defaultEndDate = new Date(); // Today

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate || defaultStartDate,
    to: endDate || defaultEndDate,
  });

  // Disable dates after today
  const disableAfterToday = (date: Date) => isAfter(date, new Date());

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={disableAfterToday}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
