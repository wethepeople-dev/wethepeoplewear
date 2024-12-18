'use client'

import { useEffect, useState } from "react"
import AdminTopBar from "@/components/AdminTopBar";

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, LineChart, Line, Tooltip, Legend, } from "recharts"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CartesianGrid, LabelList } from "recharts"

import { formatCurrencyShort } from "@/lib/utils";
import { set } from "date-fns";


// shipping status chart
const chartData = [
    { type: "Local", amount: 186 },
    { type: "Nacional", amount: 305 },
    { type: "Collectif", amount: 237 },
]
const chartConfigShippingMethod = {
    amount: {
        label: "Amount",
        color: "hsl(var(--chart-1))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig


// discounts chart
const chartData2 = [
    { type: "With", amount: 10 },
    { type: "Without", amount: 20 },
]
const chartConfigDiscounts = {
    amount: {
        label: "amount",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig


// Sample data
const topProducts = [
    { name: "Product A", sold: 1234 },
    { name: "Product B", sold: 987 },
    { name: "Product C", sold: 765 },
    { name: "Product D", sold: 543 },
    { name: "Product E", sold: 321 },
]
const customerAcquisitionMock = [
    { month: "Jan-24", new_clients: 7 },
    { month: "Feb-24", new_clients: 12 },
    { month: "Mar-24", new_clients: 5 },
    { month: "Abr-24", new_clients: 6 },
]
const topSizesData = [
    { size: "S", total_sold: 33 },
    { size: "M", total_sold: 40 },
    { size: "L", total_sold: 21 },
    { size: "XL", total_sold: 9 },
]
const topColorsData = [
    { color: "Blanca", total_sold: 30 },
    { color: "Gris", total_sold: 25 },
    { color: "Negra", total_sold: 53 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const topStates = [
    { state: "Nuevo León", order_count: 22 },
    { state: "Querétaro", order_count: 9 },
    { state: "Sinaloa", order_count: 7 },
]

interface ProductVariation {
    variation_id: string; // UUID
    product_id: string; // UUID
    color: string;
    talla: string;
    precio: number;
    fotos: string[]; // Adjust based on your structure
    stock_qty: number;
}

interface Product {
    product_id: string; // UUID
    name: string;
    description: string;
    colores: string[];
    tallas: string[];
    release_date: string; // or Date
    variations: ProductVariation[]; // Include variations
}

export interface Statistics {
    // orders
    totalSales: number;
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
    mostViewedProducts: {
        product_id: string;
        views: number;
    }[];
    mostAddedToCartProducts: {
        variation_id: string;
        add_to_cart_count: number;
        product_size: string;
        product_color: string;
    }[];
}

function formatClientData(data: { month: string; new_clients: number }[]) {
    return data.map(item => {
        // Create a Date object from the ISO string
        const date = new Date(item.month);

        // Extract the month and year in UTC to avoid timezone issues
        const year = date.getUTCFullYear().toString().slice(-2);
        const month = date.toLocaleString('en-US', {
            month: 'short',
            timeZone: 'UTC', // Ensure it's in UTC
        });

        return {
            month: `${month}-${year}`,
            new_clients: item.new_clients,
        };
    });
}


export default function Analytics() {

    const [stats, setStats] = useState<Statistics | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [mostViewedProducts, setMostViewedProducts] = useState<{ product_id: string; views: number; name: string }[]>([]);
    const [mostAddedToCartProducts, setMostAddedToCartProducts] = useState<{ variation_id: string; add_to_cart_count: number; name: string, product_size: string, product_color: string }[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [topSizes, setTopSizes] = useState<{ size: string; total_sold: number }[]>([]);
    const [topColors, setTopColors] = useState<{ color: string; total_sold: number }[]>([]);
    const [customerAcquisition, setCustomerAcquisition] = useState<{ month: string; new_clients: number }[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('/api/statisticsPage');
                const data = await response.json();
                setStats(data);
                console.log(data);

                // format costumer acquisition
                const formattedClientAcquisition = formatClientData(data.customerAcquisition);
                console.log('formattedClientAcquisition', formattedClientAcquisition);
                setCustomerAcquisition(formattedClientAcquisition);

                // assign top sizes
                const updatedTopSizes = data.topSizes.map((size: { size: string, total_sold: string }) => {
                    return {
                        size: size.size,
                        total_sold: parseInt(size.total_sold)
                    }
                });
                setTopSizes(updatedTopSizes);

                // assign top colors
                const updatedTopColors = data.topColors.map((color: { color: string, total_sold: string }) => {
                    return {
                        color: color.color,
                        total_sold: parseInt(color.total_sold)
                    }
                });
                setTopColors(updatedTopColors);

                const responseProducts = await fetch('/api/products');
                const dataProducts = await responseProducts.json();
                setProducts(dataProducts);

                // Add product names to mostViewedProducts
                const updatedMostViewedProducts = data.mostViewedProducts.map((viewedProduct: { product_id: string; views: number, product_size: string, product_color: string }) => {
                    const product: Product | undefined = dataProducts.find((p: Product) => p.product_id === viewedProduct.product_id);
                    return {
                        ...viewedProduct,
                        name: product ? product.name : 'Unknown Product'
                    };
                });
                setMostViewedProducts(updatedMostViewedProducts);

                const updatedAddedToCartProducts = data.mostAddedToCartProducts.map((addedToCartProduct: { variation_id: string; add_to_cart_count: number }) => {
                    const product: Product | undefined = dataProducts.find((p: Product) => p.variations.find((v: ProductVariation) => v.variation_id === addedToCartProduct.variation_id));
                    return {
                        ...addedToCartProduct,
                        name: product ? product.name : 'Unknown Product',
                    };
                });
                setMostAddedToCartProducts(updatedAddedToCartProducts);

                setLoaded(true);

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

            {loaded == false ?

                <div className="flex-grow flex items-center justify-center h-[60vh]">
                    <div role="status" className="flex flex-col items-center justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>

                :
                <>

                    {/* Orders */}
                    <div className="container mx-auto p-4 lg:p-8">

                        <h1 className="text-3xl font-bold text-center">
                            Orders
                        </h1>

                        <div className="p-2 space-y-6 mt-6">

                            {/* Numeric Values */}
                            <div className="grid gap-6 md:grid-cols-3">

                                {/* total sales */}
                                <Card className="overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                                        {/* <item.icon className="h-4 w-4 text-muted-foreground" /> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{formatCurrencyShort(stats?.totalSales)}</div>
                                        <p className="text-xs text-muted-foreground mt-2">{formatCurrencyShort(stats?.monthlyStats.totalRevenue)} el último mes</p>
                                    </CardContent>
                                </Card>

                                {/* total orders */}
                                <Card className="overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                        {/* <item.icon className="h-4 w-4 text-muted-foreground" /> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats?.totalOrders}</div>
                                        <p className="text-xs text-muted-foreground mt-2">{stats?.monthlyStats.totalOrders} el último mes</p>
                                    </CardContent>
                                </Card>

                                {/* average order value */}
                                <Card className="overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                                        {/* <item.icon className="h-4 w-4 text-muted-foreground" /> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{formatCurrencyShort(stats?.avgOrderValue)}</div>
                                        <p className="text-xs text-muted-foreground mt-2">{stats?.monthlyStats.totalProductsSold} el último mes</p>
                                    </CardContent>
                                </Card>

                            </div>

                            {/* Charts Container */}
                            <div className="grid gap-6 md:grid-cols-2">

                                {/* Discount usage */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Discount Usage</CardTitle>
                                        <CardDescription>Orders separated by discount usage</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer config={chartConfigDiscounts}>
                                            <BarChart
                                                accessibilityLayer
                                                data={[
                                                    { type: 'With Discount', amount: stats?.discountUsage.with_discount },
                                                    { type: 'Without Discount', amount: stats?.discountUsage.without_discount }
                                                ]}
                                                margin={{
                                                    top: 20,
                                                }}
                                            >
                                                <CartesianGrid vertical={false} />
                                                <XAxis
                                                    dataKey="type"
                                                    tickLine={false}
                                                    tickMargin={10}
                                                    axisLine={false}
                                                // tickFormatter={(value) => value.slice(0, 3)}
                                                />
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent hideLabel />}
                                                />
                                                <Bar dataKey="amount" fill="var(--color-amount)" radius={8}>
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
                                    {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total orders separated by discount usage
                </div>
            </CardFooter> */}
                                </Card>

                                {/* Shipping methods */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shipping Methods</CardTitle>
                                        <CardDescription>Orders separated by shipping method</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer config={chartConfigShippingMethod}>
                                            <BarChart
                                                accessibilityLayer
                                                data={[
                                                    { type: 'Local', amount: stats?.ordersByShippingStatus.local },
                                                    { type: 'Nacional', amount: stats?.ordersByShippingStatus.nacional },
                                                    { type: 'Collectif', amount: stats?.ordersByShippingStatus.collectif }
                                                ]}
                                                layout="vertical"
                                                margin={{
                                                    right: 16,
                                                }}
                                            >
                                                <CartesianGrid horizontal={false} />
                                                <YAxis
                                                    dataKey="type"
                                                    type="category"
                                                    tickLine={false}
                                                    tickMargin={10}
                                                    axisLine={false}
                                                    tickFormatter={(value) => value.slice(0, 3)}
                                                    hide
                                                />
                                                <XAxis dataKey="amount" type="number" hide />
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent indicator="line" />}
                                                />
                                                <Bar
                                                    dataKey="amount"
                                                    layout="vertical"
                                                    fill="var(--color-amount)"
                                                    radius={4}
                                                >
                                                    <LabelList
                                                        dataKey="type"
                                                        position="insideLeft"
                                                        offset={8}
                                                        className="fill-[--color-label]"
                                                        fontSize={12}
                                                    />
                                                    <LabelList
                                                        dataKey="amount"
                                                        position="right"
                                                        offset={8}
                                                        className="fill-foreground"
                                                        fontSize={12}
                                                    />
                                                </Bar>
                                            </BarChart>
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
                            </div>
                        </div>

                    </div>


                    {/* Products */}
                    <div className="container mx-auto p-4 lg:p-8">

                        <h1 className="text-3xl font-bold text-center">
                            Products
                        </h1>

                        <div className="p-2 space-y-6 mt-6">

                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">

                                <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">

                                    {/* Total products sold */}
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-md font-semibold">Total Products Sold</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{stats?.totalProductsSold}</div>
                                        </CardContent>
                                    </Card>

                                    {/* Best Sellers */}
                                    <Card className="h-full">
                                        <CardHeader>
                                            <CardTitle>Best Sellers</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {stats?.topProducts.length === 0 && (
                                                    <li className="text-sm text-muted-foreground">No products sold yet</li>
                                                )}
                                                {stats?.topProducts.map((product, index) => (
                                                    <li key={index} className="flex justify-between items-center">
                                                        <span>{product.product_name}</span>
                                                        <span className="font-semibold">{product.total_sold}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                </div>

                                {/* Top Sizes */}
                                <Card className="col-span-full md:col-span-1">
                                    <CardHeader>
                                        <CardTitle>Top Sizes</CardTitle>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        {stats?.topSizes.length === 0 && (
                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                No data available
                                            </div>
                                        )}
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={topSizes}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={70}
                                                    fill="#8884d8"
                                                    dataKey="total_sold"
                                                    label={({ size, total_sold }) => `${size} - ${total_sold}`}
                                                >
                                                    {stats?.topSizes.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                {/* Top Colors */}
                                <Card className="col-span-full md:col-span-1">
                                    <CardHeader>
                                        <CardTitle>Top Colors</CardTitle>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        {stats?.topColors.length === 0 && (
                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                No data available
                                            </div>
                                        )}
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={topColors}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="total_sold"
                                                    label={({ color, total_sold }) => `${color} - ${total_sold}`}
                                                >
                                                    {stats?.topColors.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                            </div>

                        </div>

                    </div>


                    {/* Other Stats */}
                    <div className="container mx-auto p-4 lg:p-8">

                        <h1 className="text-3xl font-bold text-center">
                            Other Stats
                        </h1>

                        <div className="p-2 space-y-6 mt-6">

                            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 w-full">

                                {/* Top States */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Top States</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {stats?.topStates.length === 0 && (
                                                <li className="text-sm text-muted-foreground">No data available</li>
                                            )}
                                            {stats?.topStates.map((state, index) => (
                                                <li key={index} className="flex justify-between items-center">
                                                    <span>{state.state}</span>
                                                    <span className="font-semibold">{state.order_count}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Most Viewed Products */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Most Viewed Products</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-72">
                                            <ul className="space-y-2 pr-4">
                                                {mostViewedProducts.length === 0 && (
                                                    <li className="text-sm text-muted-foreground">No sales yet</li>
                                                )}
                                                {mostViewedProducts.map((p, index) => (
                                                    <>
                                                        <li key={index} className="flex justify-between items-center">
                                                            <span>{p.name}</span>
                                                            <span className="font-semibold">{p.views}</span>
                                                        </li>
                                                        <Separator />
                                                    </>
                                                ))}
                                            </ul>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>

                                {/* Most Added to Cart Variations */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Most Added to Cart Variations</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-72">
                                            <ul className="space-y-2 pr-4">
                                                {mostAddedToCartProducts.length === 0 && (
                                                    <li className="text-sm text-muted-foreground">No sales yet</li>
                                                )}
                                                {mostAddedToCartProducts.map((p, index) => (
                                                    <>
                                                        <li key={index} className="flex justify-between items-center">
                                                            <span>{p.name} - ({p.product_size}, {p.product_color})</span>
                                                            <span className="font-semibold">{p.add_to_cart_count}</span>
                                                        </li>
                                                        <Separator />
                                                    </>
                                                ))}
                                            </ul>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>

                            </div>

                            {/* Customer Acquisition */}
                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Customer Acquisition</CardTitle>
                                    <CardDescription>Customers per month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {customerAcquisition.length === 0 ? (
                                        <div className="flex items-center justify-center h-14 text-muted-foreground">
                                            No data available
                                        </div>
                                    )
                                        :
                                        <ChartContainer
                                            config={{
                                                new_clients: {
                                                    label: "New Clients",
                                                    color: "hsl(var(--chart-1))",
                                                },
                                            }}
                                        >
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={customerAcquisition}>
                                                    <CartesianGrid />
                                                    <YAxis
                                                        tickLine={true}
                                                        // axisLine={false}
                                                        tickMargin={8}
                                                    />
                                                    <XAxis
                                                        dataKey="month"
                                                        tickLine={true}
                                                        // axisLine={false}
                                                        tickMargin={8}
                                                    />
                                                    <ChartTooltip content={<ChartTooltipContent />} />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="new_clients" stroke="var(--color-new_clients)" activeDot={{ r: 8 }} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </ChartContainer>
                                    }
                                </CardContent>
                            </Card>

                        </div>

                    </div>
                </>}

        </main>
    );
}
