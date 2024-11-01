"use client"

import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "usehooks-ts"
import { FormEntry } from "./form-entry"
import { useFormPurScaleEntryStore } from "@/hooks/use-form-scale"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

export function EntryView() {
   const { isOpen, setOpen } = useFormPurScaleEntryStore();
   const isDesktop = useMediaQuery("(min-width: 768px)")

   if (isDesktop) {
      return (
         <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <Button className="flex items-center space-x-2"><Plus className=" size-4" />Add new</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
               <DialogHeader>
                  <DialogTitle>Form entry</DialogTitle>
                  <DialogDescription>
                     Lorem ipsum dolor sit amet, consectetur adipisicing.
                  </DialogDescription>
               </DialogHeader>
               <FormEntry />
            </DialogContent>
         </Dialog>
      )
   }

   return (
      <Drawer open={isOpen} onOpenChange={setOpen}>
         <DrawerTrigger asChild>
            <Button className="flex items-center space-x-2"><Plus className=" size-4" />Add new</Button>
         </DrawerTrigger>
         <DrawerContent>
            <DrawerHeader className="text-left">
               <DrawerTitle>Form entry</DrawerTitle>
               <DrawerDescription>
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
               </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="p-4 h-[70vh]">
               <FormEntry className="px-4" />
            </ScrollArea>
         </DrawerContent>
      </Drawer>
   )
}
