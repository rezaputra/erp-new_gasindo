
import Link from "next/link";
import { Socials } from "../socials";


export function FooterCopyright() {
   return (
      <div className="sm:flex sm:items-center sm:justify-between px-8 text-foreground/70 bg-secondary/90">
         <div className="sm:text-center space-x-2 tracking-wide text-xs">
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