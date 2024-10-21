
import Link from "next/link";
import { FooterCopyright } from "./footer-copyright";
import { Logo } from "@/components/logo";



export function Footer() {
   return (
      <footer className="border-t">
         <div className="md:flex md:justify-between p-8">
            <div className="mb-6 md:mb-0 w-full">
               <Logo url="/" height={64} width={64} short={false} title_classname="text-xl font-semibold" sub_title_classname="text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 text-sm w-full  text-foreground/70">
               <div>
                  <h2 className="mb-6  font-semibold ">
                     Company
                  </h2>
                  <ul className=" space-y-4">
                     <li>
                        <Link href="/" className="hover:underline">
                           About
                        </Link>
                     </li>
                     <li>
                        <Link href="/" className="hover:underline">
                           Vision & Mission
                        </Link>
                     </li>
                     <li>
                        <Link href="/" className="hover:underline">
                           Board Director
                        </Link>
                     </li>
                     <li>
                        <Link href="/" className="hover:underline">
                           History
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6  font-semibold ">
                     Product
                  </h2>
                  <ul className=" space-y-4">
                     <li>
                        <Link href="/" className="hover:underline">
                           Crude Palm Oil
                        </Link>
                     </li>
                     <li>
                        <Link href="/" className="hover:underline">
                           Palm Kernel
                        </Link>
                     </li>
                     <li>
                        <Link href="/" className="hover:underline">
                           Palm Kernel Shell
                        </Link>
                     </li>
                     <li>
                        <Link href="/" className="hover:underline">
                           Palm Acid Oil
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6  font-semibold ">
                     Follow us
                  </h2>
                  <ul className=" font-medium space-y-4">
                     <li>
                        <Link href="/github.com/themesberg/flowbite" className="hover:underline">
                           Facebook
                        </Link>
                     </li>
                     <li>
                        <Link href="/discord.gg/4eeurUVvTy" className="hover:underline">
                           Intagram
                        </Link>
                     </li>
                     <li>
                        <Link href="/discord.gg/4eeurUVvTy" className="hover:underline">
                           Linkedin
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6  font-semibold ">
                     Legal
                  </h2>
                  <ul className=" font-medium">
                     <li className="mb-4">
                        <Link href="#" className="hover:underline">
                           Privacy Policy
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:underline">
                           Terms &amp; Conditions
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <FooterCopyright />
      </footer >
   )
}