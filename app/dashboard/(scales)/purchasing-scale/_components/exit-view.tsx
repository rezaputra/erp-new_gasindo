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
import { useFormPurScaleExitStore } from "@/hooks/use-form-scale"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SquareArrowOutUpRight } from "lucide-react"
import { FormExit } from "./form-exit"
import { useState } from "react"

interface ExitViewProps {
   id: string
   isOpen: boolean;
   onClose: () => void;
}

export function ExitView({ id, isOpen, onClose }: ExitViewProps) {
   const isDesktop = useMediaQuery("(min-width: 768px)")

   if (isDesktop) {
      return (
         <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl">
               <DialogHeader>
                  <DialogTitle>Form exit</DialogTitle>
                  <DialogDescription>
                     Lorem ipsum dolor sit amet, consectetur adipisicing.
                  </DialogDescription>
               </DialogHeader>
               <FormExit id={id} onClose={onClose} />
            </DialogContent>
         </Dialog>
      )
   }

   return (
      <Drawer open={isOpen} onOpenChange={onClose}>
         <DrawerContent>
            <DrawerHeader className="text-left">
               <DrawerTitle>Form exit</DrawerTitle>
               <DrawerDescription>
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
               </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="p-4 h-[50vh]">
               <FormExit id={id} onClose={onClose} className="px-4" />
            </ScrollArea>
         </DrawerContent>
      </Drawer>
   )
}
