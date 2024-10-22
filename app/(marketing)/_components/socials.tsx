import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface SocialsProps {
   classname?: string
}

export function Socials({ classname }: SocialsProps) {
   return (
      <div className="px-2 text-foreground/80">
         <Button variant={"ghost"} size={"icon"}>
            <Facebook className={classname} />
         </Button>
         <Button variant={"ghost"} size={"icon"}>
            <Instagram className={classname} />
         </Button>
         <Button variant={"ghost"} size={"icon"}>
            <Linkedin className={classname} />
         </Button>
      </div>
   )
}