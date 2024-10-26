'use client';

import { use, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from "@/lib/CartContext";
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import PurchaseOrderAlert from '@/components/purchase-order-alert';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

// import { productos } from '@/data/productos';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, CreditCard, Truck, MapPin, Info, User } from "lucide-react"
import Image from 'next/image';

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
};

interface DiscountCode {
    code_id: string;       // UUID
    code: string;          // The discount code
    percentage: number;    // Discount percentage
    active: boolean;       // Whether the code is active
    stripe_validated: boolean; // Whether it's validated by Stripe
    created_at: string;    // Timestamp of when the code was created
}


const SuccessContent = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    const { emptyCart } = useCart();
    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [discountObject, setDiscountObject] = useState<DiscountCode | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [loadedProducts, setLoadedProducts] = useState(false);

    const { width, height } = useWindowSize()

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
            if (!session_id) {
                setLoading(false);
                setErrorMessage('No se ha recibido el ID de la sesión de pago');
                return;
            }

            try {
                // Verificar el estado del pago con Stripe
                console.log('Verificando el estado del pago...');
                const res = await fetch(`/api/stripe/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id }),
                });

                if (res.ok) {
                    const { payment_status } = await res.json();
                    if (payment_status === 'paid') {
                        // Consultar o guardar la orden en la base de datos
                        const orderRes = await fetch('/api/insertOrders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                session_id,
                                ...JSON.parse(localStorage.getItem('orderInfo') || '{}'),
                                products: JSON.parse(localStorage.getItem('cartItems') || '[]'),
                            }),
                        });

                        if (orderRes.ok) {
                            const result = await orderRes.json();
                            console.log('order result:', result);
                            setOrder(result);

                            // get discount code
                            const validateDiscountCode = async () => {
                                try {
                                    const response = await fetch('/api/getDiscountWithId', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ code_id: result.order.discount_code_id }),
                                    });

                                    if (!response.ok) {
                                        const errorData = await response.json();
                                        throw new Error(errorData.error || 'Error validating discount code');
                                    }

                                    const data = await response.json();
                                    setDiscountObject(data);
                                } catch (error) {
                                    console.log('Error fetching discount code:', error);
                                } finally {
                                    setLoading(false);
                                }
                            };
                            if (result.order.discount_applied) {
                                validateDiscountCode();
                            }

                            // send email
                            const emailResult = await fetch('/api/confirmationEmail', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    session_id,
                                    ...JSON.parse(localStorage.getItem('orderInfo') || '{}'),
                                    products: JSON.parse(localStorage.getItem('cartItems') || '[]'),
                                }),
                            });
                            localStorage.removeItem('orderInfo');
                            localStorage.removeItem('cartItems');
                            emptyCart();
                        } else {
                            setErrorMessage('Error al guardar el pedido');
                        }
                    } else {
                        setErrorMessage('El pago no se completó correctamente');
                    }
                } else {
                    setErrorMessage('Error al verificar el estado del pago, no existe la sesión de pago');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
                setErrorMessage('Error al procesar el pedido');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [session_id]);

    const [isConfettiVisible, setIsConfettiVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsConfettiVisible(false)
        }, 5000)

        // Cleanup timeout when the component unmounts
        return () => clearTimeout(timer)
    }, [])

    if (loading || !loadedProducts) {
        return (
            <div className="flex items-center justify-center" style={{ height: '70vh' }}>
                <div role="status" className="flex flex-col items-center justify-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-gray-500" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Cargando...</span>
                </div>
                <p className="text-lg ml-2 text-gray-500 hidden sm:block">Estamos generando el resumen del pedido...</p>
                <p className="text-lg ml-2 text-gray-500 block sm:hidden">Generando el resumen...</p>
            </div>
        );
    }

    if (!order) {
        return (<div className="flex flex-col bg-white" style={{ height: '60vh' }}>

            <div className="flex flex-1 items-center justify-center">
                <div className="mx-auto max-w-xl px-4 text-center">
                    {/* <h1 className="text-9xl font-extrabold text-gray-500 opacity-50">404</h1> */}
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Lo sentimos
                    </h1>

                    <p className="mt-4 text-gray-500">
                        {errorMessage}
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-block rounded bg-mainAmarillo-100 px-5 py-3 text-sm font-medium text-white hover:bg-yellow-700 hover:shadow-lg focus:outline-none focus:ring"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString) // Parse the date from the string
        const formatter = new Intl.DateTimeFormat('es-MX', {
            timeZone: 'America/Monterrey',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        return formatter.format(date)
    }

    return (
        <>

            {isConfettiVisible && (
                <Confetti
                    width={width}
                    height={height}
                />
            )}

            {/* https://www.tailwindir.com/component/invoice-table */}

            {/* header */}
            <section className="mt-16 relative bg-azulito-100">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto py-10">
                    <div className="w-full flex-col justify-start items-center lg:gap-12 gap-8 inline-flex">

                        {/* Title and description */}
                        <div className="flex-col justify-start items-center gap-3 flex">
                            <Image src="/logos/LOGO_BLANCO.png" alt="Success" width={80} height={80} />
                            <h2 className="text-center text-gray-100 text-4xl font-bold leading-normal">¡Gracias por tu compra!</h2>
                            <p className="max-w-xl text-center text-white text-lg font-normal leading-8">
                                Tu orden ha sido completada exitosamente. A continuación encontrarás los detalles de tu compra.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Order status */}
            <div className='container lg:w-5/6 py-6'>
                <PurchaseOrderAlert
                    status={order.order.shipping_status == 'processing' ? 'processing' : order.order.shipping_status == 'delivered' ? 'delivered' : order.order.shipping_status == 'completed' ? 'completed' : 'processing'}
                    trackingUrl={order.order.tracking_url ? '' : ''}
                />
            </div>

            {/* Order details */}
            <section className="bg-white pt-4 pb-8 antialiased md:pb-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                    <div className="lg:flex lg:gap-8">

                        {/* resumen de compra */}
                        <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 lg:max-w-xl xl:max-w-2xl flex flex-col">
                            <CardHeader className="bg-gray-100">
                                <div className="flex items-center space-x-2">
                                    <Package className="text-black0" />
                                    <CardTitle>Resumen de Compra</CardTitle>
                                </div>
                            </CardHeader>

                            {/* productos */}
                            <div className="max-h-[50vh] overflow-auto sticky top-0 flex-grow">
                                {order?.items?.map((product) => {
                                    const currVariation = products.find(p => p.product_id === product.product_id)?.variations.find(v => v.variation_id === product.variation_id);

                                    return (
                                        <div className="space-y-4 p-6 border-b py-6" key={product.item_id}>
                                            <div className='flex flex-row justify-between'>
                                                <div className="flex items-center gap-6">
                                                    <div className="h-20 w-20">
                                                        <img
                                                            className="mr-4 h-20 w-20 rounded object-cover object-center"
                                                            src={currVariation?.fotos[0]}
                                                            alt={product.product_name}
                                                        />
                                                    </div>

                                                    <div>
                                                        <a href={`/catalogo/${currVariation?.product_id}`} className="font-bold text-gray-900 hover:underline">{product.product_name}</a>
                                                        <div className="">{currVariation?.talla} x {currVariation?.color}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-4">
                                                    <p className="text-base font-normal text-gray-900">x{product.quantity}</p>
                                                    <p className="text-xl font-bold leading-tight text-gray-900">{formatCurrency(currVariation?.precio)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Desgloce precio */}
                            <div className="space-y-4 bg-gray-50 p-6 mt-auto">
                                <div className="space-y-2">
                                    {/* total */}
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-400">Precio original</dt>
                                        <dd className="font-medium text-gray-900">{formatCurrency(order.order.total)}</dd>
                                    </dl>

                                    {/* descuento */}
                                    {order.order.discount_applied && (
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="font-normal text-gray-500 dark:text-gray-400">Descuento {discountObject?.percentage}%</dt>
                                            <dd className="text-base font-medium text-green-500">-{formatCurrency(((discountObject?.percentage ?? 0) / 100) * order.order.total)}</dd>
                                        </dl>
                                    )}

                                    {/* costo de envio */}
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-400">Costo de envío</dt>
                                        <dd className="font-medium text-gray-900">{order.order.shipping_cost > 0 ? `${formatCurrency(order.order.shipping_cost)}` : 'GRATIS'}</dd>
                                    </dl>
                                </div>

                                {/* precio final */}
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-lg font-bold text-gray-900">Total</dt>
                                    <dd className="text-lg font-bold text-gray-900">{formatCurrency(order.order.final_price)} MXN</dd>
                                </dl>
                            </div>
                        </div>

                        {/* order history */}
                        {/* <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="text-xl font-semibold text-gray-900">Order history</h3>

                                <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold text-gray-900">Estimated delivery in 24 Nov 2023</h4>
                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Products delivered</p>
                                    </li>

                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold text-gray-900">Today</h4>
                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Products being delivered</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 font-semibold">23 Nov 2023, 15:15</h4>
                                        <p className="text-sm">Products in the courier's warehouse</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold">22 Nov 2023, 12:27</h4>
                                        <p className="text-sm">Products delivered to the courier - DHL Express</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 font-semibold">19 Nov 2023, 10:47</h4>
                                        <p className="text-sm">Payment accepted - VISA Credit Card</p>
                                    </li>

                                    <li className="ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h4 className="mb-0.5 font-semibold">19 Nov 2023, 10:45</h4>
                                            <a href="#" className="text-sm font-medium hover:underline">Order placed - Receipt #647563</a>
                                        </div>
                                    </li>
                                </ol>

                                <div className="gap-4 sm:flex sm:items-center">
                                    <button type="button" className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel the order</button>

                                    <a href="#" className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Order details</a>
                                </div>
                            </div>
                        </div> */}

                        {/* informacion adicional */}
                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Información Adicional</h3>
                                    <p>Orden creada el {formatDate(order.order.created_at)}</p>
                                </div>

                                <div className="mt-4">
                                    <div className="grid gap-6">

                                        <Separator />

                                        {/* cliente */}
                                        <div>
                                            <h3 className="font-semibold mb-2 flex items-center">
                                                <User className="mr-2" /> Cliente
                                            </h3>
                                            <p>{order.client.name}</p>
                                            <p>{order.client.email}</p>
                                            <p>{order.client.phone}</p>
                                        </div>

                                        <Separator />

                                        {/* pago */}
                                        {/* <div>
                                            <h3 className="font-semibold mb-2 flex items-center">
                                                <CreditCard className="mr-2" /> Pago
                                            </h3>
                                            <p>Estatus: {order.order.payment_status == 'paid' ? 'Pagado' : order.order.payment_status}</p>
                                        </div>

                                        <Separator /> */}

                                        {/* envio */}
                                        <div>
                                            <h3 className="font-semibold mb-2 flex items-center">
                                                <Truck className="mr-2" /> Envío
                                            </h3>
                                            <p>Estatus: {order.order.shipping_status == 'processing' ? 'En proceso' : order.order.shipping_status == 'delivered' ? 'Enviado' : order.order.shipping_status == 'completed' ? 'Paquete entregado' : "Desconocido"}</p>
                                            {/* <p>Costo: {formatCurrency(order.order.shipping_cost)}</p> */}
                                            <p>Tipo: {order.order.shipping_method == 'local' ? 'Envío a domicilio en Monterrey' : order.order.shipping_method == 'nacional' ? 'Envío nacional' : order.order.shipping_method == 'collectif' ? 'Recolección en Collectif' : ''}</p>
                                        </div>

                                        <Separator />

                                        {/* direccion */}
                                        {order.order.shipping_method != 'collectif' && (
                                            <>
                                                <div>
                                                    <h3 className="font-semibold mb-2 flex items-center">
                                                        <MapPin className="mr-2" /> Dirección de Envío
                                                    </h3>
                                                    <p>{order.client.name}</p>
                                                    <p>{order.client.address}, {order.client.municipio}</p>
                                                    <p>{order.client.city}, {order.client.state} {order.client.postal_code}</p>
                                                    <p>{order.client.country}</p>
                                                </div>
                                            </>
                                        )}

                                        {/* Comentarios */}
                                        {order.order.comments && (
                                            <>
                                                <Separator />
                                                <div>
                                                    <h3 className="font-semibold mb-2">Comentarios</h3>
                                                    <p>{`"${order.order.comments}"`}</p>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </>
    );
};

export default SuccessContent;
