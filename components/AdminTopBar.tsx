import { Button } from "@/components/ui/button"
import { Search, Menu, Settings, ShoppingCart, Users, Pencil } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

import { signOut } from "next-auth/react"

import { useSidebar } from "@/lib/AdminSidebarContext"

interface AdminTopBarProps {
    title: string
}

export default function AdminTopBar({ title }: AdminTopBarProps) {

    const { toggleSidebar } = useSidebar();

    return (
        <>
            {/* Top Bar */}
            <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
                <Button
                    variant="ghost"
                    className="lg:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="h-8 w-8 rounded-full hover:cursor-pointer">
                            <img
                                src="/logos/icon.png"
                                alt="User"
                                className="rounded-full hover:opacity-75"
                            />
                            <span className="sr-only">Toggle user menu</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Admin</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem className="hover:cursor-pointer">Profile</DropdownMenuItem> */}
                        <DropdownMenuItem className="hover:cursor-pointer">
                            <Link href={'/'} className="w-full">
                                Ir al Inicio
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:cursor-pointer text-red-500" onClick={() => {
                            signOut();
                        }}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
        </>
    )
}