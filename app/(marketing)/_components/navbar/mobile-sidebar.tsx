"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"

import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"

import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Socials } from "../socials"


function MobileSidebar() {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    const onOpen = useMobileSidebar((state) => state.onOpen)
    const onClose = useMobileSidebar((state) => state.onClose)
    const isOpen = useMobileSidebar((state) => state.isOpen)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        onClose()
    }, [pathname, onClose])

    if (!isMounted) return null

    return (
        <div>
            <Menu className=" size-5" onClick={onOpen} />

            <Sheet open={isOpen} onOpenChange={onClose} modal={true}>
                <SheetContent side="right" className=" flex flex-col justify-between py-8">
                    <Link href={"/meet"}>
                        <Button size="sm">Contact Us</Button>
                    </Link>

                    <div className="flex flex-col space-y-2">
                        <Button variant="ghost">
                            <Link href={"/"}>Home</Link>
                        </Button>
                        <Button variant="ghost">
                            <Link href={"/#about"}>About</Link>
                        </Button>
                        <Button variant="ghost">
                            <Link href={"/#resume"}>Visio and Mission</Link>
                        </Button>
                        <Button variant="ghost">
                            <Link href={"/#portfolio"}>History</Link>
                        </Button>
                        <Button variant="ghost">
                            <Link href={"/#service"}>Product</Link>
                        </Button>
                        <Button variant="ghost">
                            <Link href={"/faq"}>FAQ</Link>
                        </Button>
                    </div>
                    <div className=" flex justify-between items-center">
                        <ModeToggle />
                        <Socials classname="size-5" />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileSidebar
