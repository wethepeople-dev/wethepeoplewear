
import React from 'react';
import Link from 'next/link';

export default function Footer() {

    return (
        <footer className="bg-gray-400">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex justify-between items-center">

                    {/* logo */}
                    <div className="mb-6 md:mb-0 md:pl-8">
                        <a className="flex items-center">
                            <img src="/logos/LOGO_BLANCO.png" className="h-16" alt="Logo" />
                            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span> */}
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-8 justify-between sm:grid-cols-3">

                        {/* columna 1 */}
                        <div className="mx-2">
                            <h2 className="mb-4 text-sm font-bold text-white uppercase">Shop</h2>
                            <ul className="text-gray-100 font-medium">
                                <li className="mb-2">
                                    <Link href="/#bestsellers" className="hover:underline ">Bestsellers</Link>
                                </li>
                                <li>
                                    <Link href="/catalogo" className="hover:underline">Shop all</Link>
                                </li>
                            </ul>
                        </div>

                        {/* columna 2 */}
                        <div className="mx-2">
                            <h2 className="mb-4 text-sm font-bold text-white uppercase">Nosotros</h2>
                            <ul className="text-gray-100 font-medium">
                                <li className="mb-2">
                                    <Link href="/conocenos" className="hover:underline">Nuestra historia</Link>
                                </li>
                                <li>
                                    <Link href="/contacto" className="hover:underline">Puntos de venta</Link>
                                </li>
                            </ul>
                        </div>

                        {/* columna 3 */}
                        <div className="mx-2">
                            <h2 className="mb-4 text-sm font-bold text-white uppercase">Información</h2>
                            <ul className="text-gray-100 font-medium">
                                <li className="mb-2">
                                    <Link href="/contacto#faqs" className="hover:underline">FAQs</Link>
                                </li>
                                <li>
                                    <Link href="/contacto#tallas" className="hover:underline">Guía de tallas</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-100 sm:text-center">© 2024 We The People Wear. All Rights Reserved.</span>

                    <div className="flex mt-4 sm:justify-center sm:mt-0">

                        {/* Instagram */}
                        <a href="https://www.instagram.com/wethepeople.wear/" target='blank' className="text-gray-500 hover:text-white border rounded-full bg-gray-300 focus:ring-2 focus:ring-slate-100 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                            </svg>
                            <span className="sr-only">Instagram</span>
                        </a>

                        {/* TikTok */}
                        <a href="https://www.tiktok.com/@wethepeople.wear" target='blank' className="text-gray-500 hover:text-white border rounded-full bg-gray-300 focus:ring-2 focus:ring-slate-100 p-2 ms-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
                                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                            </svg>
                            <span className="sr-only">TikTok</span>
                        </a>

                        {/* email */}
                        <a href="mailto:wethepeople.wear.mx@gmail.com" className="text-gray-500 hover:text-white border rounded-full bg-gray-300 focus:ring-2 focus:ring-slate-100 p-2 ms-3">
                            <svg width="17" height="17" fill="currentColor" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                            <span className="sr-only">email page</span>
                        </a>

                        {/* twitter */}
                        {/* <a href="#" className="text-gray-500 hover:text-white border rounded-full bg-gray-300 focus:ring-2 focus:ring-slate-100 p-2 ms-3">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd" />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </a> */}

                        {/* github */}
                        {/* <a href="#" className="text-gray-500 hover:text-white border rounded-full bg-gray-300 focus:ring-2 focus:ring-slate-100 p-2 ms-3">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a> */}

                    </div>
                </div>
            </div>
        </footer>
    );
}