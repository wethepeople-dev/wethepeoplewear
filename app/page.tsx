'use client'

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="flex min-h-screen flex-col w-screen">

      <nav className="bg-gray-100 shadow shadow-gray-300 w-100 px-8 md:px-auto py-2">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

          <div className="text-azulito-100 md:order-1">
            <Image
              src="/logos/LOGO_NEGRO.png"
              width={74}
              height={40}
              className="h-8"
              alt="Flowbite Logo"
            />
          </div>

          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              <li className="md:px-4 md:py-2 text-azulito-100"><a href="#">Conócenos</a></li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Catálogo</a></li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="order-2 md:order-3">
            <button className="px-4 py-2 bg-azulito-100 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {/* <span>Login</span> */}
            </button>
          </div>

        </div>
      </nav>

      {/* HERO */}
      {/* <div className="w-full px-6 mb-5">
        <div className="mt-8 relative rounded-lg bg-azulito-100 container mx-auto flex flex-col items-center pt-12 sm:pt-24  pb-24 sm:pb-32 md:pb-48 lg:pb-56 xl:pb-64">
          <img className="mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg" alt="bg" />
          <img className="ml-2 lg:ml-12 mb-2 lg:mb-12 absolute bottom-0 left-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg" alt="bg" />

          <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-white font-bold leading-tight">
              WELCOME TO YOUR LOCAL T-SHIRT SHOP
            </h1>
            <p className="text-md sm:text-md md:text-base lg:text-lg xl:text-xl text-center text-white mt-2">
              En We The People te ayudamos a encontrar la T-Shirt perfecta para conquistar tu día.
            </p>
          </div>
          <div className="flex justify-center items-center mb-10 sm:mb-20">
            <button className="hover:text-black hover:bg-transparent lg:text-xl hover:border hover:border-amarillo-100 bg-amarillo-100 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-azulito-100	focus:ring-amarillo-100 rounded text-black px-4 sm:px-8 py-1 sm:py-3 text-lg">
              Ver Catálogo
            </button>
          </div>
        </div>
        <div className="container mx-auto flex justify-center md:-mt-64 -mt-20 sm:-mt-40">
          <div className="relative sm:w-2/3 w-11/12">
            <img src="/camisas2.png" alt="Sample Page" role="img" className="rounded-2xl" />
          </div>
        </div>
      </div> */}


      {/* HERO */}
      <section>
        <div className="gap-8 items-center py-8 px-8 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-8">
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="mb-4 text-5xl text-azulito-100 tracking-tight font-extrabold">
              WELCOME TO YOUR LOCAL T-SHIRT SHOP
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">
              En We The People te ayudamos a encontrar la T-Shirt perfecta para conquistar tu día.</p>
            <a href="#" className="inline-flex items-center text-black bg-amarillo-100 hover:bg-transparent focus:ring-4 border border-white focus:ring-amarillo-100 hover:border hover:border-amarillo-100 text-lg rounded-lg px-5 py-2.5 text-center">
              Ver Catálogo
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
          </div>
          <img className="w-full rounded-xl mt-5 md:mt-0" src="/camisas2.png" alt="dashboard image"></img>
        </div>
      </section>


      {/* Sección 3 columnas */}
      <section className="bg-azulito-100 text-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 text-center">

            {/* Autenticidad */}
            <div>
              <div className="flex justify-center items-center mb-6 w-10 h-5 rounded-full bg-primary-100 mx-auto">
                <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">AUTENTICIDAD</h3>
              <p className="text-gray-200">
                Diseñamos nuestras camisetas desde cero, por lo que sus diseños con únicos.
              </p>
            </div>

            <hr className="md:hidden" />

            {/* Comodidad */}
            <div>
              <div className="flex justify-center items-center mb-6 w-10 h-5 rounded-full bg-primary-100 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">COMODIDAD</h3>
              <p className="text-gray-200">
                Nuestras camisetas 100% algodón son respirables, por lo que estarás cómodo todo el día.
              </p>
            </div>

            <hr className="md:hidden" />

            {/* Simpleza */}
            <div>
              <div className="flex justify-center items-center mb-6 w-10 h-5 rounded-full bg-primary-100 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">SIMPLEZA</h3>
              <p className="text-gray-200">
                ¿Nunca sabes que ponerte? Una T-Shirt, un par de jeans, y ¡estás listo para conquistar el día!
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Seccion texto y fotos */}
      <div className="mx-auto container flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0">
        <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">

          {/* Texto IZQ */}
          <div className="w-80 sm:w-auto flex flex-col justify-start items-start">
            <div>
              <p className="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800">Renovate your home</p>
            </div>
            <div className="mt-4 lg:w-4/5 xl:w-3/5">
              <p className="text-base leading-6 text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </div>
            <div className="mt-16 w-full">
              <button className="px-4 bg-gray-900 flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-gray-700 focus:ring-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                <p className="text-xl font-medium leading-5 ">See More</p>
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/cta-III-svg1.svg" alt="arrow"></img>
              </button>
            </div>
          </div>

          {/* Fotos DER */}
          <div className="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
            <div className="">
              <img className="hidden lg:block" src="https://i.ibb.co/61TfVVW/olena-sergienko-gx-KL334b-UK4-unsplash-1.png" alt="sofa" />
              <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/QvxmJjB/olena-sergienko-gx-KL334b-UK4-unsplash-1-1.png" alt="sofa" />
            </div>
            <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-0 sm:space-y-5 lg:space-y-5 xl:space-y-8">
              <div>
                <img className="hidden lg:block" src="https://i.ibb.co/1MY5P3y/nirzar-pangarkar-Csw-Kf-D546-Z8-unsplash-1.png" alt="chairs" />
                <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/r0rvcCh/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1-1.png" alt="chairs" />
              </div>
              <div>
                <img className="hidden lg:block" src="https://i.ibb.co/9N7ZX2C/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1.png" alt="chairs" />
                <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/0BFt400/nirzar-pangarkar-Csw-Kf-D546-Z8-unsplash-2.png" alt="chairs" />
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* Seccion Mas vendidos */}
      <div className="2xl:container 2xl:mx-auto">
        <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">

          {/* Titulo */}
          <div>
            <h1
              className="text-3xl lg:text-4xl font-semibold text-gray-800 text-center"
            >
              Más Vendidos
            </h1>
          </div>

          {/* Productos */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8 md:mt-10"
          >
            <div className="bg-gray-50">
              <div className="">
                <h2 className="text-xl text-gray-600">
                  Lounge Chair
                </h2>
                <p
                  className="text-xl font-semibold text-gray-800 mt-2"
                >
                  $1200
                </p>
              </div>
              <div className="flex justify-center items-center mt-8 md:mt-24">
                <img
                  className=""
                  src="https://i.ibb.co/8403ZFZ/pexels-hormel-2762247-removebg-preview-2-1.png"
                  alt="A chair with designed back"
                  role="img"
                />
              </div>
              <div className="flex justify-end items-center space-x-2 mt-16 md:mt-32">
                <button
                  aria-label="show in red color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-red-600 border rounded-full border-gray-500"
                  ></div>
                </button>
                <button
                  aria-label="show in white color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-white border rounded-full border-gray-500"
                  ></div>
                </button>
                <button
                  aria-label="show in black color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-gray-900 border rounded-full border-gray-500"
                  ></div>
                </button>
              </div>
            </div>
            <div className="bg-gray-50">
              <div className="">
                <h2 className="text-xl text-gray-600 ">
                  Lounge Chair
                </h2>
                <p
                  className="text-xl font-semibold text-gray-800 mt-2"
                >
                  $1200
                </p>
              </div>
              <div className="flex justify-center items-center mt-8 md:mt-24">
                <img
                  className=""
                  src="https://i.ibb.co/WBdnRqb/eugene-chystiakov-3ne-Swyntb-Q8-unsplash-1-removebg-preview-2-1.png"
                  alt="A chair with wooden legs"
                  role="img"
                />
              </div>
              <div className="flex justify-end items-center space-x-2 mt-8 md:mt-32">
                <button
                  aria-label="show in white color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-white border rounded-full border-gray-500"
                  ></div>
                </button>
                <button
                  aria-label="show in black color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-gray-900 border rounded-full border-gray-500"
                  ></div>
                </button>
              </div>
            </div>
            <div className="bg-gray-50">
              <div>
                <h2 className="text-xl text-gray-600 ">
                  Lounge Chair
                </h2>
                <p
                  className="text-xl font-semibold text-gray-800 mt-2"
                >
                  $1200
                </p>
              </div>
              <div className="flex justify-center items-center mt-8 md:mt-24">
                <img
                  src="https://i.ibb.co/R2fbCvj/kari-shea-It-Mgg-D0-Egu-Y-unsplash-removebg-preview-2-1.png"
                  alt="A sofa chair with wooden legs"
                  role="img"
                />
              </div>
              <div className="flex justify-end items-center space-x-2 mt-16 md:mt-32">
                <button
                  aria-label="show in green color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-green-700 border rounded-full border-gray-500"
                  ></div>
                </button>
                <button
                  aria-label="show in brown color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-yellow-800 border rounded-full border-gray-500"
                  ></div>
                </button>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 lg:gap-8 mt-4 md:mt-6 lg:mt-8"
          >
            <div className="bg-gray-50">
              <div>
                <h2 className="text-xl leading-tight text-gray-600 ">
                  Sectional Sofa
                </h2>
                <p
                  className="text-xl font-semibold text-gray-800 mt-2"
                >
                  $78900
                </p>
              </div>
              <div className="flex justify-center items-center mt-28 md:mt-3">
                <img
                  src="https://i.ibb.co/CPdBFwZ/pexels-pixabay-276583-removebg-preview-1-1.png"
                  alt="A large sectional sofa"
                  role="img"
                />
              </div>
              <div className="flex justify-end items-center space-x-2 mt-36 md:mt-12">
                <button
                  aria-label="show in yellow color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-yellow-500 border rounded-full border-gray-500"
                  ></div>
                </button>
                <button
                  aria-label="show in light gray color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-gray-400 border rounded-full border-gray-500"
                  ></div>
                </button>
              </div>
            </div>
            <div className="bg-gray-50">
              <div>
                <h2 className="text-xl leading-tight text-gray-600 ">
                  Two Seater Sofa
                </h2>
                <p
                  className="text-xl font-semibold text-gray-800 mt-2"
                >
                  $2900
                </p>
              </div>
              <div className="flex justify-center items-center mt-28 md:mt-1">
                <img
                  src="https://i.ibb.co/238nZzf/pexels-andrea-piacquadio-3757055-removebg-preview-1-1.png"
                  alt="A beautiful two seater sofa"
                  role="img"
                />
              </div>
              <div className="flex justify-end items-center space-x-2 mt-36 md:mt-12">
                <button
                  aria-label="show in black color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-gray-900 border rounded-full border-gray-500"
                  ></div>
                </button>
                <button
                  aria-label="show in green color"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                >
                  <div
                    className="w-2.5 h-2.5 bg-green-700 border rounded-full border-gray-500"
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* FOOTER */}
      <div className="py-16 xl:px-20 lg:px-12 sm:px-6 px-4 bg-gray-100 w-screen mx-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4">
          <div className="flex flex-col flex-shrink-0">
            <div>
              <Image src="/logos/LOGO_NEGRO.png" height={30} width={90} alt="icon"></Image>
            </div>
            <p className="text-sm leading-none text-gray-800 mt-4 ">Copyright © 2024 We The People Wear</p>
            <p className="text-sm leading-none text-gray-800 mt-4 ">All rights reserved</p>
            <div className="flex items-center gap-x-4 mt-12">
              <button aria-label="instagram" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.00081 0.233398C6.68327 0.233398 6.39243 0.243215 5.48219 0.283343C4.57374 0.323644 3.95364 0.462973 3.41106 0.667403C2.84981 0.87855 2.37372 1.161 1.8994 1.62066C1.42473 2.08016 1.13317 2.54137 0.914502 3.08491C0.702944 3.61071 0.558942 4.2116 0.518053 5.09132C0.477342 5.97311 0.466675 6.25504 0.466675 8.50015C0.466675 10.7453 0.476986 11.0262 0.518231 11.9079C0.560009 12.788 0.703833 13.3887 0.914679 13.9144C1.13282 14.4581 1.42437 14.9193 1.89887 15.3788C2.37301 15.8386 2.8491 16.1218 3.40999 16.3329C3.95293 16.5373 4.57321 16.6767 5.48148 16.717C6.39171 16.7571 6.68238 16.7669 8.99974 16.7669C11.3175 16.7669 11.6074 16.7571 12.5176 16.717C13.4261 16.6767 14.0469 16.5373 14.5898 16.3329C15.1509 16.1218 15.6263 15.8386 16.1004 15.3788C16.5751 14.9193 16.8667 14.4581 17.0853 13.9145C17.2951 13.3887 17.4391 12.7878 17.4818 11.9081C17.5227 11.0263 17.5333 10.7453 17.5333 8.50015C17.5333 6.25504 17.5227 5.97328 17.4818 5.09149C17.4391 4.21143 17.2951 3.61071 17.0853 3.08508C16.8667 2.54137 16.5751 2.08016 16.1004 1.62066C15.6258 1.16082 15.1511 0.878377 14.5893 0.667403C14.0453 0.462973 13.4249 0.323644 12.5164 0.283343C11.6062 0.243215 11.3164 0.233398 8.99814 0.233398H9.00081ZM8.23525 1.72311C8.46245 1.72277 8.71597 1.72311 9.00077 1.72311C11.2792 1.72311 11.5492 1.73104 12.449 1.77065C13.281 1.8075 13.7326 1.94218 14.0334 2.05533C14.4316 2.20517 14.7155 2.38428 15.014 2.67362C15.3127 2.96295 15.4976 3.23851 15.6526 3.62429C15.7694 3.91535 15.9086 4.3528 15.9464 5.15881C15.9873 6.03026 15.9962 6.29204 15.9962 8.49823C15.9962 10.7044 15.9873 10.9662 15.9464 11.8377C15.9084 12.6437 15.7694 13.0811 15.6526 13.3722C15.4979 13.758 15.3127 14.0327 15.014 14.3218C14.7153 14.6112 14.4318 14.7903 14.0334 14.9401C13.7329 15.0538 13.281 15.1881 12.449 15.225C11.5494 15.2646 11.2792 15.2732 9.00077 15.2732C6.72217 15.2732 6.45212 15.2646 5.55256 15.225C4.72055 15.1878 4.26899 15.0531 3.96801 14.9399C3.56978 14.7901 3.28533 14.611 2.98666 14.3216C2.68799 14.0323 2.5031 13.7574 2.34808 13.3715C2.23128 13.0804 2.09208 12.643 2.05421 11.837C2.01332 10.9655 2.00514 10.7037 2.00514 8.49617C2.00514 6.2886 2.01332 6.0282 2.05421 5.15674C2.09226 4.35073 2.23128 3.91329 2.34808 3.62188C2.50275 3.2361 2.68799 2.96054 2.98666 2.67121C3.28533 2.38187 3.56978 2.20276 3.96801 2.05258C4.26881 1.93891 4.72055 1.80457 5.55256 1.76755C6.33977 1.7331 6.64484 1.72277 8.23525 1.72105V1.72311ZM13.5558 3.09574C12.9905 3.09574 12.5318 3.53956 12.5318 4.08741C12.5318 4.63508 12.9905 5.07942 13.5558 5.07942C14.1212 5.07942 14.5799 4.63508 14.5799 4.08741C14.5799 3.53974 14.1212 3.09574 13.5558 3.09574ZM9.00082 4.25481C6.58071 4.25481 4.61855 6.15564 4.61855 8.50013C4.61855 10.8446 6.58071 12.7446 9.00082 12.7446C11.4209 12.7446 13.3824 10.8446 13.3824 8.50013C13.3824 6.15564 11.4209 4.25481 9.00082 4.25481ZM9.00079 5.74454C10.5717 5.74454 11.8453 6.97818 11.8453 8.50013C11.8453 10.0219 10.5717 11.2557 9.00079 11.2557C7.42975 11.2557 6.15632 10.0219 6.15632 8.50013C6.15632 6.97818 7.42975 5.74454 9.00079 5.74454Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button aria-label="linked-in" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5333 8.4886C17.5333 9.04766 17.4746 9.60594 17.3592 10.1501C17.2467 10.6814 17.08 11.203 16.8617 11.7016C16.6483 12.1914 16.3837 12.6634 16.0745 13.1035C15.77 13.5409 15.4191 13.9512 15.0337 14.3253C14.6474 14.6977 14.2224 15.0367 13.7711 15.333C13.3152 15.6304 12.8273 15.8864 12.3215 16.094C11.806 16.3044 11.2664 16.4657 10.7184 16.5745C10.1559 16.6866 9.57755 16.7438 8.99962 16.7438C8.42126 16.7438 7.8429 16.6866 7.28121 16.5745C6.73244 16.4657 6.19283 16.3044 5.67779 16.094C5.17195 15.8864 4.68357 15.6304 4.22772 15.333C3.77645 15.0367 3.35143 14.6977 2.96599 14.3253C2.58015 13.9512 2.22928 13.5409 1.92427 13.1035C1.61675 12.6634 1.35172 12.1913 1.13755 11.7016C0.919183 11.203 0.752114 10.6814 0.639188 10.1501C0.525025 9.60594 0.466675 9.04766 0.466675 8.4886C0.466675 7.92913 0.524992 7.36965 0.639221 6.82665C0.752147 6.29538 0.919216 5.77299 1.13759 5.27519C1.35175 4.78505 1.61678 4.31265 1.9243 3.87246C2.22931 3.43473 2.58018 3.02517 2.96602 2.65069C3.35146 2.27823 3.77648 1.94007 4.22775 1.64421C4.6836 1.3455 5.17198 1.08958 5.67783 0.881567C6.19286 0.670713 6.73244 0.509099 7.28124 0.401087C7.84294 0.289844 8.4213 0.233398 8.99966 0.233398C9.57758 0.233398 10.1559 0.289844 10.7185 0.401087C11.2664 0.509131 11.806 0.670745 12.3215 0.881567C12.8273 1.08955 13.3153 1.3455 13.7711 1.64421C14.2224 1.94007 14.6475 2.27823 15.0337 2.65069C15.4191 3.02517 15.77 3.43473 16.0746 3.87246C16.3837 4.31265 16.6483 4.78508 16.8617 5.27519C17.08 5.77299 17.2467 6.29538 17.3592 6.82665C17.4746 7.36965 17.5333 7.92913 17.5333 8.4886ZM5.89026 2.11217C3.85805 3.0405 2.34131 4.85195 1.86836 7.03507C2.06048 7.03668 5.0973 7.07377 8.59622 6.17446C7.33492 4.00666 5.98735 2.23757 5.89026 2.11217ZM9.2 7.26001C5.44774 8.34669 1.84711 8.2685 1.71795 8.26369C1.71585 8.33945 1.71211 8.4128 1.71211 8.4886C1.71211 10.2996 2.41839 11.9507 3.57929 13.1991C3.57678 13.1954 5.57108 9.77282 9.50377 8.54262C9.59876 8.51199 9.69546 8.48456 9.79128 8.45797C9.60838 8.05732 9.40875 7.65584 9.2 7.26001ZM13.8124 3.1977C12.5293 2.10329 10.8447 1.43946 8.9996 1.43946C8.40748 1.43946 7.83286 1.50879 7.28242 1.63697C7.39157 1.77887 8.76042 3.53549 10.0067 5.74921C12.7565 4.75199 13.7944 3.22348 13.8124 3.1977ZM10.288 9.6261C10.2718 9.63131 10.2556 9.6358 10.2397 9.64142C5.93997 11.0914 4.53583 14.0136 4.52064 14.0455C5.75781 14.9762 7.30956 15.5377 8.99965 15.5377C10.0088 15.5377 10.9701 15.339 11.8448 14.9791C11.7368 14.3632 11.3135 12.2042 10.288 9.6261ZM13.0719 14.3349C14.7082 13.2668 15.8703 11.5706 16.1945 9.60591C16.0445 9.55916 14.0057 8.93477 11.6535 9.29958C12.6093 11.8407 12.9977 13.9101 13.0719 14.3349ZM10.5676 6.79966C10.7368 7.13585 10.9006 7.47801 11.0518 7.82188C11.1056 7.94524 11.1581 8.06618 11.2093 8.18708C13.7128 7.88233 16.1792 8.39506 16.2846 8.41599C16.2679 6.74483 15.65 5.21108 14.6275 4.01032C14.6137 4.02922 13.4449 5.66294 10.5676 6.79966Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button aria-label="twitter" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5208 3.59864L7.55438 4.13498L6.99479 4.0693C4.95791 3.81755 3.17843 2.9638 1.66756 1.52992L0.928908 0.818458L0.73865 1.34385C0.33575 2.51503 0.593158 3.75188 1.43253 4.58375C1.8802 5.04346 1.77948 5.10914 1.00725 4.8355C0.73865 4.74793 0.503625 4.68226 0.481242 4.71509C0.4029 4.79171 0.6715 5.78776 0.884142 6.18181C1.17513 6.72909 1.76828 7.26542 2.4174 7.58284L2.96579 7.83459L2.31668 7.84554C1.68994 7.84554 1.66756 7.85648 1.73471 8.08634C1.95854 8.79781 2.84268 9.55305 3.82755 9.88142L4.52143 10.1113L3.91708 10.4615C3.02175 10.965 1.96973 11.2496 0.917717 11.2715C0.414092 11.2825 0 11.3262 0 11.3591C0 11.4685 1.36538 12.0815 2.15999 12.3223C4.54382 13.0338 7.37531 12.7273 9.50173 11.5123C11.0126 10.6476 12.5235 8.92915 13.2286 7.26542C13.6091 6.37883 13.9896 4.75888 13.9896 3.98174C13.9896 3.47824 14.0232 3.41257 14.6499 2.81056C15.0192 2.4603 15.3662 2.0772 15.4333 1.96775C15.5452 1.75978 15.534 1.75978 14.9633 1.94586C14.012 2.27422 13.8777 2.23044 14.3477 1.73789C14.6947 1.38763 15.1088 0.752784 15.1088 0.566709C15.1088 0.533872 14.9409 0.5886 14.7506 0.68711C14.5492 0.796566 14.1015 0.96075 13.7658 1.05926L13.1614 1.24534L12.613 0.884131C12.3108 0.68711 11.8856 0.468198 11.6617 0.402524C11.0909 0.249286 10.218 0.271177 9.70318 0.446307C8.30422 0.938859 7.42008 2.20855 7.5208 3.59864Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button aria-label="youtube" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.6677 1.17143C16.4021 1.36664 16.9804 1.94183 17.1767 2.67227C17.5333 3.99611 17.5333 6.75832 17.5333 6.75832C17.5333 6.75832 17.5333 9.52043 17.1767 10.8444C16.9804 11.5748 16.4021 12.15 15.6677 12.3453C14.3369 12.7 9.00001 12.7 9.00001 12.7C9.00001 12.7 3.66309 12.7 2.33218 12.3453C1.59783 12.15 1.0195 11.5748 0.823232 10.8444C0.466675 9.52043 0.466675 6.75832 0.466675 6.75832C0.466675 6.75832 0.466675 3.99611 0.823232 2.67227C1.0195 1.94183 1.59783 1.36664 2.33218 1.17143C3.66309 0.81665 9.00001 0.81665 9.00001 0.81665C9.00001 0.81665 14.3369 0.81665 15.6677 1.17143ZM7.40002 4.43326V9.59993L11.6667 7.01669L7.40002 4.43326Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="sm:ml-0 ml-8 flex flex-col">
            <h2 className="text-base font-semibold leading-4 text-gray-800 ">Company</h2>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">Blog</a>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">Pricing</a>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">About Us</a>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">Contact us</a>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">Testimonials</a>
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold leading-4 text-gray-800 ">Support</h2>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">Legal policy</a>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">Status policy</a>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">Privacy policy</a>
            <a href="javascript:void(0)" className="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800  cursor-pointer">Terms of service</a>
          </div>
          <div className="mt-10 lg:block hidden">
            <label className="text-xl font-medium leading-5 text-gray-800 ">Get updates</label>
            <div className="cursor-pointer flex items-center justify-between border border-gray-800 mt-4">
              <input type="text" className="text-base leading-4 p-4 w-full focus:outline-none text-gray-800 placeholder-gray-800" placeholder="Enter your email" />
              <button aria-label="send" className="mr-4 fill-current text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:hidden">
          <label className="text-xl font-medium leading-5 text-gray-800 ">Get updates</label>
          <div className="flex items-center justify-between border border-gray-800 mt-4">
            <input type="text" className="text-base leading-4 p-4 relative z-0 w-full focus:outline-none text-gray-800 placeholder-gray-800" placeholder="Enter your email" />
            <button aria-label="send" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer mr-4 cursor-pointer relative z-40">
              <svg className="fill-current text-gray-800 hover:text-gray-500" width="16" height="17" viewBox="0 0 16 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>








    </main>
  );
}