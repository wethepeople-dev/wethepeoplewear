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

import { Payment, columns, OrderData } from "./columns"
import { DataTable } from "./data-table"

import { useSidebar } from "@/lib/AdminSidebarContext"

export default function Orders() {

    const [data, setData] = useState<OrderData[]>([])

    useEffect(() => {
        const getData = async (): Promise<OrderData[]> => {
            try {

                // Fetch data from the API
                const response = await fetch('/api/getAllOrders', {
                    cache: 'no-store', // Ensure no caching
                });

                const rawData = await response.json();

                // Format the data into OrderData type
                const formattedData: OrderData[] = rawData.map((order: any) => ({
                    order_id: order.order_id,
                    created_at: order.created_at,
                    product_quantity: parseInt(order.product_quantity, 10) || 0, // Handle potential NaN
                    final_price: parseFloat(order.final_price) || 0, // Handle potential NaN
                    shipping_status: order.shipping_status,
                    shipping_method: order.shipping_method,
                    completed: order.completed,
                }));

                return formattedData;

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
