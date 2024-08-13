'use client'

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { productos } from '../data/productos';
import { categorias } from '../data/categorias';
import Link from 'next/link';
import Footer from '@/components/Footer';

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


export default function Catalogo() {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('recent');
    const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});

    const filteredProducts = productos
        .filter(producto => selectedCategory ? producto.categoriaId === selectedCategory : true)
        .filter(producto => selectedColor ? producto.colores.includes(selectedColor) : true);

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'recent') {
            return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        }
        if (sortOrder === 'price-asc') {
            const aPrice = a.variaciones.reduce((min, v) => v.precio < min ? v.precio : min, Infinity);
            const bPrice = b.variaciones.reduce((min, v) => v.precio < min ? v.precio : min, Infinity);
            return aPrice - bPrice;
        }
        if (sortOrder === 'price-desc') {
            const aPrice = a.variaciones.reduce((max, v) => v.precio > max ? v.precio : max, -Infinity);
            const bPrice = b.variaciones.reduce((max, v) => v.precio > max ? v.precio : max, -Infinity);
            return bPrice - aPrice;
        }
        return 0;
    });

    const handleColorChange = (productId: number, color: string) => {
        setSelectedColors(prevState => ({
            ...prevState,
            [productId]: color
        }));
    };

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO */}
            <section className="mt-16">

                <div className="flex min-h-screen w-full">

                    <main className="flex-1">

                        <div className="mx-auto lg:flex justify-center items-center flex-col py-12 pt-14 px-3 mb-8 bg-slate-100">
                            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-azulito-100 mb-4 uppercase text-center">
                                say hello to your <br className='hidden md:block' /> new favorite t-shirts!
                            </h1>
                        </div>

                        {/* Barra de opciones */}
                        <div className="flex flex-wrap mb-4 px-4 items-center justify-between">

                            <div className="px-6">
                                <h1 className="text-xl md:text-2xl font-bold">Productos</h1>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    {filteredProducts.length} productos encontrados
                                </p>
                            </div>

                            <div className='flex flex-wrap gap-2'>

                                {/* sort */}
                                <div className='hidden md:block'>
                                    <select
                                        onChange={(e) => setSortOrder(e.target.value)}
                                        className="border p-2 rounded-lg text-md hover:bg-gray-100 hover:cursor-pointer"
                                    >
                                        <option value="recent">Más recientes</option>
                                        <option value="price-asc">Precio: Menor a Mayor</option>
                                        <option value="price-desc">Precio: Mayor a Menor</option>
                                    </select>
                                </div>

                                {/* filters */}
                                <Dialog>

                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                            </svg>
                                            Filtros
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="">

                                        <DialogHeader>
                                            <DialogTitle>Filtros</DialogTitle>
                                            <DialogDescription>
                                                Filtra los productos por categoría, color y orden.
                                            </DialogDescription>
                                            <hr />
                                        </DialogHeader>

                                        <div className='flex flex-col gap-6 py-2'>

                                            {/* categoria */}
                                            <div>
                                                <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-700">Filtrar por categoría:</label>
                                                <select
                                                    id="category"
                                                    onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
                                                    className="border p-2 rounded-lg text-md w-full hover:bg-gray-100 hover:cursor-pointer"
                                                >
                                                    <option value="">Todas las categorías</option>
                                                    {categorias.map((categoria) => (
                                                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* color */}
                                            <div>
                                                <label htmlFor="color" className="block mb-2 text-sm font-semibold text-gray-700">Filtrar por color:</label>
                                                <select
                                                    id="color"
                                                    onChange={(e) => setSelectedColor(e.target.value || null)}
                                                    className="border p-2 rounded-lg text-md w-full hover:bg-gray-100 hover:cursor-pointer"
                                                >
                                                    <option value="">Todos los colores</option>
                                                    <option value="Negro">Negro</option>
                                                    <option value="Gris">Gris</option>
                                                    <option value="Blanco">Blanco</option>
                                                </select>
                                            </div>

                                            {/* sort */}
                                            <div className='block md:hidden'>
                                                <label htmlFor="sort" className="block mb-2 text-sm font-semibold text-gray-700">Ordenar por:</label>
                                                <select
                                                    id="sort"
                                                    onChange={(e) => setSortOrder(e.target.value)}
                                                    className="border p-2 rounded-lg text-md w-full hover:bg-gray-100 hover:cursor-pointer"
                                                >
                                                    <option value="recent">Más recientes</option>
                                                    <option value="price-asc">Precio: Menor a Mayor</option>
                                                    <option value="price-desc">Precio: Mayor a Menor</option>
                                                </select>
                                            </div>

                                        </div>

                                        {/* <DialogFooter>
                                        <Button type="submit">Aplicar</Button>
                                    </DialogFooter> */}

                                    </DialogContent>
                                </Dialog>
                            </div>

                        </div>


                        {/* PRODUCTS */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 mb-20">

                            {sortedProducts.map((producto) => {
                                const selectedColor = selectedColors[producto.id] || producto.colores[0];
                                return (
                                    <div key={producto.id} className="relative overflow-hidden border bg-background shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                                        <Link href={`/catalogo/${producto.id}`} prefetch={false}>
                                            <span className="sr-only">View</span>
                                            <img src={producto.fotos[selectedColor][0]} alt={`${producto.nombre} - ${selectedColor}`} width={500} height={400} className={`object-cover w-full h-64 bg-gray-100`} />
                                        </Link>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold">{producto.nombre}</h3>
                                            <div className="mb-2">
                                                <span className="rounded-full bg-gray-400 px-3 py-1 text-xs font-medium text-primary-foreground">
                                                    {producto.categoriaNombre}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-base font-semibold">${producto.variaciones.find(variacion => variacion.color === selectedColor)?.precio.toFixed(2)}</p>
                                                <div className="flex items-center gap-2">
                                                    Colores:
                                                    {producto.colores.map((color) => (
                                                        <button
                                                            key={color}
                                                            onClick={() => handleColorChange(producto.id, color)}
                                                            className={`h-6 w-6 rounded-full border ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                                                            style={{ backgroundColor: color.toLowerCase() === 'negro' ? 'black' : color.toLowerCase() === 'gris' ? 'gray' : color.toLowerCase() === 'blanco' ? 'white' : '' }}
                                                            aria-label={color}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            {/* <div>
                                                {producto.variaciones.find(variacion => variacion.color === selectedColor)?.tallas.map((talla) => (
                                                    <span key={talla} className="mr-2">{talla}</span>
                                                ))}
                                            </div> */}
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </main>
                </div>

            </section>

            <Footer />


        </main>
    );
}
