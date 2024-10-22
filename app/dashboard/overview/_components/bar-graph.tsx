'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', sales: 222, purchase: 150 },
  { date: '2024-04-02', sales: 97, purchase: 180 },
  { date: '2024-04-03', sales: 167, purchase: 120 },
  { date: '2024-04-04', sales: 242, purchase: 260 },
  { date: '2024-04-05', sales: 373, purchase: 290 },
  { date: '2024-04-06', sales: 301, purchase: 340 },
  { date: '2024-04-07', sales: 245, purchase: 180 },
  { date: '2024-04-08', sales: 409, purchase: 320 },
  { date: '2024-04-09', sales: 59, purchase: 110 },
  { date: '2024-04-10', sales: 261, purchase: 190 },
  { date: '2024-04-11', sales: 327, purchase: 350 },
  { date: '2024-04-12', sales: 292, purchase: 210 },
  { date: '2024-04-13', sales: 342, purchase: 380 },
  { date: '2024-04-14', sales: 137, purchase: 220 },
  { date: '2024-04-15', sales: 120, purchase: 170 },
  { date: '2024-04-16', sales: 138, purchase: 190 },
  { date: '2024-04-17', sales: 446, purchase: 360 },
  { date: '2024-04-18', sales: 364, purchase: 410 },
  { date: '2024-04-19', sales: 243, purchase: 180 },
  { date: '2024-04-20', sales: 89, purchase: 150 },
  { date: '2024-04-21', sales: 137, purchase: 200 },
  { date: '2024-04-22', sales: 224, purchase: 170 },
  { date: '2024-04-23', sales: 138, purchase: 230 },
  { date: '2024-04-24', sales: 387, purchase: 290 },
  { date: '2024-04-25', sales: 215, purchase: 250 },
  { date: '2024-04-26', sales: 75, purchase: 130 },
  { date: '2024-04-27', sales: 383, purchase: 420 },
  { date: '2024-04-28', sales: 122, purchase: 180 },
  { date: '2024-04-29', sales: 315, purchase: 240 },
  { date: '2024-04-30', sales: 454, purchase: 380 },
  { date: '2024-05-01', sales: 165, purchase: 220 },
  { date: '2024-05-02', sales: 293, purchase: 310 },
  { date: '2024-05-03', sales: 247, purchase: 190 },
  { date: '2024-05-04', sales: 385, purchase: 420 },
  { date: '2024-05-05', sales: 481, purchase: 390 },
  { date: '2024-05-06', sales: 498, purchase: 520 },
  { date: '2024-05-07', sales: 388, purchase: 300 },
  { date: '2024-05-08', sales: 149, purchase: 210 },
  { date: '2024-05-09', sales: 227, purchase: 180 },
  { date: '2024-05-10', sales: 293, purchase: 330 },
  { date: '2024-05-11', sales: 335, purchase: 270 },
  { date: '2024-05-12', sales: 197, purchase: 240 },
  { date: '2024-05-13', sales: 197, purchase: 160 },
  { date: '2024-05-14', sales: 448, purchase: 490 },
  { date: '2024-05-15', sales: 473, purchase: 380 },
  { date: '2024-05-16', sales: 338, purchase: 400 },
  { date: '2024-05-17', sales: 499, purchase: 420 },
  { date: '2024-05-18', sales: 315, purchase: 350 },
  { date: '2024-05-19', sales: 235, purchase: 180 },
  { date: '2024-05-20', sales: 177, purchase: 230 },
  { date: '2024-05-21', sales: 82, purchase: 140 },
  { date: '2024-05-22', sales: 81, purchase: 120 },
  { date: '2024-05-23', sales: 252, purchase: 290 },
  { date: '2024-05-24', sales: 294, purchase: 220 },
  { date: '2024-05-25', sales: 201, purchase: 250 },
  { date: '2024-05-26', sales: 213, purchase: 170 },
  { date: '2024-05-27', sales: 420, purchase: 460 },
  { date: '2024-05-28', sales: 233, purchase: 190 },
  { date: '2024-05-29', sales: 78, purchase: 130 },
  { date: '2024-05-30', sales: 340, purchase: 280 },
  { date: '2024-05-31', sales: 178, purchase: 230 },
  { date: '2024-06-01', sales: 178, purchase: 200 },
  { date: '2024-06-02', sales: 470, purchase: 410 },
  { date: '2024-06-03', sales: 103, purchase: 160 },
  { date: '2024-06-04', sales: 439, purchase: 380 },
  { date: '2024-06-05', sales: 88, purchase: 140 },
  { date: '2024-06-06', sales: 294, purchase: 250 },
  { date: '2024-06-07', sales: 323, purchase: 370 },
  { date: '2024-06-08', sales: 385, purchase: 320 },
  { date: '2024-06-09', sales: 438, purchase: 480 },
  { date: '2024-06-10', sales: 155, purchase: 200 },
  { date: '2024-06-11', sales: 92, purchase: 150 },
  { date: '2024-06-12', sales: 492, purchase: 420 },
  { date: '2024-06-13', sales: 81, purchase: 130 },
  { date: '2024-06-14', sales: 426, purchase: 380 },
  { date: '2024-06-15', sales: 307, purchase: 350 },
  { date: '2024-06-16', sales: 371, purchase: 310 },
  { date: '2024-06-17', sales: 475, purchase: 520 },
  { date: '2024-06-18', sales: 107, purchase: 170 },
  { date: '2024-06-19', sales: 341, purchase: 290 },
  { date: '2024-06-20', sales: 408, purchase: 450 },
  { date: '2024-06-21', sales: 169, purchase: 210 },
  { date: '2024-06-22', sales: 317, purchase: 270 },
  { date: '2024-06-23', sales: 480, purchase: 530 },
  { date: '2024-06-24', sales: 132, purchase: 180 },
  { date: '2024-06-25', sales: 141, purchase: 190 },
  { date: '2024-06-26', sales: 434, purchase: 380 },
  { date: '2024-06-27', sales: 448, purchase: 490 },
  { date: '2024-06-28', sales: 149, purchase: 200 },
  { date: '2024-06-29', sales: 103, purchase: 160 },
  { date: '2024-06-30', sales: 446, purchase: 400 }
];

const chartConfig = {
  views: {
    label: 'Page Views'
  },
  sales: {
    label: 'sales',
    color: 'hsl(var(--chart-1))'
  },
  purchase: {
    label: 'purchase',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('sales');

  const total = React.useMemo(
    () => ({
      sales: chartData.reduce((acc, curr) => acc + curr.sales, 0),
      purchase: chartData.reduce((acc, curr) => acc + curr.purchase, 0)
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sales and Purchase</CardTitle>
          <CardDescription>
            Total sales and seles for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {['sales', 'purchase'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()} Kg
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
