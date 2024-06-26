'use client'

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { productos } from '../data/productos';
import { categorias } from '../data/categorias';
import Link from 'next/link';

// Definir una lista de colores
const backgroundColors = [
    'bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200',
    'bg-pink-200', 'bg-indigo-200', 'bg-teal-200', 'bg-orange-200', 'bg-lime-200'
];

export default function Catalogo() {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('recent');

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

    const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});

    const handleColorChange = (productId: number, color: string) => {
        setSelectedColors(prevState => ({
            ...prevState,
            [productId]: color
        }));
    };

    // Obtener un color de fondo aleatorio
    const getRandomColor = () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO */}
            <section className="p-5 mt-16">
                <h1 className="text-black text-2xl font-bold mb-4">Catálogo</h1>

                {/* FILTERS */}
                <div className="flex flex-wrap gap-4 mb-4">
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-700">Filtrar por categoría:</label>
                        <select
                            id="category"
                            onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
                            className="border p-2 rounded-lg text-md"
                        >
                            <option value="">Todas las categorías</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="color" className="block mb-2 text-sm font-semibold text-gray-700">Filtrar por color:</label>
                        <select
                            id="color"
                            onChange={(e) => setSelectedColor(e.target.value || null)}
                            className="border p-2 rounded-lg text-md"
                        >
                            <option value="">Todos los colores</option>
                            <option value="Negro">Negro</option>
                            <option value="Gris">Gris</option>
                            <option value="Blanco">Blanco</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sort" className="block mb-2 text-sm font-semibold text-gray-700">Ordenar por:</label>
                        <select
                            id="sort"
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border p-2 rounded-lg text-md"
                        >
                            <option value="recent">Más recientes</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">

                {sortedProducts.map((producto) => {
                    const selectedColor = selectedColors[producto.id] || producto.colores[0];
                    const randomBgColor = getRandomColor();
                    return (
                        <div key={producto.id} className="relative overflow-hidden rounded-lg bg-background shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                            <Link href="#" prefetch={false}>
                                <span className="sr-only">View</span>
                                <img src={producto.fotos[selectedColor][0]} alt={`${producto.nombre} - ${selectedColor}`} width={500} height={400} className={`object-cover w-full h-64 ${randomBgColor}`} />
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

            </section>
        </main>
    );
}
