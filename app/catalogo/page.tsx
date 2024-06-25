'use client'

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { productos } from '../data/productos';
import { categorias } from '../data/categorias';

export default function Catalogo() {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const filteredProducts = selectedCategory
        ? productos.filter((producto) => producto.categoriaId === selectedCategory)
        : productos;

    const sortedProducts = filteredProducts.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

    const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});

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
            <section className="p-5 mt-16">
                <h1 className="text-black text-2xl font-bold mb-4">Catálogo</h1>

                {/* FILTER BY CATEGORY */}
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2">Filtrar por categoría:</label>
                    <select
                        id="category"
                        onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
                        className="border p-2"
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                        ))}
                    </select>
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedProducts.map((producto) => {
                        const selectedColor = selectedColors[producto.id] || producto.colores[0];
                        return (
                            <div key={producto.id} className="border p-4">
                                <img src={producto.fotos[selectedColor][0]} alt={`${producto.nombre} - ${selectedColor}`} className="mb-2" />
                                <h2 className="text-xl">{producto.nombre}</h2>
                                <p>{producto.categoriaNombre}</p>
                                <p>${producto.variaciones.find(variacion => variacion.color === selectedColor)?.precio.toFixed(2)}</p>
                                <p>{producto.descripcion}</p>
                                <div className="flex space-x-2">
                                    {producto.colores.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleColorChange(producto.id, color)}
                                            className={`p-2 border ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                                            style={{ backgroundColor: color.toLowerCase() === 'negro' ? 'black' : color.toLowerCase() === 'gris' ? 'gray' : color.toLowerCase() === 'blanco' ? 'white' : '' }}
                                            aria-label={color}
                                        />
                                    ))}
                                </div>
                                <div>
                                    {producto.variaciones.find(variacion => variacion.color === selectedColor)?.tallas.map((talla) => (
                                        <span key={talla} className="mr-2">{talla}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
