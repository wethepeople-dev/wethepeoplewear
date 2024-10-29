'use client'

import { cn } from "@/lib/utils"
import { BarChart3, Menu, Settings, ShoppingCart, Users, ArrowLeft } from "lucide-react"

import { useState, useEffect, use } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Truck } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

import { usePathname } from 'next/navigation'
import { useSidebar } from "@/lib/AdminSidebarContext"
import { set } from "react-hook-form"

interface ProductVariation {
    variation_id: string;
    product_id: string;
    color: string;
    talla: string;
    precio: number;
    fotos: string[];
    stock_qty: number;
}

interface Product {
    product_id: string;
    name: string;
    description: string;
    category_id: string;
    colores: string[];
    tallas: string[];
    release_date: string;
    variations: ProductVariation[];
}

type Client = {
    client_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    municipio: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    created_at: string;
};

type Order = {
    order_id: string;
    client_id: string;
    final_price: number;
    discount_applied: boolean;
    discount_code_id: string | null;
    comments: string | null;
    completed: boolean;
    total: number;
    session_id: string;
    tracking_id: string | null;
    tracking_url: string | null;
    shipping_status: string | null;
    shipping_cost: number;
    shipping_method: string | null;
    payment_status: string | null;
    created_at: string;
    updated_at: string;
};

type OrderItem = {
    item_id: string;
    order_id: string;
    product_name: string;
    product_id: string;
    variation_id: string;
    quantity: number;
};

type OrderResponse = {
    order: Order;
    client: Client;
    items: OrderItem[];
    discountCode: DiscountCode | null;
};

interface DiscountCode {
    code_id: string;       // UUID
    code: string;          // The discount code
    percentage: number;    // Discount percentage
    active: boolean;       // Whether the code is active
    stripe_validated: boolean; // Whether it's validated by Stripe
    created_at: string;    // Timestamp of when the code was created
}

export default function Blogs() {

    function getLastElementFromUrl(url: string): string {
        // Split the URL by '/' and filter out empty strings
        const segments = url.split('/').filter(segment => segment !== '');

        // Return the last segment
        return segments.length > 0 ? segments[segments.length - 1] : '';
    }

    const { toggleSidebar } = useSidebar();
    const pathname = usePathname();
    const orderId = getLastElementFromUrl(pathname);

    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [loadedOrder, setLoadedOrder] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loadedProducts, setLoadedProducts] = useState(false);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products', {
                    cache: 'no-store', // Ensure no caching
                });
                const data = await response.json();
                console.log('fetched products:', data);
                setProducts(data);
                setLoadedProducts(true);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/getOrderById`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ order_id: orderId }),
                });
                const data = await response.json();
                console.log(data);
                setOrder(data);
                setLoadedOrder(true);
            } catch (error) {
                console.error(error);
            }
        }

        fetchOrder();
    }, [orderId]);

    function getTotalProducts(items: OrderItem[]): number {
        return items.reduce((total, item) => total + item.quantity, 0);
    }

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
                <h1 className="text-2xl font-semibold">Orden</h1>
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

            {!loadedOrder || !loadedProducts ?

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

                <div className="container mx-auto p-4 space-y-6">
                    <div className="flex flex-row items-center">
                        <Link href={'/admin/orders'} className="hover:text-gray-500 hover:bg-gray-200 rounded-full mx-2 p-2">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-3xl font-bold">Resumen de Orden</h1>
                    </div>

                    {/* Price Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Desgloce de Precio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Precio original:</span>
                                    <span>${order?.order?.total}</span>
                                </div>
                                {order?.discountCode && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Descuento aplicado {order?.discountCode?.percentage}%:</span>
                                        <span>-${((order?.discountCode?.percentage) / 100) * order?.order.total}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Shipping Cost:</span>
                                    <span>{order?.order?.shipping_cost == 0 ? 'GRATIS' : `$${order?.order?.shipping_cost}`}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                    <span>Precio Final:</span>
                                    <span>${order?.order?.final_price}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{getTotalProducts(order?.items ?? [])} productos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order?.items.map((product) => {

                                    const currVariation = products.find(p => p.product_id === product.product_id)?.variations.find(v => v.variation_id === product.variation_id);

                                    return (

                                        <>
                                            <hr />
                                            <div key={product.item_id} className="flex items-center space-x-4">
                                                <Image
                                                    src={currVariation?.fotos[0] || '/path/to/default/image.png'}
                                                    alt={product.product_name}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-md"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold">{product.product_name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Talla: {currVariation?.talla}, Color: {currVariation?.color}
                                                    </p>
                                                    <p className="text-sm">Cantidad: {product.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">${currVariation?.precio}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        ${(currVariation?.precio ?? 0) * product.quantity} total
                                                    </p>
                                                </div>
                                            </div>
                                        </>

                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipment Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de Envío</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Truck className="h-5 w-5" />
                                <span>Tipo: {order?.order.shipping_method == 'local' ? 'Envío a domicilio en Monterrey' : order?.order.shipping_method == 'nacional' ? 'Envío nacional' : order?.order.shipping_method == 'collectif' ? 'Recolección en Collectif' : ''}</span>
                            </div>
                            <Badge className={`${order?.order.shipping_status == 'processing' ? 'bg-gray-400' : order?.order.shipping_status == 'delivered' ? 'bg-yellow-400' : order?.order.shipping_status == 'completed' ? 'bg-green-400' : "bg-gray-400"} h-6`}>
                                {order?.order.shipping_status == 'processing' ? 'En proceso' : order?.order.shipping_status == 'delivered' ? 'Enviado' : order?.order.shipping_status == 'completed' ? 'Paquete entregado' : "Desconocido"}
                            </Badge>
                        </CardContent>
                    </Card>

                    {/* Client Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Cliente</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold">Contacto</h3>
                                    <p>{order?.client.name}</p>
                                    <p>{order?.client.email}</p>
                                    <p>{order?.client.phone}</p>
                                </div>
                                {order?.client.address && (
                                    <div>
                                        <h3 className="font-semibold">Dirección de Envío</h3>
                                        <p>{order?.client.address}, {order?.client.municipio} {order?.client.postal_code}</p>
                                        <p>{order?.client.city}, {order?.client.state}, {order?.client.country}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Comments */}
                    {order?.order.comments && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Comentarios</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{order?.order.comments}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

            }


        </main>
    );
}
