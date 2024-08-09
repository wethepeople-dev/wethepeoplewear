'use client'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            <div className="mt-20 flex flex-col bg-white" style={{ height: '60vh' }}>

                <div className="flex flex-1 items-center justify-center">
                    <div className="mx-auto max-w-xl px-4 text-center">
                        <h1 className="md:text-9xl text-7xl font-extrabold text-gray-500 opacity-50">404</h1>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Lo sentimos
                        </h1>

                        <p className="mt-4 text-gray-500">
                            La página que buscas no existe o fue eliminada.
                        </p>

                        <a
                            href="/"
                            className="mt-6 inline-block rounded bg-azulito-100 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                        >
                            Volver al inicio
                        </a>
                    </div>
                </div>
            </div>


            {/* FOOTER */}
            <div className="absolute bottom-0 w-screen hidden md:block">
                <Footer />
            </div>

        </main>
    );
}