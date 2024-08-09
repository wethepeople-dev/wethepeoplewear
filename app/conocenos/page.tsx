'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Conocenos() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* <div className="mx-auto flex flex-col items-center bg-gray-100 py-8 pt-12 md:h-1/3">
                <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-azulito-100 uppercase text-center">
                        bienvenido a <br />
                        we the people wear
                    </h1>
                </div>
            </div> */}


            <div className="mt-16">

                {/* ANIMACION */}
                {/* https://codepen.io/cassandraPaige/pen/jOEMMyp */}
                <div className='containerr projects flex flex-col justify-between'>
                    <div className="overlay"></div>
                    <div></div>
                    <img src="/logos/LOGO_BLANCO.png" alt="" className=" w-72 titulo-animation" />
                    <h1 className="z-30 text-4xl text-white flecha-animation mb-10">↓</h1>
                </div>

                {/* <div className="relative isolate overflow-hidden bg-white px-6 pt-24 sm:pt-32 pb-20 lg:overflow-visible lg:px-0">

                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                            <defs>
                                <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                                </pattern>
                            </defs>
                            <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                                <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
                            </svg>
                            <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                        </svg>
                    </div>

                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">

                        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                            <div className="lg:pr-4">
                                <div className="lg:max-w-lg">
                                    <p className="text-base font-semibold leading-7 text-azulito-100">We The People Wear</p>
                                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestra historia...</h1>
                                    <p className="mt-6 text-xl leading-8 text-gray-700">
                                        ¡Hola! Mi nombre es <span className="bg-amarillito-100 px-1">Gaby</span> y soy la fundadora de We The People Wear, una marca que nace a partir de mis dos pasiones, la moda y el diseño gráfico. La idea nace en el 2018, tras darme cuenta de la poca oferta de Graphic T-Shirts positivas, inspiradoras y modernas en el mercado. Con esto en mente, empieza mi aventura de emprendimiento, ¡acompáñame!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block -ml-12 -mt-12 lg:p-12 p-10 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                            <img className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src="/nosotros2.png" alt=""></img>
                        </div>

                        <div className="block lg:hidden -ml-12 -mt-10 lg:p-12 p-10 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                            <img className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src="/nosotros3.png" alt=""></img>
                        </div>
                    </div>
                </div> */}

                {/* NUESTRA HISTORIA */}
                <div className="mb-0">
                    <div className="mx-auto flex flex-col md:flex-row justify-center items-center md:py-0 mt-12 md:mt-0">

                        <div className="flex flex-col justify-center items-center px-7 md:w-2/3">
                            <h1 className="text-3xl md:text-5xl font-black text-black text-center mb-4">
                                Un poco de nuestra historia...
                            </h1>
                            <p className="text-xl lg:text-2xl text-center px-2 md:px-5 lg:px-10">
                                ¡Hola! Mi nombre es Gaby y soy la fundadora de We The People Wear, una marca que nace a partir de mis dos pasiones, la moda y el diseño gráfico. La idea nace en el 2018, tras darme cuenta de la poca oferta de Graphic T-Shirts positivas, inspiradoras y modernas en el mercado. Con esto en mente, empieza mi aventura de emprendimiento, ¡acompáñame!                            </p>
                        </div>

                        <div className="w-full md:w-1/3 bg-slate-200 h-full relative hidden md:block" style={{ height: '55vh' }}>
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/nosotros.png)' }}></div>
                        </div>

                        <div className="w-full md:hidden mt-12">
                            <img src="/nosotros.png" alt="rollos de camisas" className="w-full h-auto" />
                        </div>
                    </div>
                </div>

            </div>


            {/* PROCESO */}
            <section className="w-full py-12 bg-azulito-100 md:mt-0" >
                <div className="">

                    <div className="mb-8 text-center">
                        <h2 className="font-bold tracking-tighter text-4xl md:text-5xl text-white">Nuestro Proceso</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4">

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
                                <h3 className="text-2xl lg:text-3xl md:text-2xl sm:text-2xl font-bold text-white uppercase">Concepto</h3>
                                <p className="text-lg text-white">
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
                                <h3 className="text-2xl lg:text-3xl md:text-2xl sm:text-2xl font-bold text-white uppercase">Diseño</h3>
                                <p className="text-lg text-white">
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
                                <h3 className="text-2xl lg:text-3xl md:text-2xl sm:text-2xl font-bold text-white uppercase">Print</h3>
                                <p className="text-lg text-white">
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
                                <h3 className="text-2xl lg:text-3xl md:text-2xl sm:text-2xl font-bold text-white uppercase">Cool Tees</h3>
                                <p className="text-lg text-white">
                                    ¿El resultado? Graphic T-Shirts con diseños únicos, modernos y positivos, perfectas para elevar tu estilo diario.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section >

            {/* CLUB OF DREAMERS */}
            <div className="mb-0">
                <div className="mx-auto flex flex-col md:flex-row justify-center items-center md:h-2/3 md:py-0 mt-12 md:mt-0">
                    <div className="w-full md:w-1/3 bg-slate-200 h-full relative hidden md:block" style={{ height: '55vh' }}>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/rollos.png)' }}></div>
                    </div>

                    <div className="flex flex-col justify-center items-center px-7 md:w-2/3">
                        <h1 className="text-3xl md:text-5xl font-black text-black text-center mb-4">
                            The Club Of Dreamers
                        </h1>
                        <p className="text-xl lg:text-2xl text-center px-2 md:px-5 lg:px-10">
                            En We The People Wear creemos en la importancia de perseguir tus sueños. Al diseñar Graphic T-Shirts positivas, motivacionales y modernas, buscamos inspirar a los jóvenes no solo a perseguir sus sueños, sino que también a alcanzar su mejor versión, todo mientras lucen el mejor estilo. Únete a nosotros en esta aventura para empoderar a la juventud.
                        </p>
                    </div>

                    <div className="w-full md:hidden my-12">
                        <img src="/rollos.png" alt="rollos de camisas" className="w-full h-auto" />
                    </div>
                </div>
            </div>

            {/* <section className="w-full py-24">
                <div className="container flex flex-col items-center justify-center space-y-8 px-4 md:px-6">
                    <div className="space-y-4 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            The Club Of Dreamers
                        </h1>
                        <p className="max-w-5xl text-muted-foreground md:text-xl">
                            En We The People Wear creemos en la importancia de perseguir tus sueños. Al diseñar Graphic T-Shirts positivas, motivacionales y modernas, buscamos inspirar a los jóvenes no solo a perseguir sus sueños, sino que también a alcanzar su mejor versión, todo mientras lucen el mejor estilo. Únete a nosotros en esta aventura para empoderar a la juventud.
                        </p>
                    </div>
                    <img
                        src="/rollos.png"
                        width={1200}
                        height={600}
                        alt="Hero"
                        className="mx-auto aspect-[2/1] overflow-hidden rounded-xl object-cover"
                    />
                </div>
            </section> */}


            {/* FOOTER */}
            <Footer />

        </main >
    );
}
