'use client'

import React, { use, useEffect, useState } from 'react';
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import { Producto, Variacion, productos } from '@/app/data/productos';
import Modal from '@/components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '@/lib/CartContext';
import { formatCurrency } from '@/lib/utils';
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
    colores: string[];
    tallas: string[];
    release_date: string;
    active: boolean;
    variations: ProductVariation[];
}


export default function SingleProductContent({ id }: { id: string }) {

    const { addToCart, hasViewedProduct, addProductView } = useCart();
    const [producto, setProducto] = useState<Product | null>(null);
    const [productoCargado, setProductoCargado] = useState<Boolean>(false);
    const [productName, setProductName] = useState<string>('');
    const [colorSeleccionado, setColorSeleccionado] = useState<string>('');
    const [tallaSeleccionada, setTallaSeleccionada] = useState<string>('');
    const [imagenSeleccionada, setImagenSeleccionada] = useState<string>('');
    const [precio, setPrecio] = useState<number>(0);
    const [currVariation, setCurrVariation] = useState<ProductVariation | null>(null);
    const [stockLeft, setStockLeft] = useState<number>(0);
    const [cantidad, setCantidad] = useState<number>(1);
    const [warning, setWarning] = useState<Boolean>(false);
    const [imageCart, setImageCart] = useState<string>('');
    const [idRetrieved, setIdRetrieved] = useState<Boolean>(false);

    const increment = () => setCantidad(cantidad + 1);
    const decrement = () => setCantidad(cantidad - 1);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const response = await fetch(`/api/products/${id}`, {
                    cache: 'no-store', // Ensure no caching
                });

                if (response.ok) {
                    const product: Product = await response.json();
                    console.log(product);
                    setProducto(product);
                    setProductName(product.name);
                    setProductoCargado(true);
                    setColorSeleccionado(product.colores[0]);
                    setPrecio(product.variations[0].precio);
                    setImagenSeleccionada(product.variations[0].fotos[0]); // Set the first image
                    setImageCart(product.variations[0].fotos[0]); // Set the first image for cart
                    setCurrVariation(product.variations[0]);
                    setStockLeft(product.variations[0].stock_qty);
                } else {
                    setProductoCargado(true);
                    setProducto(null);
                }
            }
        };

        fetchProduct();
        setIdRetrieved(true);
    }, [id]);

    useEffect(() => {
        if (id && idRetrieved) { // Verificar que el id esté disponible
            const logProductView = async () => {
                console.log('Sending log');
                const response = await fetch('/api/logProductView', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id: id }),
                });
            };

            if (!hasViewedProduct(id)) {
                console.log('Adding product view');
                addProductView(id);
                logProductView();
            } else {
                console.log('Already viewed');
            }
        }
    }, [idRetrieved]);

    const handleColorChange = (color: string) => {
        setColorSeleccionado(color);
        const variation = producto?.variations.find(variacion => variacion.color === color);
        if (variation) {
            setPrecio(variation.precio);
            setImagenSeleccionada(variation.fotos[0]);
            setImageCart(variation.fotos[0]);
            setCurrVariation(variation);
            setCantidad(variation.stock_qty > 0 ? 1 : 0);
            setStockLeft(0);
            setTallaSeleccionada('');
        }
    };

    const handleTallaChange = (talla: string) => {
        const variation = producto?.variations.find(variacion => variacion.talla === talla && variacion.color === colorSeleccionado);
        if (variation && variation.stock_qty > 0) {
            setTallaSeleccionada(talla);
            setPrecio(variation.precio);
            setCurrVariation(variation);
            setStockLeft(variation.stock_qty);
            setCantidad(variation.stock_qty > 0 ? 1 : 0);
        }
    };

    const handleImageChange = (image: string) => {
        setImagenSeleccionada(image);
    };

    const handleAddToCart = () => {
        if (!colorSeleccionado || !tallaSeleccionada) {
            setWarning(true);
            return;
        }

        addToCart({
            productId: id,
            nombre: productName,
            cantidad: cantidad,
            foto: imageCart,
            variacion: {
                color: colorSeleccionado,
                talla: tallaSeleccionada,
                precio: precio,
                variation_id: currVariation?.variation_id ?? '',
            }
        });

        try {
            fetch('/api/logAddToCart', {
                method: 'POST',
                body: JSON.stringify({
                    product_id: id,
                    size: tallaSeleccionada,
                    color: colorSeleccionado,
                    quantity: cantidad,
                    variation_id: currVariation?.variation_id,
                }),
            });
        } catch (error) {
            console.error('Error logging add to cart:', error);
        }

        toast.success('Producto agregado exitosamente', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

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

                    producto == null || !producto.active ?

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

                            {/* Regresar al catalogo */}
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <Link href="/catalogo" className="text-gray-500 hover:text-black flex items-center text-lg hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-7 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                    </svg>
                                    Volver al catálogo
                                </Link>
                            </div>

                            {/* https://tailwindflex.com/@jaxstone/product-page-2 */}
                            <div className="py-8">
                                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex flex-col md:flex-row -mx-4">

                                        {/* izquierda */}
                                        <div className="md:flex-1 px-4">

                                            {/* foto principal */}
                                            <div className="md:h-[460px] rounded-lg bg-gray-300 mb-4">
                                                <img className="w-full h-full md:object-cover object-contain" src={imagenSeleccionada} alt="Imagen del Producto" />
                                            </div>

                                            {/* miniaturas */}
                                            <div className="grid grid-cols-4 gap-2 mb-4">
                                                {currVariation?.fotos.map((foto, index) => (
                                                    <img
                                                        key={index}
                                                        className={`cursor-pointer w-full h-24 object-cover rounded-lg border-2 ${imagenSeleccionada === foto ? 'border-black' : 'border-transparent'}`}
                                                        src={foto}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        onClick={() => handleImageChange(foto)}
                                                    />
                                                ))}
                                            </div>

                                        </div>

                                        {/* derecha */}
                                        <div className="md:flex-1 px-4">

                                            {/* título */}
                                            <h2 className="text-4xl font-bold text-gray-800 mb-2 mt-4 md:mt-0">{producto.name}</h2>

                                            {/* descripción */}
                                            <p className="text-gray-600 text-lg mb-4">
                                                {producto.description}
                                            </p>

                                            <hr className='my-4' />

                                            {/* precio */}
                                            <div className="flex mb-4">
                                                <div className="mr-4 text-lg">
                                                    <span className="font-bold text-gray-700">Precio: </span>
                                                    <span className="text-gray-600">{formatCurrency(currVariation?.precio ?? 0)} MXN</span>
                                                </div>
                                            </div>

                                            {/* selección de color */}
                                            <div className="mb-4 text-lg">
                                                <span className="font-bold text-gray-700">Selecciona Color:</span>
                                                <div className="flex items-center mt-2">
                                                    {producto.colores.map((color, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleColorChange(color)}
                                                            className={`w-10 h-10 rounded-full mr-2 ${colorSeleccionado === color ? 'border-4 border-blue-500' : 'border border-gray-300'}`}
                                                            style={{ backgroundColor: color.toLowerCase() === 'negro' ? 'black' : color.toLowerCase() === 'gris' ? 'gray' : color.toLowerCase() === 'blanco' ? 'white' : '' }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* selección de talla */}
                                            <div className="mb-4 text-lg">
                                                <span className="font-bold text-gray-700">Selecciona Talla:</span>
                                                <div className="flex flex-wrap mt-2">
                                                    {producto.tallas.map((talla, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleTallaChange(talla)}
                                                            disabled={producto.variations.find(variacion => variacion.talla === talla && variacion.color === colorSeleccionado)?.stock_qty === 0}
                                                            className={`w-16 h-16 border rounded-md flex items-center justify-center mr-4 my-1 text-gray-800 
                                                                ${tallaSeleccionada === talla ? 'bg-gray-200 border-4 border-blue-500' : ''} 
                                                                ${producto.variations.find(variacion => variacion.talla === talla && variacion.color === colorSeleccionado)?.stock_qty === 0 ? 'bg-red-200 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}`}
                                                        >
                                                            {talla}
                                                        </button>
                                                    ))
                                                    }
                                                </div>
                                            </div>

                                            {/* Cantidad */}
                                            <div className="mb-4 text-lg">
                                                <p className="font-bold text-gray-700">Cantidad:</p>
                                                <div className="relative flex items-center py-2">

                                                    {/* decrement */}
                                                    <button type="button" id="decrement-button" onClick={decrement} disabled={cantidad <= 1} data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-10 w-10 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                        <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                        </svg>
                                                    </button>

                                                    {/* number */}
                                                    <input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-lg mx-2 font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={cantidad} required />

                                                    {/* increment */}
                                                    <button type="button" id="increment-button" onClick={increment} disabled={cantidad >= stockLeft} data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-10 w-10 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                        <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {warning && <p className='text-lg text-red-600 italic'>Porfavor selecciona un color y una talla</p>}

                                            {/* <p>Quedan {stockLeft}</p> */}

                                            {/* botones */}
                                            <div className="lg:flex lg:-mx-2 my-8 text-center text-lg">
                                                <div className="lg:w-1/2 px-2">
                                                    <button onClick={handleAddToCart} className="w-full bg-gray-900 text-white py-4 px-4 rounded-lg font-bold hover:bg-gray-600">
                                                        Añadir al carrito
                                                    </button>
                                                </div>
                                                <div className="lg:w-1/2 px-2">
                                                    <button
                                                        type="button"
                                                        className="w-full lg:mt-0 mt-3 bg-gray-200 text-gray-800 py-4 px-4 rounded-lg font-bold hover:bg-gray-300"
                                                        onClick={openModal}
                                                    >
                                                        Guía de tallas
                                                    </button>
                                                    <Modal
                                                        isOpen={isModalOpen}
                                                        onClose={closeModal}
                                                        title={"Guía de tallas"}
                                                        imageSrc={"/other/tallas.png"}
                                                    />
                                                </div>
                                                <ToastContainer />
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
