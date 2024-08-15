'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        title: "¿Cómo puedo comprar una T-Shirt?",
        desc: "Para comprar, por favor selecciona los productos que deseas comprar y agrégalos al carrito. Una vez que hayas terminado, ve al carrito y sigue los pasos para completar tu compra. También nos puedes encontrar a la venta en Collectif Concept Store o hacer tu pedido por Instagram (@wethepeople.wear).",
    },
    {
        title: "¿Cuánto tiempo tarda en llegar mi pedido?",
        desc: "El tiempo de entrega de tu pedido dependerá de la dirección de envío. Una vez que tu pedido haya sido confirmado, procederemos con la creación de la guía y te enviaremos la información de seguimiento de tu pedido.",
    },
    {
        title: "¿Cómo puedo rastrear mi pedido?",
        desc: "Una vez que tu pedido haya sido confirmado, crearemos tu guía y recibirás un correo con la información de seguimiento de tu pedido. Si no recibiste el correo, por favor contáctanos a nuestro correo (hola@wethepeoplewear.com.mx) o redes sociales (@wethepeople.wear).",
    },
    {
        title: "¿Cómo lavo mi T-Shirt?",
        desc: "Para una máxima duración y para garantizar el cuidado del diseño, sugerimos lavar la prenda al revés, nunca utilizar secadora ni detergentes fuertes. También es recomendable el lavado con agua fría.",
    },
    {
        title: "¿Puedo planchar mi T-Shirt?",
        desc: "Sí, pero ten mucho cuidado, ya que el calor podría hacer que se debilitara, cayera o desgastara la impresión. Para planchar tu camisa, sugerimos el planchado a temperatura baja-media, sin usar vapor y siempre con la camiseta del revés, a ser posible con un paño de barrera entre el diseño y la plancha.",
    },
];


export default function Contacto() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO */}
            <section className="mt-20">

                <div className="mx-auto px-4 py-8">

                    {/* redes sociales y forms */}
                    {/* https://readymadeui.com/tailwind-blocks/contact-form */}
                    <div className="grid sm:grid-cols-2 items-start gap-16 p-4 md:px-8 mx-auto max-w-4xl bg-white py-8">

                        {/* izquierda */}
                        <div>

                            <h1 className="text-gray-800 text-4xl font-extrabold">Conecta con Nosotros</h1>
                            <p className="text-base text-gray-500 mt-4">
                                Siguenos en nuestras redes sociales para estar al tanto de nuestras novedades y promociones.
                            </p>

                            {/* email */}
                            <div className="mt-10">
                                <h2 className="text-gray-800 text-base font-bold">Email</h2>
                                <ul className="mt-4">
                                    <li className="flex items-center">
                                        <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                                                viewBox="0 0 479.058 479.058">
                                                <path
                                                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                                                    data-original="#000000" />
                                            </svg>
                                        </div>
                                        <a href="mailto:hola@wethepeoplewear.com.mx" className="text-[#007bff] text-sm ml-4">
                                            <small className="block">Mail</small>
                                            <strong>hola@wethepeoplewear.com.mx</strong>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* redes sociales */}
                            <div className="mt-10">
                                <h2 className="text-gray-800 text-base font-bold">Redes sociales</h2>

                                <ul className="flex mt-4 space-x-4">

                                    {/* TikTok */}
                                    <a className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0" href="https://www.tiktok.com/@wethepeople.wear" target='blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#007bff">
                                            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                        </svg>
                                    </a>

                                    {/* Instagram */}
                                    <a className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0" href="https://www.instagram.com/wethepeople.wear/" target='blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.037-1.595c-.224-.573-.374-1.227-.419-2.185C3.012 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71s.195-1.61.419-2.185A4.392 4.392 0 0 1 4.51 4.51c.45-.458.994-.812 1.595-1.037.574-.224 1.226-.374 2.185-.419C9.25 3.012 9.555 3 12 3Z">
                                            </path>
                                        </svg>
                                    </a>
                                </ul>
                            </div>

                        </div>


                        {/* derecha */}
                        <form className="ml-auto space-y-4">

                            {/* nombre */}
                            <input type='text' placeholder='Name'
                                className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />

                            {/* correo */}
                            <input type='email' placeholder='Email'
                                className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />

                            {/* asunto */}
                            <input type='text' placeholder='Subject'
                                className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />

                            {/* mensaje */}
                            <textarea placeholder='Message' rows={6}
                                className="w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-blue-500 focus:bg-transparent"></textarea>

                            <button type='button' className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6">
                                Enviar
                            </button>

                        </form>

                    </div>

                    {/* Sección de FAQs */}
                    <section className="md:px-8 py-14" id="faqs">
                        <div className="container mx-auto">
                            <div className="mb-10 text-center ">
                                <p
                                    color="blue-gray"
                                    className="mb-4 text-4xl !leading-snug font-extrabold"
                                >
                                    FAQs
                                </p>
                                <p
                                    className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl"
                                >
                                    Encuentra respuestas a las preguntas más frecuentes de nuestros clientes.
                                </p>
                            </div>
                            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                                {faqs.map(({ title, desc }) => (
                                    <AccordionItem value={title} key={title}>
                                        <AccordionTrigger color="blue-gray" className="pb-6 md:text-[20px] text-[16px] text-left font-bold">{title}</AccordionTrigger>
                                        <AccordionContent className="border-t border-gray-200 py-8">
                                            <p className="font-normal text-base !text-gray-500">
                                                {desc}
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </section>

                    {/* Sección de Guía de Tallas */}
                    <section className="flex flex-col items-center justify-center py-14 md:px-8" id="tallas">
                        <div className="container mx-auto px-4 md:px-6 text-center">
                            <div className="mb-14 text-center ">
                                <p
                                    color="blue-gray"
                                    className="mb-4 text-4xl !leading-snug font-extrabold"
                                >
                                    Guía de Tallas
                                </p>
                                <p
                                    className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl"
                                >
                                    Conoce las medidas de nuestras prendas para que puedas elegir la talla correcta.
                                </p>
                            </div>
                            <div className="mt-8 md:mt-12">
                                <img
                                    src="/other/tallas.png"
                                    width={1200}
                                    height={600}
                                    alt="Hero Image"
                                    className="mx-auto w-full max-w-4xl rounded-lg object-center"
                                />
                            </div>
                        </div>
                    </section>

                </div>

            </section>

            {/* FOOTER */}
            <Footer />


        </main>
    );
}
