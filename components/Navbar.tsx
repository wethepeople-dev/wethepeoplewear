import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { ScrollArea } from "@/components/ui/scroll-area"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

import clsx from "clsx";
import { useCart } from '@/lib/CartContext';

import { formatCurrency } from '@/lib/utils';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {

    const [searchInput, setSearchInput] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

    const pathname = usePathname();
    const { getCartQuantity, getTotal, getCart, emptyCart, removeCartItem } = useCart();
    const cant = getCartQuantity();
    const total = getTotal();
    const cart = getCart();

    const handleEmptyCart = () => {
        emptyCart();
        toast.success("Carrito vaciado", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    };

    const handleRemoveCartItem = (productId: number, talla: string, color: string) => () => {
        removeCartItem(productId, talla, color);
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-lg">
            <div className="relative">

                {/* For large screens */}
                <div className="md:px-6 py-4">
                    <div className="container mx-auto flex items-center justify-between">

                        {/* logo */}
                        <Link href={'/'} className="md:w-2/12 cursor-pointer text-gray-800" aria-label="We the people logo">
                            <img src="/logos/LOGO_NEGRO.png" className="h-9" alt="We the people logo" />
                        </Link>

                        {/* middle part */}
                        <ul className="hidden w-8/12 md:flex items-center justify-center space-x-8">

                            <NavigationMenu>
                                <NavigationMenuList>

                                    {/* conocenos */}
                                    <NavigationMenuItem>
                                        <Link href="/conocenos" legacyBehavior passHref>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname == '/conocenos' ? "bg-gray-100" : "")}>
                                                Conócenos
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>

                                    {/* catalogo */}
                                    <NavigationMenuItem>
                                        <Link href="/catalogo" legacyBehavior passHref>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname == '/catalogo' ? "bg-gray-100" : "")}>
                                                Catálogo
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>

                                    {/* blog */}
                                    {/* <NavigationMenuItem>
                                        <Link href="/blog" legacyBehavior passHref>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname == '/blog' ? "bg-gray-100" : "")}>
                                                Blog
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem> */}

                                    {/* contacto */}
                                    <NavigationMenuItem>
                                        <Link href="/contacto" legacyBehavior passHref>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname == '/contacto' ? "bg-gray-100" : "")}>
                                                Contacto
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>

                                </NavigationMenuList>
                            </NavigationMenu>

                        </ul>

                        {/* right part */}
                        <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">

                            <div className="hidden md:flex items-center space-x-4 xl:space-x-8">

                                <NavigationMenu>
                                    <NavigationMenuList>

                                        {/* wishlist grande */}
                                        {/* <NavigationMenuItem>
                                            <Link href="/wishlist" legacyBehavior passHref>
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem> */}

                                        {/* carrito grande */}
                                        <Sheet>
                                            <NavigationMenuItem>
                                                <SheetTrigger asChild>
                                                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                        </svg> */}
                                                        <span className='mr-2'>{formatCurrency(total)}</span>
                                                        <span className="relative inline-block">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                            </svg>
                                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-500 rounded-full">
                                                                {cant}
                                                            </span>
                                                        </span>
                                                    </NavigationMenuLink>
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        <SheetTitle>Carrito</SheetTitle>
                                                        <SheetDescription>
                                                            Revisa los productos que has agregado al carrito.
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <div className="grid gap-4 py-4">

                                                        <hr />

                                                        {cart.length === 0 &&
                                                            <>
                                                                <>
                                                                    <div className="flex flex-col bg-white" style={{ height: '70vh' }}>
                                                                        <div className="flex flex-1 items-center justify-center">
                                                                            <div className="mx-auto max-w-xl px-4 text-center">
                                                                                <div className="flex justify-center items-center">
                                                                                    <img className="w-32 h-32 mb-8 rounded-full object-cover"
                                                                                        src="/logos/icon.png"
                                                                                        alt="image empty states" />
                                                                                </div>
                                                                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                                                                    Tu carrito esta vacío
                                                                                </h1>

                                                                                <p className="mt-2 text-gray-500">
                                                                                    Descubre los productos que tenemos para ti.
                                                                                </p>

                                                                                <Link
                                                                                    href="/catalogo"
                                                                                    className="mt-6 inline-block rounded bg-azulito-100 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400 hover:shadow-lg focus:outline-none focus:ring"
                                                                                >
                                                                                    Explorar productos
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            </>
                                                        }


                                                        <ScrollArea className={cn("h-[55vh] mt-[-14px]", cart.length > 0 ? 'border-b' : '')}>
                                                            {cart.length > 0 && cart.map((item, index) => (
                                                                <>
                                                                    <div key={index} className="flex items-center justify-between py-2 pr-3">
                                                                        <div className="flex items-center space-x-2">
                                                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                <img src={item.foto} alt={item.nombre} className="h-full w-full object-contain object-center" />
                                                                            </div>
                                                                            <div className='px-1'>
                                                                                <p className='font-semibold'>{item.nombre}</p>
                                                                                <p className='text-gray-700 text-sm'>{item.cantidad} x {formatCurrency(item.variacion.precio)}</p>
                                                                                <p className='text-gray-700 text-sm'>{item.variacion.talla} - {item.variacion.color}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Button className='bg-transparent text-red-600 border border-red-600 hover:bg-red-300 px-3' onClick={handleRemoveCartItem(item.productId, item.variacion.talla, item.variacion.color)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                                </svg>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                </>
                                                            ))}
                                                        </ScrollArea>

                                                        {cart.length > 0 &&
                                                            <div className="px-4 pt-2 sm:px-6">
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <p>Subtotal</p>
                                                                    <p>{formatCurrency(total)} MXN</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500 text-center">
                                                                    Costo de envío calculados en el checkout.
                                                                </p>
                                                                <div className="mt-6">
                                                                    <a href="/carrito" className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-azulito-100">Checkout</a>
                                                                </div>
                                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                                    <p>
                                                                        o &nbsp;
                                                                        <Link href={'/catalogo'} className="font-medium text-gray-800 hover:text-azulito-100">
                                                                            Sigue Comprando
                                                                            <span aria-hidden="true"> &rarr;</span>
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>

                                                    {/* {cart.length > 0 &&
                                                        <SheetFooter>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button className='text-red-600 border border-red-600 bg-transparent hover:bg-red-100'>
                                                                        Vaciar carrito
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>¿Vaciar carrito?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Esta acción no se puede deshacer.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                        <AlertDialogAction className="bg-red-500" onClick={handleEmptyCart}>Vaciar</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                            <Link href={'/carrito'}>
                                                                <Button>
                                                                    Finalizar compra
                                                                </Button>
                                                            </Link>
                                                        </SheetFooter>
                                                    }
                                                    <ToastContainer /> */}

                                                </SheetContent>
                                            </NavigationMenuItem>
                                        </Sheet>

                                    </NavigationMenuList>
                                </NavigationMenu>

                            </div>

                            <div className="flex md:hidden">

                                <NavigationMenu>
                                    <NavigationMenuList className='space-x-2'>

                                        {/* carrito pequeño */}
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                                                    <span className='mr-2'>{formatCurrency(total)}</span>
                                                    <span className="relative inline-block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                        </svg>
                                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-500 rounded-full">
                                                            {cant}
                                                        </span>
                                                    </span>
                                                </NavigationMenuLink>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Carrito</SheetTitle>
                                                    {/* <SheetDescription>
                                                        Tus productos agregados.
                                                    </SheetDescription> */}
                                                </SheetHeader>
                                                <div className="grid gap-4 py-4">

                                                    <hr />

                                                    {cart.length === 0 &&
                                                        <>
                                                            <>
                                                                <div className="flex flex-col bg-white" style={{ height: '70vh' }}>
                                                                    <div className="flex flex-1 items-center justify-center">
                                                                        <div className="mx-auto max-w-xl px-4 text-center">
                                                                            <div className="flex justify-center items-center">
                                                                                <img className="w-32 h-32 mb-8 rounded-full object-cover"
                                                                                    src="/logos/icon.png"
                                                                                    alt="image empty states" />
                                                                            </div>
                                                                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                                                                Tu carrito esta vacío
                                                                            </h1>

                                                                            <p className="mt-2 text-gray-500">
                                                                                Descubre los productos que tenemos para ti.
                                                                            </p>

                                                                            <Link
                                                                                href="/catalogo"
                                                                                className="mt-6 inline-block rounded bg-azulito-100 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400 hover:shadow-lg focus:outline-none focus:ring"
                                                                            >
                                                                                Explorar productos
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        </>
                                                    }

                                                    <ScrollArea className={cn("h-[55vh] mt-[-14px]", cart.length > 0 ? 'border-b' : '')}>
                                                        {cart.length > 0 && cart.map((item, index) => (
                                                            <>
                                                                <div key={index} className="flex items-center justify-between py-2 pr-3">
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                            <img src={item.foto} alt={item.nombre} className="h-full w-full object-contain object-center" />
                                                                        </div>
                                                                        <div className='px-1'>
                                                                            <p className='font-semibold'>{item.nombre}</p>
                                                                            <p className='text-gray-700 text-sm'>{item.cantidad} x {formatCurrency(item.variacion.precio)}</p>
                                                                            <p className='text-gray-700 text-sm'>{item.variacion.talla} - {item.variacion.color}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Button className='bg-transparent text-red-600 border border-red-600 hover:bg-red-300 px-3' onClick={handleRemoveCartItem(item.productId, item.variacion.talla, item.variacion.color)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                            </svg>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                            </>
                                                        ))}
                                                    </ScrollArea>

                                                </div>

                                                {cart.length > 0 &&
                                                    <div className="px-4 pt-2 sm:px-6">
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <p>Subtotal</p>
                                                            <p>{formatCurrency(total)} MXN</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500 text-center">
                                                            Envío calculado en el checkout.
                                                        </p>
                                                        <div className="mt-6">
                                                            <a href="/carrito" className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-azulito-100">Checkout</a>
                                                        </div>
                                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                            <p>
                                                                o &nbsp;
                                                                <Link href={'/catalogo'} className="font-medium text-gray-800 hover:text-azulito-100">
                                                                    Sigue Comprando
                                                                    <span aria-hidden="true"> &rarr;</span>
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                }

                                                {/* {cart.length > 0 &&
                                                    <SheetFooter>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button className='text-red-600 border border-red-600 bg-transparent hover:bg-red-100 mt-2'>
                                                                    Vaciar carrito
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>¿Vaciar carrito?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Esta acción no se puede deshacer.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                    <AlertDialogAction className="bg-red-500" onClick={handleEmptyCart}>Vaciar</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                        <Link href={'/carrito'} className='w-full'>
                                                            <Button className='w-full'>
                                                                Finalizar compra
                                                            </Button>
                                                        </Link>
                                                    </SheetFooter>
                                                }
                                                <ToastContainer /> */}

                                            </SheetContent>
                                        </Sheet>

                                        {/* hamburger button */}
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "cursor-pointer border")} onClick={() => setShowMenu(true)}>
                                            <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </NavigationMenuLink>

                                    </NavigationMenuList>
                                </NavigationMenu>

                            </div>
                        </div>
                    </div>
                </div>

                {/* SMALL screens */}
                <div id="mobile-menu" className={`${showMenu ? "flex" : "hidden"} absolute z-10 inset-0 md:hidden bg-white flex-col h-screen w-full`}>

                    {/* top */}
                    <div className="flex items-center justify-between border-b border-gray-200 py-5 px-6">

                        {/* logo */}
                        <Link href={'/'} className="md:w-2/12 cursor-pointer text-gray-800" aria-label="We the people logo">
                            <img src="/logos/LOGO_NEGRO.png" className="h-9" alt="We the people logo" />
                        </Link>

                        {/* close button */}
                        <button onClick={() => setShowMenu(false)} aria-label="close menu" className="focus:outline-none rounded focus:ring-gray-600">
                            <svg className="fill-stroke text-gray-800 " width={22} height={22} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 4L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>

                    {/* links */}
                    <div className="mt-4 p-4">

                        <ul className="flex flex-col space-y-2">

                            {/* conocenos */}
                            <li>
                                <a href="/conocenos" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 rounded text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                    Conócenos
                                    <div>
                                        <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                            </li>

                            {/* catalogo */}
                            <li>
                                <a href="/catalogo" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 rounded text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                    Catálogo
                                    <div>
                                        <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                            </li>

                            {/* blog */}
                            {/* <li>
                                <a href="blog" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 rounded text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                    Blog
                                    <div>
                                        <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                            </li> */}

                            {/* contacto */}
                            <li>
                                <a href="contacto" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 rounded text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                    Contacto
                                    <div>
                                        <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                            </li>

                        </ul>

                    </div>


                    {/* bottom */}
                    <div className="h-full flex items-end">
                        <ul className="flex flex-col space-y-4 bg-gray-50 w-full py-5 pb-10 p-4">

                            {/* Carrito */}
                            <li>
                                <a href="/carrito" className="text-gray-800 flex items-center space-x-2 focus:outline-none py-2 px-3 rounded hover:bg-gray-100 focus:bg-gray-300 focus:ring-gray-300">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                    </div>
                                    <p className="text-base">Carrito</p>
                                </a>
                            </li>

                            {/* Wishlist */}
                            {/* <li>
                                <a href="#" className="text-gray-800 flex items-center space-x-2 focus:outline-none py-2 px-3 rounded hover:bg-gray-100 focus:bg-gray-300 focus:ring-gray-300">
                                    <div>
                                        <svg className="fill-stroke" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-base">Wishlist</p>
                                </a>
                            </li> */}

                        </ul>
                    </div>

                </div>


            </div>
        </nav>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"