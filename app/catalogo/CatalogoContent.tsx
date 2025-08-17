'use client'

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
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
import { Metadata } from 'next';

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
    active: boolean;
    variations: ProductVariation[];
}

interface Category {
    category_id: string;
    name: string;
}

// export const metadata: Metadata = {
//     title: "Catálogo | We The People Wear",
//     description: "Descubre nuestra colección de camisetas con diseños positivos y mensajes inspiradores.",
// };

export default function CatalogoContent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('recent');
    const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({});
    const [loadedProducts, setLoadedProducts] = useState(false);

    const bestsellerIds = [
        '86f8c58e-0428-4c62-bc84-07787e1c2778',
        '10a7ead9-701f-490a-8a1e-95e1e4009b4c',
        '0cfb409f-dd54-4e64-8ab0-3f11181f5581',
        '5158a252-c78f-45b4-a14b-414fa3d3dc42',
        '5544bd99-4da1-4ed8-b0cb-b84bad6e9015'
    ];

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products', {
                    cache: 'no-store', // Ensure no caching
                });
                const data = await response.json();
                console.log('fetched products:', data);
                // filter only the products that have active field as true
                const activeProducts = data.filter((product: Product) => product.active);
                setProducts(activeProducts);
                setLoadedProducts(true);
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
                const response = await fetch('/api/getCategories', {
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

            {/* MAIN */}
            <section className="mt-16">
                <div className="flex min-h-screen w-full">
                    <main className="flex-1">

                        {/* HERO */}
                        <div className="mx-auto lg:flex justify-center items-center flex-col py-12 pt-14 px-3 mb-8 bg-slate-100">
                            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-azulito-100 mb-4 uppercase text-center">
                                ESCUCHASTE BIEN, 3 X $999
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-bold mb-6 text-azulito-100 uppercase">
                                (PROMOCIÓN APLICADA EN EL PAGO)
                            </p>
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
                        {loadedProducts == false ?

                            <div className="flex-grow flex items-center justify-center h-[40vh]">
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
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 mb-20">
                                    {sortedProducts.map((product) => {
                                        const selectedColor = selectedColors[product.product_id] || product.colores[0];
                                        const selectedVariation = product.variations.find(v => v.color === selectedColor);
                                        const isBestseller = bestsellerIds.includes(product.product_id);

                                        console.log('selectedVariation:', selectedVariation);

                                        return (
                                            <div key={product.product_id} className="relative overflow-hidden border bg-background shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                                                {/* Best Seller Banner */}
                                                {isBestseller && (
                                                    <div className="absolute top-0 left-0 z-10 w-32 h-32 overflow-hidden">
                                                        <div className="bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-black text-xs font-bold px-6 py-3 transform -rotate-45 translate-x-[-40px] translate-y-[27px] w-44 text-center">
                                                            BEST SELLER
                                                        </div>
                                                    </div>
                                                )}

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
                            </>

                        }

                    </main>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />

        </main>
    );
}
