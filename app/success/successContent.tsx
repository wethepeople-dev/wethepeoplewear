'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from "@/lib/CartContext";
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

// import { productos } from '@/data/productos';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// import { format, parse } from 'date-fns';
// import { es } from 'date-fns/locale';

// // Function to parse the date string
// function parseDate(dateString: string) {
//     // Extract the date part (yyyy-MM-dd)
//     const datePart = dateString.split(' ')[0];

//     // Parse the extracted date part
//     const parsedDate = parse(datePart, 'yyyy-MM-dd', new Date());

//     return parsedDate;
// }

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


const SuccessContent = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    const { emptyCart } = useCart();
    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

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
                        console.log('Pago completado');
                        // Consultar o guardar la orden en la base de datos
                        console.log('Guardando la orden...');
                        const orderRes = await fetch('/api/orders', {
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
                            console.log('orden guardada')
                            const result = await orderRes.json();
                            setOrder(result);
                            // send email
                            console.log('Enviando correo electrónico de confirmación...');
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
                            console.log('Email enviado');
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

    if (loading || !loadedProducts) {
        return (
            <div className="flex items-center justify-center" style={{ height: '60vh' }}>
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

    return (
        <>

            {/* https://www.tailwindir.com/component/invoice-table */}

            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
                    <div >
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            ¡Gracias por tu compra!
                        </h1>
                        <p className="mt-2 text-md text-gray-500">
                            Tu pedido ha sido recibido y está siendo procesado. Recibirás un correo electrónico con la confirmación del pedido.
                        </p>
                    </div>

                    <div className="mt-16">

                        <div className="space-y-20">
                            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                                <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2">
                                    <div className="flex justify-between sm:block">
                                        <dt className="font-medium text-gray-900">Ordenado el</dt>
                                        <dd className="sm:mt-1">
                                            <p>{order.order.created_at}</p>
                                        </dd>
                                    </div>
                                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                        <dt className='font-medium text-gray-900'>Total</dt>
                                        <dd className="sm:mt-1 font-normal">{formatCurrency(order.order.total)} mxn</dd>
                                    </div>
                                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                        <dt className='font-medium text-gray-900'>Descuento</dt>
                                        <dd className="sm:mt-1 font-normal">{order.order.discount_applied ? formatCurrency(order.order.total - order.order.final_price) : "0"}</dd>
                                    </div>
                                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                        <dt className='font-medium text-gray-900'>Precio final</dt>
                                        <dd className="sm:mt-1 font-normal">{formatCurrency(order.order.final_price)} mxn</dd>
                                    </div>
                                </dl>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto">
                                            Ver Detalles
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Detalles de la orden</DialogTitle>
                                            <DialogDescription>
                                                Aquí puedes ver los detalles de tu orden.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="y-4">
                                            <hr />
                                            <div className='flex flex-col py-2'>
                                                <p className='text-sm text-gray-400'>Ordenado por</p>
                                                <p className='text-md text-gray-800'>{order.client.name}</p>
                                                <p className='text-md text-gray-800'>{order.client.email} | {order.client.phone}</p>
                                            </div>
                                            <hr />
                                            <div className='flex flex-col py-2'>
                                                <p className='text-sm text-gray-400'>Comentarios</p>
                                                <p className='text-md text-gray-800'>{order.order.comments}</p>
                                            </div>
                                            <hr />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                <caption className="sr-only">Products</caption>
                                <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                    <tr>
                                        <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                            Producto
                                        </th>
                                        <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                            Precio
                                        </th>
                                        <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                            Cantidad
                                        </th>
                                        {/* <th scope="col" className="w-0 py-3 text-right font-normal">
                                            Info
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm border-t">
                                    {order?.items?.map((product) => {

                                        const currVariation = products.find(p => p.product_id === product.product_id)?.variations.find(v => v.variation_id === product.variation_id);

                                        return (
                                            <tr key={product.item_id}>
                                                <td className="py-6 pr-8">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={currVariation?.fotos[0]}
                                                            alt={product.product_name}
                                                            className="mr-6 h-16 w-16 rounded object-cover object-center"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{product.product_name}</div>
                                                            <div className="mt-1">{currVariation?.talla} x {currVariation?.color}</div>
                                                            <div className="mt-1 sm:hidden">{currVariation?.precio} x {product.quantity}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">{currVariation?.precio}</td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">{product.quantity}</td>
                                                <td className="whitespace-nowrap py-6 text-right font-medium">
                                                    <a href={`/catalogo/${currVariation?.product_id}`}
                                                        className="text-mainRojo-100 border p-3 rounded-md hover:bg-mainRojo-100 hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainRojo-100 focus:ring-offset-2"
                                                    >
                                                        Ver<span className="hidden lg:inline"> Producto</span>
                                                        <span className="sr-only">, {product.product_name}</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default SuccessContent;
