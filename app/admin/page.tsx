'use client'

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"

import { format, subDays } from 'date-fns';
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SuppressibleAlert from "@/components/SupressibleAlert"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Box, DollarSign, ShoppingCart } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
    products_sold: {
        label: "Products",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

import { useSidebar } from "@/lib/AdminSidebarContext"
import { formatCurrencyShort } from "@/lib/utils"
import AdminTopBar from "@/components/AdminTopBar";

export type Statistic = {
    // orders
    totalSales: number;
    totalOrders: number;
    avgOrderValue: number;
    // products
    totalProductsSold: number;
    productsSoldByDay: Order[];
    // new stats
    latestSales: { name: string, email: string, final_price: number, shipping_status: string }[];
    monthlyStats: { totalRevenue: number; totalOrders: number; totalProductsSold: number };
    // alerts
    alerts: { processingOrders: number; deliveredOrders: number; outOfStockVariations: number; lowStockProducts: number };
};

interface Order {
    order_id: string;
    created_at: string; // ISO date string from the backend
    quantity: number;
}

// Define the type for the grouped result
interface GroupedProducts {
    day: string;
    products_sold: number;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString) // Parse the date from the string
    const formatter = new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Monterrey',
        month: 'short',
        day: 'numeric',
    })
    return formatter.format(date)
}

// Helper function to generate the past 10 days
const generatePast10Days = (): string[] => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 10; i++) {
        const date = subDays(today, i);
        days.unshift(format(date, 'd MMM').toLowerCase()); // Format as "day month" (e.g., "2 nov")
    }

    return days;
};

// Function to group products by day
const groupProductsByDay = (orders: Order[]): GroupedProducts[] => {
    const grouped: Record<string, number> = {};

    orders.forEach(order => {
        const formattedDate = formatDate(order.created_at);

        // Increment the product sold count for the specific date
        if (!grouped[formattedDate]) {
            grouped[formattedDate] = 0;
        }
        grouped[formattedDate] += order.quantity;
    });

    // Generate past 10 days, including days without sales
    const past10Days = generatePast10Days();

    // Map past 10 days with grouped data or 0 if no sales
    return past10Days.map(day => ({
        day,
        products_sold: grouped[day] || 0,
    }));
};


export default function AdminDashboard() {

    const [stats, setStats] = useState<Statistic | null>(null);
    const [soldProducts, setSoldProducts] = useState<{ day: string; products_sold: number }[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('/api/statsOverview');
                const data = await response.json();
                console.log(data);

                // Set stats
                setStats(data);

                // Set sold products
                const groupedProducts = groupProductsByDay(data.productsSoldByDay);
                setSoldProducts(groupedProducts);

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
            <AdminTopBar title='Overview' />

            {stats !== null ?

                <div className="flex-1 space-y-4 p-8 pt-6">

                    {/* title */}
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Hola, We The People!</h2>
                    </div>

                    {/* alerts */}
                    {stats.alerts.outOfStockVariations > 0 && (
                        <SuppressibleAlert
                            type="error"
                            message={`Hay ${stats.alerts.outOfStockVariations} productos sin stock.`}
                        />
                    )}
                    {(Number(stats.alerts.processingOrders) + Number(stats.alerts.deliveredOrders)) > 0 && (
                        <SuppressibleAlert
                            type="warning"
                            message={`Hay ${Number(stats.alerts.processingOrders) + Number(stats.alerts.deliveredOrders)} órdenes sin completar. ${stats.alerts.processingOrders} en proceso y ${stats.alerts.deliveredOrders} entregadas.`}
                        />
                    )}
                    {stats.alerts.lowStockProducts > 0 && (
                        <SuppressibleAlert
                            type="warning"
                            message={`Hay ${stats.alerts.lowStockProducts} productos con stock bajo.`}
                        />
                    )}

                    {/* cards */}
                    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">

                        {/* total sales */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrencyShort(stats?.totalSales)}</div>
                                <p className="text-xs text-muted-foreground">{formatCurrencyShort(stats?.monthlyStats.totalRevenue)} el último mes</p>
                            </CardContent>
                        </Card>

                        {/* total orders */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Órdenes</CardTitle>
                                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats?.totalOrders}</div>
                                <p className="text-xs text-muted-foreground">{stats?.monthlyStats.totalOrders} el último mes</p>
                            </CardContent>
                        </Card>

                        {/* products sold */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Productos vendidos</CardTitle>
                                <Box className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats?.totalProductsSold}</div>
                                <p className="text-xs text-muted-foreground">{stats?.monthlyStats.totalProductsSold} el último mes</p>
                            </CardContent>
                        </Card>

                        {/* promedio de venta */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Promedio de venta</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrencyShort(stats?.avgOrderValue)}</div>
                                <p className="text-xs text-muted-foreground">Promedio sobre todas las ventas</p>
                            </CardContent>
                        </Card>

                    </div>

                    {/* bottom */}
                    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-7">

                        {/* Productos vendidos */}
                        {soldProducts.length === 0 ?

                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Productos vendidos</CardTitle>
                                    <CardDescription>Productos vendidos los últimos 10 días</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-20" />
                                </CardContent>
                            </Card>

                            :

                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Productos vendidos</CardTitle>
                                    <CardDescription>Productos vendidos los últimos 10 días</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer config={chartConfig}>
                                        <LineChart
                                            accessibilityLayer
                                            data={soldProducts}
                                            margin={{
                                                left: 0,
                                                right: 20,
                                            }}
                                        >
                                            <CartesianGrid vertical={false} />
                                            <YAxis
                                                tickLine={true}
                                                axisLine={false}
                                                tickMargin={8}
                                            />
                                            <XAxis
                                                dataKey="day"
                                                tickLine={true}
                                                axisLine={false}
                                                tickMargin={8}
                                            // tickFormatter={(value) => value.slice(0, 2)}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent hideIndicator />}
                                            />
                                            <Line
                                                dataKey="products_sold"
                                                type="linear"
                                                stroke="var(--color-products_sold)"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ChartContainer>
                                </CardContent>
                                {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                                    <div className="flex gap-2 font-medium leading-none">
                                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                    </div>
                                    <div className="leading-none text-muted-foreground">
                                        Showing total visitors for the last 6 months
                                    </div>
                                </CardFooter> */}
                            </Card>

                        }

                        {/* ventas recientes */}
                        <Card className="col-span-4 xl:col-span-3">
                            <CardHeader>
                                <CardTitle>Últimas ventas</CardTitle>
                                <CardDescription>{stats?.monthlyStats.totalOrders} en el último mes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {stats?.latestSales.map((sale, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {sale.name}
                                                    <Badge className={`${sale.shipping_status == 'processing' ? 'bg-gray-400' : sale.shipping_status == 'delivered' ? 'bg-yellow-500' : sale.shipping_status == 'completed' ? 'bg-green-500' : 'text-black'} ml-2 text-xs rounded-md`}>
                                                        {(sale.shipping_status as string).toUpperCase()}
                                                    </Badge>
                                                </p>
                                                <p className="text-sm text-muted-foreground">{sale.email}</p>
                                            </div>
                                            <div className="ml-auto font-medium text-green-500">+{formatCurrencyShort(sale.final_price)}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                </div>

                :

                <div className="flex-grow flex items-center justify-center h-[60vh]">
                    <div role="status" className="flex flex-col items-center justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>

            }

        </main>
    );
}
