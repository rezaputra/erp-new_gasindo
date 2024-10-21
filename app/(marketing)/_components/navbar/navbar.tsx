'use client'

import { Button } from "@/components/ui/button"

import { Socials } from "../socials"
import { NavbarItem } from "./navbar-item"
import { Logo } from "@/components/logo"
import { UserAvatar } from "@/components/user-avatar"

import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from 'next-auth/react';
import { ModeToggle } from "@/components/mode-toggle"


export function Navbar() {
   const { data: session } = useSession();
   const [isScroll, setIsScroll] = useState<boolean>(false)

   const handleScroll = useCallback(() => {
      const scrollY = window.scrollY
      setIsScroll(scrollY > 20)
   }, [])

   useEffect(() => {
      window.addEventListener("scroll", handleScroll)
      return () => {
         window.removeEventListener("scroll", handleScroll)
      }
   }, [handleScroll])


   return (
      <header className={cn("sticky top-0 left-0 right-0 z-100 w-full h-1/6 bg-background",
         { " dark:border-b shadow-sm backdrop-blur-sm": isScroll }
      )}>
         <div className="flex px-8 py-2  justify-between">
            <div className="flex gap-x-2 items-center text-foreground/80">
               <Logo url="/" height={32} width={32} short={true} />
               <NavbarItem />
            </div>

            <div className="flex">
               {session ?
                  <div className="flex items-center space-x-2  py-1 px-2 overflow-y-hidden text-foreground/75">
                     <UserAvatar />
                  </div>
                  :
                  <div className="flex space-x-2">
                     <Link href={"/login"}>
                        <Button variant={"link"} className="text-foreground/80" >Sign In</Button>
                     </Link>
                     <Socials classname={"size-5"} />
                  </div>
               }
               <ModeToggle />
            </div>
         </div>
      </header>
   )
}