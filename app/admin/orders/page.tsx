'use client'

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { BarChart3, Menu, Settings, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

import { useSidebar } from "@/lib/AdminSidebarContext"

export default function Orders() {

    const [data, setData] = useState<Payment[]>([])

    useEffect(() => {
        const getData = async (): Promise<Payment[]> => {
            try {
                return [
                    {
                        id: "728ed52f",
                        amount: 100,
                        status: "pending",
                        email: "m@example.com",
                    },
                    {
                        id: "b1234fgh",
                        amount: 250,
                        status: "processing",
                        email: "jane.doe@example.com",
                    },
                    {
                        id: "c5678ijk",
                        amount: 75,
                        status: "failed",
                        email: "john.smith@example.com",
                    },
                    {
                        id: "d91011lmn",
                        amount: 150,
                        status: "success",
                        email: "alice.wonderland@example.com",
                    },
                    {
                        id: "e121314op",
                        amount: 200,
                        status: "pending",
                        email: "charlie.brown@example.com",
                    },
                    {
                        id: "f151617qr",
                        amount: 300,
                        status: "processing",
                        email: "lucy.vanpelt@example.com",
                    },
                    {
                        id: "g181920st",
                        amount: 50,
                        status: "failed",
                        email: "linus.vanpelt@example.com",
                    },
                    {
                        id: "h212223uv",
                        amount: 400,
                        status: "success",
                        email: "snoopy@example.com",
                    },
                    {
                        id: "i242526wx",
                        amount: 125,
                        status: "pending",
                        email: "peppermint.patty@example.com",
                    },
                    {
                        id: "j272829yz",
                        amount: 175,
                        status: "processing",
                        email: "marcie@example.com",
                    },
                    {
                        id: "k303132ab",
                        amount: 225,
                        status: "failed",
                        email: "franklin@example.com",
                    },
                    {
                        id: "l333435cd",
                        amount: 275,
                        status: "success",
                        email: "pigpen@example.com",
                    }
                ];
            } catch (error) {
                console.error('Error checking stock:', error);
                return []; // Return an empty array if there's an error
            }
        };

        getData().then((data) => {
            setData(data); // Fallback to an empty array if data is undefined
        });
    }, []); // Add an empty dependency array here

    const { toggleSidebar } = useSidebar();

    return (
        <main className="flex min-h-screen flex-col">

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
                <h1 className="text-2xl font-semibold">Orders</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 rounded-full">
                            <img
                                src="/logos/icon.png"
                                alt="User"
                                className="rounded-full"
                            />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {/* Dashboard Content */}
            <div className="container mx-auto p-4 lg:p-8">

                <DataTable columns={columns} data={data} />

            </div>

        </main>
    );
}
