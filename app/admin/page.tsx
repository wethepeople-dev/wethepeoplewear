'use client'

import { cn } from "@/lib/utils"
import { BarChart3, LayoutDashboard, Settings, ShoppingCart, Users, Menu } from "lucide-react"

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

export default function AdminDashboard() {

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
                <h1 className="text-2xl font-semibold">Overview</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 rounded-full">
                            <img
                                src="/placeholder.svg?height=32&width=32"
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Summary Cards */}
                    {[
                        { title: "Total Revenue", value: "$54,321", description: "10% increase from last month" },
                        { title: "Active Users", value: "12,345", description: "5% increase from last week" },
                        { title: "New Orders", value: "234", description: "15% increase from yesterday" },
                        { title: "Customer Satisfaction", value: "4.8/5", description: "Based on 1,234 reviews" },
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
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>You made 265 sales this month.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Placeholder for a sales chart or table */}
                            <div className="h-[200px] rounded-md bg-muted" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Products</CardTitle>
                            <CardDescription>Your best selling products this month.</CardDescription>
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
