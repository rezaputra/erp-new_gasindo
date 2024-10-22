
import Link from "next/link";
import { Socials } from "../socials";


export function FooterCopyright() {
   return (
      <div className="sm:flex sm:items-center py-2 md:py-0 sm:justify-between px-8 text-foreground/70 bg-secondary/90">
         <div className="flex space-x-2 text-xs justify-center items-center lg:justify-start">
            <span>© 2024</span>
            <Link href="/" className="hover:underline ">
               PT. Garuda Sakti
            </Link>
            . All Rights Reserved.
         </div>
         <Socials classname={"size-4"} />
      </div>
   )
}