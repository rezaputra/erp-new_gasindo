"use client"


import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


import { Factory } from "lucide-react"

interface ListItem { title: string; href: string; description: string }

const informations: ListItem[] = [
   {
      title: "Product",
      href: "/",
      description:
         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime neque obcaecati consectetur ea harum eos",
   },
   {
      title: "Business & Strategy",
      href: "/",
      description:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, enim.",
   },
   {
      title: "Factory",
      href: "/",
      description:
         "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem nisi dolores molestias!",
   },
   {
      title: "Head Office",
      href: "/",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, doloremque",
   },
   {
      title: "Certification & Award",
      href: "/",
      description:
         "Lorem ipsum dolor sit amet consectetur adipisicing eli aspernatur! Nostrum, ducimust",
   },
   {
      title: "FAQ",
      href: "/faq",
      description:
         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, aspernatur! Nostrum, ducimus",
   },
]



const blogs: ListItem[] = [
   {
      title: "News",
      href: "/news",
      description:
         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime neque obcaecati consectetur ea harum eos",
   },
   {
      title: "Gallery",
      href: "/gallery",
      description:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, enim.",
   },
]


export function NavbarItem() {
   return (
      <NavigationMenu>
         <NavigationMenuList>
            {/* <NavigationMenuItem>
               <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                     Home
                  </NavigationMenuLink>
               </Link>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
               <NavigationMenuTrigger>About</NavigationMenuTrigger>
               <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                     <li className="row-span-3">
                        <NavigationMenuLink asChild>
                           <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                           >
                              <Factory className="size-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                 Company Profile
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, doloribus.
                              </p>
                           </a>
                        </NavigationMenuLink>
                     </li>
                     <ListItem href="/vision" title="Vision & Mission">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt.
                     </ListItem>
                     <ListItem href="/#board" title="Board Director">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     </ListItem>
                     <ListItem href="/#history" title="History">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, mollitia quas.
                     </ListItem>
                  </ul>
               </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <NavigationMenuTrigger>Information</NavigationMenuTrigger>
               <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                     {informations.map((information) => (
                        <ListItem
                           key={information.title}
                           title={information.title}
                           href={information.href}
                        >
                           {information.description}
                        </ListItem>
                     ))}
                  </ul>
               </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <NavigationMenuTrigger>Blogs</NavigationMenuTrigger>
               <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                     {blogs.map((blog) => (
                        <ListItem
                           key={blog.title}
                           title={blog.title}
                           href={blog.href}
                        >
                           {blog.description}
                        </ListItem>
                     ))}
                  </ul>
               </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                     Contact Us
                  </NavigationMenuLink>
               </Link>
            </NavigationMenuItem>
         </NavigationMenuList>
      </NavigationMenu>
   )
}

const ListItem = React.forwardRef<
   React.ElementRef<"a">,
   React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
   return (
      <li>
         <NavigationMenuLink asChild >
            <a
               ref={ref}
               className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  className
               )}
               {...props}
            >
               <div className="text-sm font-medium leading-none">{title}</div>
               <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
               </p>
            </a>
         </NavigationMenuLink>
      </li>
   )
})
ListItem.displayName = "ListItem"
