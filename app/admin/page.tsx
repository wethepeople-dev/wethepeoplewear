'use client'

import { cn } from "@/lib/utils"
import { BarChart3, LayoutDashboard, Settings, ShoppingCart, Users, Menu } from "lucide-react"

import { use, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useSidebar } from "@/lib/AdminSidebarContext"

import { formatCurrencyShort } from "@/lib/utils"

type Statistic = {
    totalSales: number;
    totalClients: number;
    totalOrders: number;
    totalProductsSold: number;
    topProducts: { product_name: string; total_sold: number }[];
    productsSoldByWeek: { week: string; products_sold: number }[];
}

export default function AdminDashboard() {

    const [stats, setStats] = useState<Statistic | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('/api/stats');
                const data = await response.json();

                console.log(data);
                setStats(data);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const { toggleSidebar } = useSidebar();

    return (
        <main className="flex min-h-screen flex-col">

            {/* Top Bar */}
            <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">

                {/* sidebar toggle */}
                <Button
                    variant="ghost"
                    className="lg:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>

                {/* title */}
                <h1 className="text-2xl font-semibold">Overview</h1>

                {/* user menu */}
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Summary Cards */}
                    {[
                        { title: "Ventas Totales", value: formatCurrencyShort(stats?.totalSales), description: "" },
                        { title: "Productos Vendidos", value: stats?.totalProductsSold, description: "" },
                        { title: "Órdenes Totales", value: stats?.totalOrders, description: "" },
                        { title: "Clientes Totales", value: stats?.totalClients, description: "" },
                    ].map((card, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                                <p className="text-xs text-muted-foreground">{card.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Additional Dashboard Content */}
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ventas recientes</CardTitle>
                            <CardDescription>Prodcutos vendidos por semana.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Placeholder for a sales chart or table */}
                            <div className="h-[200px] rounded-md bg-muted" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Productos más vendidos</CardTitle>
                            <CardDescription>
                                Los productos más vendidos del sitio.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Placeholder for a product list or chart */}
                            <div className="h-[200px] rounded-md bg-muted" />
                        </CardContent>
                    </Card>
                </div>
            </div>

        </main>
    );
}
