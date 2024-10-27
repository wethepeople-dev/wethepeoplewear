'use client'

import { useEffect, useState } from "react";
import { BarChart3, Menu, Settings, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { columns, OrderData } from "./columns";
import { DataTable } from "./data-table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSidebar } from "@/lib/AdminSidebarContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { count } from "console";

export default function Orders() {
    const [allOrders, setAllOrders] = useState<OrderData[]>([]);
    const [activeOrders, setActiveOrders] = useState<OrderData[]>([]);
    const [completedOrders, setCompletedOrders] = useState<OrderData[]>([]);
    const [loadedOrders, setLoadedOrders] = useState(false);

    const handleOrderUpdate = (updatedOrder: OrderData) => {
        window.location.reload();
    };

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await fetch('/api/getAllOrders', { cache: 'no-store' });
                const rawData = await response.json();

                const formattedData: OrderData[] = rawData.map((order: any) => ({
                    order_id: order.order_id,
                    created_at: order.created_at,
                    product_quantity: parseInt(order.product_quantity, 10) || 0,
                    final_price: parseFloat(order.final_price) || 0,
                    shipping_status: order.shipping_status,
                    shipping_method: order.shipping_method,
                    completed: order.completed,
                    tracking_id: order.tracking_id,
                    tracking_url: order.tracking_url,
                    name: order.name,
                    email: order.email,
                    phone: order.phone,
                    address: order.address,
                    municipio: order.municipio,
                    city: order.city,
                    postal_code: order.postal_code,
                    state: order.state,
                    country: order.country,
                }));

                setAllOrders(formattedData);

                const completedOrders = formattedData.filter((order) => order.completed);
                const pendingOrders = formattedData.filter((order) => !order.completed);

                setActiveOrders(pendingOrders);
                setCompletedOrders(completedOrders);

                setLoadedOrders(true);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        getData();
    }, []);

    const { toggleSidebar } = useSidebar();

    return (
        <main className="flex min-h-screen flex-col">
            {/* Top Bar */}
            <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
                <Button variant="ghost" className="lg:hidden" onClick={toggleSidebar}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
                <h1 className="text-2xl font-semibold">Orders</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="h-8 w-8 rounded-full hover:cursor-pointer">
                            <img src="/logos/icon.png" alt="User" className="rounded-full hover:opacity-75" />
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
                {!loadedOrders ? (
                    <div className="flex-grow flex items-center justify-center h-[60vh]">
                        <div role="status" className="flex flex-col items-center justify-center">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Cargando...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Toast notifications */}
                        <ToastContainer />

                        <Tabs defaultValue="activas">
                            <TabsList className="grid grid-cols-2 w-[400px] border bg-gray-200 h-11">
                                <TabsTrigger value="activas">Sin completar</TabsTrigger>
                                <TabsTrigger value="completadas">Completadas</TabsTrigger>
                            </TabsList>

                            <TabsContent value="activas">
                                <DataTable columns={columns(handleOrderUpdate)} data={activeOrders} />
                            </TabsContent>

                            <TabsContent value="completadas">
                                <DataTable columns={columns(handleOrderUpdate)} data={completedOrders} />
                            </TabsContent>
                        </Tabs>
                    </>
                )}
            </div>
        </main>
    );
}
