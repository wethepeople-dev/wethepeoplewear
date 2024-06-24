'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Conocenos() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* FOTO y TEXTO */}
            <div style={{ height: '92vh' }} className="mt-16 h-full">

                {/* top */}
                <div className="mx-auto flex flex-col items-center bg-gray-100 py-8 pt-12 md:h-1/3">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-azulito-100 uppercase text-center">
                            bienvenido a <br />
                            we the people wear
                        </h1>
                    </div>
                </div>

                {/* bottom */}
                <div className="mx-auto flex justify-center items-center flex-col md:flex-row md:h-2/3 md:py-0 py-14">

                    {/* Left Side */}
                    <div className="flex flex-col justify-center items-center px-7 md:w-2/3">
                        <h1 className="text-3xl md:text-5xl font-black text-black text-center mb-4">
                            Un poco de nuestra historia...
                        </h1>
                        <p className="text-xl lg:text-2xl text-center px-2 md:px-5 lg:px-10">
                            ¡Hola! Mi nombre es Gaby y soy la fundadora de We The People Wear, una marca que nace a partir de mis dos pasiones, la moda y el diseño gráfico. La idea nace en el 2018, tras darme cuenta de la poca oferta de Graphic T-Shirts positivas, inspiradoras y modernas en el mercado. Con esto en mente, empieza mi aventura de emprendimiento, ¡acompáñame!
                        </p>

                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-1/3 bg-slate-200 h-full relative hidden md:block">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/nosotros.png)' }}></div>
                    </div>

                </div>

                <div>
                    <img src="/nosotros_small.png" alt="gaby en el market" className="block md:hidden" />
                </div>

            </div>


            {/* PROCESO */}
            <section className="w-full py-12 bg-azulito-100 mt-32 md:mt-0" >
                <div className="">

                    <div className="mb-8 text-center">
                        <h2 className="font-bold tracking-tighter text-5xl text-white">Nuestro Proceso</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4">

                        {/* concepto */}
                        <div className="relative group overflow-hidden hover:cursor-pointer bg-gray-700 hover:bg-azulito-100 duration-300">
                            <img
                                src="/concepto.png"
                                width={600}
                                height={600}
                                alt="Sketch de camisa"
                                className="h-full w-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 p-4 text-center transition-all duration-300">
                                <h3 className="text-2xl lg:text-3xl md:text-xl sm:text-2xl font-bold text-white uppercase">Concepto</h3>
                                <p className="text-md md:text-sm lg:text-lg text-white">
                                    A papel y lápiz, conceptualizamos nuestras T-Shirts desde cero.
                                </p>
                            </div>
                        </div>

                        {/* diseño */}
                        <div className="relative group overflow-hidden hover:cursor-pointer bg-gray-700 hover:bg-azulito-100 duration-300">
                            <img
                                src="/diseno.png"
                                width={600}
                                height={600}
                                alt="Diseño digital de camisa"
                                className="h-full w-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 p-4 text-center transition-all duration-300">
                                <h3 className="text-xl lg:text-3xl md:text-xl sm:text-2xl font-bold text-white uppercase">Diseño</h3>
                                <p className="text-md md:text-sm lg:text-lg text-white">
                                    Convertimos en realidad nuestros diseños de manera digital.
                                </p>
                            </div>
                        </div>

                        {/* print */}
                        <div className="relative group overflow-hidden hover:cursor-pointer bg-gray-700 hover:bg-azulito-100 duration-300">
                            <img
                                src="/print.png"
                                width={600}
                                height={600}
                                alt="diseños impresos de camisas"
                                className="h-full w-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 p-4 text-center transition-all duration-300">
                                <h3 className="text-xl lg:text-3xl md:text-xl sm:text-2xl font-bold text-white uppercase">Print</h3>
                                <p className="text-md md:text-sm lg:text-lg text-white">
                                    Imprimimos nuestros diseños con la técnica de sublimado, para que tengan mayor duración.
                                </p>
                            </div>
                        </div>

                        {/* cool tees */}
                        <div className="relative group overflow-hidden hover:cursor-pointer bg-gray-700 hover:bg-azulito-100 duration-300">
                            <img
                                src="/cooltees.png"
                                width={600}
                                height={600}
                                alt="Camisas en un perchero"
                                className="h-full w-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 p-4 text-center transition-all duration-300">
                                <h3 className="text-xl lg:text-3xl md:text-xl sm:text-2xl font-bold text-white uppercase">Cool Tees</h3>
                                <p className="text-md md:text-sm lg:text-lg text-white">
                                    ¿El resultado? Graphic T-Shirts con diseños únicos, modernos y positivos, perfectas para elevar tu estilo diario.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section >

            {/* FOTO y TEXTO */}
            <div className="mb-0">
                {/* bottom */}
                <div className="mx-auto flex flex-col md:flex-row justify-center items-center md:h-2/3 md:py-0 mt-12 md:mt-0">
                    {/* Left Side */}
                    <div className="w-full md:w-1/3 bg-slate-200 h-full relative hidden md:block" style={{ height: '55vh' }}>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/rollos.png)' }}></div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col justify-center items-center px-7 md:w-2/3">
                        <h1 className="text-3xl md:text-5xl font-black text-black text-center mb-4">
                            The Club Of Dreamers
                        </h1>
                        <p className="text-xl lg:text-2xl text-center px-2 md:px-5 lg:px-10">
                            En We The People Wear creemos en la importancia de perseguir tus sueños. Al diseñar Graphic T-Shirts positivas, motivacionales y modernas, buscamos inspirar a los jóvenes no solo a perseguir sus sueños, sino que también a alcanzar su mejor versión, todo mientras lucen el mejor estilo. Únete a nosotros en esta aventura para empoderar a la juventud.
                        </p>
                    </div>

                    {/* Hidden Image for Small Screens */}
                    <div className="w-full md:hidden my-12">
                        <img src="/rollos.png" alt="rollos de camisas" className="w-full h-auto" />
                    </div>
                </div>
            </div>


            {/* FOOTER */}
            <Footer />

        </main >
    );
}
