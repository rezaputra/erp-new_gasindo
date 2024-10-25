import { CalendarDateRangePicker } from "@/components/date-range-picker";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PurchasesForm } from "./purchases-form";


export function PurchasesViewPage() {
   return (
      <PageContainer>
         <div className="space-y-4">
            <div className="flex items-start justify-between">
               <Heading
                  title="Purchasing"
                  description="Record purchase transactions"
               />
               <div className="hidden items-center space-x-2 md:flex">
                  <CalendarDateRangePicker />
                  <Button variant={"default"}>Download</Button>
               </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-5">
               <div className="col-span-1 md:col-span-3 order-2 md:order-1">Test</div>
               <div className="col-span-1 md:col-span-2 order-1 md:order-2">
                  <PurchasesForm />
               </div>
            </div>

         </div>
      </PageContainer>
   )
}