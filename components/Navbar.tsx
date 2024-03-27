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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Separator } from "@/components/ui/separator"

export default function Navbar() {

    const [searchInput, setSearchInput] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

    return (
        <nav className="border-b">
            <div className="relative">

                {/* For large screens */}
                <div className="md:px-6 py-4">
                    <div className="container mx-auto flex items-center justify-between">

                        <Link href={'/'} className="md:w-2/12 cursor-pointer text-gray-800" aria-label="We the people logo">
                            <img src="/logos/LOGO_NEGRO.png" className="h-9" alt="We the people logo" />
                        </Link>

                        <ul className="hidden w-8/12 md:flex items-center justify-center space-x-8">

                            <NavigationMenu>
                                <NavigationMenuList>

                                    {/* conocenos */}
                                    <NavigationMenuItem>
                                        <Link href="/conocenos" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Conócenos
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>

                                    {/* catalogo */}
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Catálogo</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                <li className="row-span-3">
                                                    <NavigationMenuLink asChild>
                                                        <a
                                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                            href="/catalogo"
                                                        >
                                                            {/* <Icons.logo className="h-6 w-6" /> */}
                                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                                Colecciones
                                                            </div>
                                                            <p className="text-sm leading-tight text-muted-foreground">
                                                                Beautifully designed components that you can copy and
                                                                paste into your apps. Accessible. Customizable. Open
                                                                Source.
                                                            </p>
                                                        </a>
                                                    </NavigationMenuLink>
                                                </li>
                                                <ListItem href="/catalogo" title="Nuevos Lanzamientos">
                                                    Explora lo más reciente en nuestro catálogo.
                                                </ListItem>
                                                <ListItem href="/catalogo" title="Lo más vendido">
                                                    Descubre los productos más populares.
                                                </ListItem>
                                                <ListItem href="/catalogo" title="Todos los productos">
                                                    Explora todos nuestros productos.
                                                </ListItem>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    {/* blog */}
                                    <NavigationMenuItem>
                                        <Link href="/blog" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Blog
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>

                                    {/* contacto */}
                                    <NavigationMenuItem>
                                        <Link href="/contacto" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Contacto
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>

                                </NavigationMenuList>
                            </NavigationMenu>

                        </ul>

                        <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">

                            {/* <div className="hidden lg:flex items-center">
                    <button onClick={() => setSearchInput(!searchInput)} aria-label="search items" className="text-gray-800focus:outline-none focus:ring-gray-800">
                      <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 11C5 15.4183 8.58172 19 13 19C17.4183 19 21 15.4183 21 11C21 6.58172 17.4183 3 13 3C8.58172 3 5 6.58172 5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.99961 20.9999L7.34961 16.6499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <input id="searchInput" type="text" placeholder="search" className={` ${searchInput ? "hidden" : ""} text-sm text-gray-600 rounded ml-1 border border-transparent focus:outline-none focus:border-gray-400 px-1`} />
                  </div> */}

                            <div className="hidden md:flex items-center space-x-4 xl:space-x-8">

                                <NavigationMenu>
                                    <NavigationMenuList>

                                        {/* wishlist grande */}
                                        <NavigationMenuItem>
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
                                        </NavigationMenuItem>

                                        {/* carrito grande */}
                                        <NavigationMenuItem>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                                                <Sheet>
                                                    <SheetTrigger asChild>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                        </svg>
                                                    </SheetTrigger>
                                                    <SheetContent>
                                                        <SheetHeader>
                                                            <SheetTitle>Edit profile</SheetTitle>
                                                            <SheetDescription>
                                                                Make changes to your profile here. Click save when youre done.
                                                            </SheetDescription>
                                                        </SheetHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="name" className="text-right">
                                                                    Name
                                                                </Label>
                                                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="username" className="text-right">
                                                                    Username
                                                                </Label>
                                                                <Input id="username" value="@peduarte" className="col-span-3" />
                                                            </div>
                                                        </div>
                                                        <SheetFooter>
                                                            <SheetClose asChild>
                                                                <Button type="submit">Save changes</Button>
                                                            </SheetClose>
                                                        </SheetFooter>
                                                    </SheetContent>
                                                </Sheet>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>

                                    </NavigationMenuList>
                                </NavigationMenu>

                            </div>

                            <div className="flex md:hidden">

                                <NavigationMenu>
                                    <NavigationMenuList>

                                        {/* carrito pequeño */}
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                    </svg>
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        <SheetTitle>Edit profile</SheetTitle>
                                                        <SheetDescription>
                                                            Make changes to your profile here. Click save when youre done.
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="name" className="text-right">
                                                                Name
                                                            </Label>
                                                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Username
                                                            </Label>
                                                            <Input id="username" value="@peduarte" className="col-span-3" />
                                                        </div>
                                                    </div>
                                                    <SheetFooter>
                                                        <SheetClose asChild>
                                                            <Button type="submit">Save changes</Button>
                                                        </SheetClose>
                                                    </SheetFooter>
                                                </SheetContent>
                                            </Sheet>
                                        </NavigationMenuLink>

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

                    <div className="flex items-center justify-between border-b border-gray-200 py-5 px-6">

                        {/* <div className="flex items-center space-x-3">
                  <div>
                    <svg className="fill-stroke text-gray-800 " width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18.9984 18.9999L14.6484 14.6499" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input type="text" placeholder="Search for products" className="text-sm text-gray-600 placeholder-gray-600 focus:outline-none" />
                </div> */}

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
                            <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
                                <CollapsibleTrigger className='w-full flex items-center justify-between hover:bg-gray-100 py-2 px-3 rounded text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300'>
                                    Catálogo
                                    <div>
                                        {isCollapsibleOpen ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={14} height={14} className="fill-stroke text-black">
                                                <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth="1.5" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>

                                        ) : (
                                            <svg className="fill-stroke text-black" xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 12 12" fill="none">
                                                <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className='p-3'>

                                    <li>
                                        <a href="/catalogo" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                            Colecciones
                                            <div>
                                                <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </a>
                                    </li>

                                    <Separator />

                                    <li>
                                        <a href="/catalogo" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                            Nuevos lanzamientos
                                            <div>
                                                <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </a>
                                    </li>

                                    <Separator />

                                    <li>
                                        <a href="/catalogo" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                            Lo más vendido
                                            <div>
                                                <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </a>
                                    </li>

                                    <Separator />

                                    <li>
                                        <a href="/catalogo" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                            Todos los productos
                                            <div>
                                                <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </a>
                                    </li>

                                    <Separator />

                                </CollapsibleContent>
                            </Collapsible>

                            {/* blog */}
                            <li>
                                <a href="blog" className="flex items-center justify-between hover:bg-gray-100 py-2 px-3 rounded text-base text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-gray-300">
                                    Blog
                                    <div>
                                        <svg className="fill-stroke text-black " width={15} height={15} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                            </li>

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

                    <div className="h-full flex items-end">
                        <ul className="flex flex-col space-y-4 bg-gray-50 w-full py-5 pb-10 p-4">

                            {/* Carrito */}
                            <li>
                                <a href="#" className="text-gray-800 flex items-center space-x-2 focus:outline-none py-2 px-3 rounded hover:bg-gray-100 focus:bg-gray-300 focus:ring-gray-300">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                    </div>
                                    <p className="text-base">Cart</p>
                                </a>
                            </li>

                            {/* Wishlist */}
                            <li>
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
                            </li>

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