'use client'

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
// import { productos } from '../data/productos';
// import { categorias } from '../data/categorias';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { formatCurrency } from '@/lib/utils';

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

interface Category {
    category_id: string;
    name: string;
}

export default function Catalogo() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('recent');
    const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({});

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
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories', {
                    cache: 'no-store', // Ensure no caching
                });
                const data = await response.json();
                console.log('fetched categories:', data);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const filteredProducts = products
        .filter(product => selectedCategory ? product.category_id == selectedCategory : true)
        .filter(product => selectedColor ? product.colores.includes(selectedColor) : true);

    console.log('filteredProducts:', filteredProducts);

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'recent') {
            return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        }
        if (sortOrder === 'price-asc') {
            const aPrice = Math.min(...a.variations.map(v => v.precio));
            const bPrice = Math.min(...b.variations.map(v => v.precio));
            return aPrice - bPrice;
        }
        if (sortOrder === 'price-desc') {
            const aPrice = Math.max(...a.variations.map(v => v.precio));
            const bPrice = Math.max(...b.variations.map(v => v.precio));
            return bPrice - aPrice;
        }
        return 0;
    });

    console.log('sortedProducts:', sortedProducts);

    const handleColorChange = (productId: string, color: string) => {
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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
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
                                                <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-700">
                                                    Filtrar por categoría:
                                                </label>
                                                <select
                                                    id="category"
                                                    onChange={(e) => setSelectedCategory(String(e.target.value) || null)}
                                                    className="border p-2 rounded-lg text-md w-full hover:bg-gray-100 hover:cursor-pointer"
                                                >
                                                    <option value="">Todas las categorías</option>
                                                    {categories.map((category) => (
                                                        <option key={category.category_id} value={category.category_id}>{category.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* color */}
                                            <div>
                                                <label htmlFor="color" className="block mb-2 text-sm font-semibold text-gray-700">
                                                    Filtrar por color:
                                                </label>
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
                                                    value={sortOrder}
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

                            {sortedProducts.map((product) => {
                                const selectedColor = selectedColors[product.product_id] || product.colores[0];
                                const selectedVariation = product.variations.find(v => v.color === selectedColor);

                                console.log('selectedVariation:', selectedVariation);

                                return (
                                    <div key={product.product_id} className="relative overflow-hidden border bg-background shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                                        <a href={`/catalogo/${product.product_id}`}>
                                            <img
                                                src={selectedVariation?.fotos[0]}
                                                alt={`${product.name} - ${selectedColor}`}
                                                className="object-cover w-full h-64 bg-gray-100"
                                            />
                                        </a>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold">{product.name}</h3>
                                            <div className="mb-2">
                                                <span className="rounded-full bg-gray-400 px-3 py-1 text-xs font-medium text-primary-foreground">
                                                    {categories.find(c => c.category_id === product.category_id)?.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-base font-semibold">{formatCurrency(Number(selectedVariation?.precio))} MXN</p>
                                                <div className="flex items-center gap-2">
                                                    Colores:
                                                    {product.colores.map((color) => (
                                                        <button
                                                            key={color}
                                                            onClick={() => handleColorChange(product.product_id, color)}
                                                            className={`h-6 w-6 rounded-full border ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                                                            style={{ backgroundColor: color.toLowerCase() === 'negro' ? 'black' : color.toLowerCase() === 'gris' ? 'gray' : color.toLowerCase() === 'blanco' ? 'white' : '' }}
                                                            aria-label={color}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
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
