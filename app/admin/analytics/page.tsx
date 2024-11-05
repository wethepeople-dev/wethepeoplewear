'use client'

import { useEffect, useState } from "react"
import AdminTopBar from "@/components/AdminTopBar";

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, LineChart, Line, Tooltip, Legend, } from "recharts"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, ShoppingCart, Star } from "lucide-react"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList } from "recharts"

//
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig

// 
const chartData2 = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
]
const chartConfig2 = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig


// Sample data
const totalRevenue = 1234567
const topProducts = [
    { name: "Product A", sold: 1234 },
    { name: "Product B", sold: 987 },
    { name: "Product C", sold: 765 },
    { name: "Product D", sold: 543 },
    { name: "Product E", sold: 321 },
]
const monthlySales = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
]
const categoryData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Books", value: 200 },
    { name: "Home", value: 100 },
]
const regionData = [
    { name: "North", value: 400 },
    { name: "South", value: 300 },
    { name: "East", value: 200 },
    { name: "West", value: 100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']



// Dummy data for demonstration
const numericData = [
    { title: "Total Orders", value: 1234, change: 10, icon: ShoppingCart },
    { title: "Average Order Value", value: "$89.99", change: 5, icon: DollarSign },
    { title: "Customer Satisfaction", value: "4.8/5", change: 2, icon: Star },
]

export interface Statistics {
    // orders
    totalSales: number;
    // totalClients: number;
    totalOrders: number;
    avgOrderValue: number;
    discountUsage: {
        with_discount: number;
        without_discount: number;
    };
    ordersByShippingStatus: {
        local: number;
        nacional: number;
        collectif: number;
    };
    // products
    totalProductsSold: number;
    topProducts: { product_name: string; total_sold: number }[];
    productsSoldByDay: {
        order_id: string;
        client_id: string;
        final_price: number;
        created_at: string; // ISO format date
        product_id: string;
        quantity: number;
        product_name: string;
        variation_id?: string;
    }[];
    topSizes: { size: string; total_sold: number }[];
    topColors: { color: string; total_sold: number }[];
    // other
    topStates: { state: string; order_count: number }[];
    customerAcquisition: { month: string; new_clients: number }[];
    latestSales: { name: string; email: string; final_price: number }[];
    monthlyStats: {
        totalRevenue: number;
        totalOrders: number;
        totalProductsSold: number;
    };
}


export default function Analytics() {

    const [stats, setStats] = useState<Statistics | null>(null);
    const totalVisitors = chartData[0].desktop + chartData[0].mobile

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('/api/statisticsPage');
                const data = await response.json();
                console.log(data);

                // Set stats
                setStats(data);

            }
            catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <main className="flex min-h-screen flex-col">

            {/* Top Bar */}
            <AdminTopBar title="Analytics" />

            {/* Ordenes */}
            <div className="container mx-auto p-4 lg:p-8">

                <h1 className="text-3xl font-bold text-center">
                    Órdenes
                </h1>

                <div className="p-2 space-y-6">

                    {/* Numeric Values */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {numericData.map((item, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{item.value}</div>
                                    <p className="text-xs flex items-center">
                                        {item.change > 0 ? (
                                            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                                        ) : (
                                            <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                                        )}
                                        <span className={item.change > 0 ? "text-green-500" : "text-red-500"}>
                                            {Math.abs(item.change)}% from last month
                                        </span>
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts Container */}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Radial Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Bar Chart - Label</CardTitle>
                                <CardDescription>January - June 2024</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig2}>
                                    <BarChart
                                        accessibilityLayer
                                        data={chartData2}
                                        margin={{
                                            top: 20,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                                            <LabelList
                                                position="top"
                                                offset={12}
                                                className="fill-foreground"
                                                fontSize={12}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                <div className="flex gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    Showing total visitors for the last 6 months
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Bar Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Bar Chart - Custom Label</CardTitle>
                                <CardDescription>January - June 2024</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig}>
                                    <BarChart
                                        accessibilityLayer
                                        data={chartData}
                                        layout="vertical"
                                        margin={{
                                            right: 16,
                                        }}
                                    >
                                        <CartesianGrid horizontal={false} />
                                        <YAxis
                                            dataKey="month"
                                            type="category"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                            hide
                                        />
                                        <XAxis dataKey="desktop" type="number" hide />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="line" />}
                                        />
                                        <Bar
                                            dataKey="desktop"
                                            layout="vertical"
                                            fill="var(--color-desktop)"
                                            radius={4}
                                        >
                                            <LabelList
                                                dataKey="month"
                                                position="insideLeft"
                                                offset={8}
                                                className="fill-[--color-label]"
                                                fontSize={12}
                                            />
                                            <LabelList
                                                dataKey="desktop"
                                                position="right"
                                                offset={8}
                                                className="fill-foreground"
                                                fontSize={12}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                <div className="flex gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    Showing total visitors for the last 6 months
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

            </div>

            {/* Ordenes */}
            <div className="container mx-auto p-4 lg:p-8">

                <h1 className="text-3xl font-bold text-center">
                    Productos
                </h1>

                <div className="p-2 space-y-6">

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">

                        <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
                            {/* Numeric Value Card */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                                </CardContent>
                            </Card>

                            {/* Product Name : Items Sold List Card */}
                            <Card className="">
                                <CardHeader>
                                    <CardTitle>Top Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {topProducts.map((product, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span>{product.name}</span>
                                                <span className="font-semibold">{product.sold}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Pie Charts */}
                        <Card className="col-span-full md:col-span-1">
                            <CardHeader>
                                <CardTitle>Sales by Category</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="col-span-full md:col-span-1">
                            <CardHeader>
                                <CardTitle>Sales by Region</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={regionData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {regionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Big Graph */}
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Monthly Sales</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <ChartContainer
                                config={{
                                    sales: {
                                        label: "Sales",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlySales}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                </div>

            </div>

        </main>
    );
}
