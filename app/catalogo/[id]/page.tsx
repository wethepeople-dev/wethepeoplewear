'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { productos } from '@/app/data/productos';
import { Producto } from '@/app/data/productos';

export default function SingleProduct({ params }: { params: { id: string } }) {

    const id = params.id;
    const [producto, setProducto] = useState<Producto | null>(null);
    const [productoCargado, setProductoCargado] = useState<Boolean>(false);

    useEffect(() => {
        const productoEncontrado = productos.find((p) => p.id === Number(id));
        if (productoEncontrado) {
            setProductoCargado(true);
            setProducto(productoEncontrado);
            //     setCartImage(productoEncontrado.fotos[0]);
            //     setCurrentImage(productoEncontrado.fotos[0]);
            //     setTamanio(productoEncontrado.variaciones[0].tamanio);
            //     setVariacion(productoEncontrado.variaciones[0]);
            //     setProductName(productoEncontrado.nombre);
        } else {
            setProductoCargado(true);
            setProducto(null);
        }
    }, [id]);

    // {
    //     id: 1,
    //     nombre: "Chase Your Dream",
    //     categoriaId: 1,
    //     categoriaNombre: "Graphic T-Shirts",
    //     descripcion: "Una camiseta inspiradora que te recuerda perseguir tus sueños.",
    //     colores: ["Blanco"],
    //     variaciones: [
    //         // { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
    //         // { color: "Gris", precio: 450, tallas: ["S", "M", "L", "XL"] },
    //         { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
    //     ],
    //     fotos: {
    //         // "Negro": ["https://example.com/images/chase-your-dream-black-front.png", "https://example.com/images/chase-your-dream-black-back.png"],
    //         // "Gris": ["https://example.com/images/chase-your-dream-grey-front.png", "https://example.com/images/chase-your-dream-grey-back.png"],
    //         "Blanco": ["/camisas/chaseyourdream_blanca_back.png", "/camisas/chaseyourdream_blanca_both.png"]
    //     },
    //     releaseDate: "2024-06-20"
    // }

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO */}
            <section className="mt-20 p-5">

                {!productoCargado ?

                    <div className="flex-grow flex items-center justify-center">
                        <div role="status" className="flex flex-col items-center justify-center">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Cargando...</span>
                        </div>
                    </div>

                    :

                    producto == null ?

                        <div className="flex flex-col bg-white" style={{ height: '60vh' }}>

                            <div className="flex flex-1 items-center justify-center">
                                <div className="mx-auto max-w-xl px-4 text-center">
                                    <h1 className="md:text-9xl text-7xl font-extrabold text-gray-500 opacity-50">404</h1>
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        Lo sentimos
                                    </h1>

                                    <p className="mt-4 text-gray-500">
                                        El producto que buscas no existe o fue eliminado.
                                    </p>

                                    <a
                                        href="/catalogo"
                                        className="mt-6 inline-block rounded bg-azulito-100 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                                    >
                                        Volver al catálogo
                                    </a>
                                </div>
                            </div>
                        </div>

                        :

                        <>

                            {/* https://tailwindflex.com/@jaxstone/product-page-2 */}
                            <div className="py-8">
                                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex flex-col md:flex-row -mx-4">

                                        {/* izquierda */}
                                        <div className="md:flex-1 px-4">

                                            {/* foto */}
                                            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                                                <img className="w-full h-full object-cover" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image" />
                                            </div>

                                            {/* botones */}
                                            <div className="flex -mx-2 mb-4">
                                                <div className="w-1/2 px-2">
                                                    <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Cart</button>
                                                </div>
                                                <div className="w-1/2 px-2">
                                                    <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Add to Wishlist</button>
                                                </div>
                                            </div>

                                        </div>

                                        {/* derecha */}
                                        <div className="md:flex-1 px-4">

                                            {/* titulo */}
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{producto.nombre}</h2>

                                            {/* descripcion */}
                                            <p className="text-gray-600 text-sm mb-4">
                                                {producto.descripcion}
                                            </p>

                                            <div className="flex mb-4">
                                                {/* precio */}
                                                <div className="mr-4">
                                                    <span className="font-bold text-gray-700">Precio: </span>
                                                    <span className="text-gray-600">${producto.variaciones[0].precio}</span>
                                                </div>
                                                {/* <div>
                                                    <span className="font-bold text-gray-700">Availability:</span>
                                                    <span className="text-gray-600">In Stock</span>
                                                </div> */}
                                            </div>

                                            <div className="mb-4">
                                                <span className="font-bold text-gray-700">Select Color:</span>
                                                <div className="flex items-center mt-2">
                                                    <button className="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>
                                                    <button className="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
                                                    <button className="w-6 h-6 rounded-full bg-blue-500 mr-2"></button>
                                                    <button className="w-6 h-6 rounded-full bg-yellow-500 mr-2"></button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <span className="font-bold text-gray-700">Select Size:</span>
                                                <div className="flex items-center mt-2">
                                                    <button className="bg-gray-300 text-gray-700py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">S</button>
                                                    <button className="bg-gray-300 text-gray-700py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">M</button>
                                                    <button className="bg-gray-300 text-gray-700py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">L</button>
                                                    <button className="bg-gray-300 text-gray-700py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XL</button>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700">Product Description:</span>
                                                <p className="text-gray-600 text-sm mt-2">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                    sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                                    lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                                    ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                                    sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </>

                }

            </section>


            {/* FOOTER */}
            {productoCargado && producto != null && <Footer />}


        </main>
    );
};
