'use client'

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";

import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/components/ui/carousel"
import { InstagramEmbed } from 'react-social-media-embed';
import Script from 'next/script';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

import { formatCurrency } from "@/lib/utils";


interface ProductVariation {
  variation_id: string; // UUID
  product_id: string; // UUID
  color: string;
  talla: string;
  precio: number;
  fotos: string[]; // Adjust based on your structure
  stock_qty: number;
}

interface Product {
  product_id: string; // UUID
  name: string;
  description: string;
  colores: string[];
  tallas: string[];
  release_date: string; // or Date
  variations: ProductVariation[]; // Include variations
}

export default function Home() {

  function convertToTwoDigits(num: number): string {
    return num.toString().padStart(2, '0');
  }

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const bestsellerIds = [
    '988edf04-a24b-4c3f-ba61-770c12c7a853',
    '86f8c58e-0428-4c62-bc84-07787e1c2778',
    '5544bd99-4da1-4ed8-b0cb-b84bad6e9015'
  ]
  // const bestsellers = productos.filter(p => bestsellerIds.includes(p.id))
  const [bestsellers, setBestsellers] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products', {
        cache: 'no-store', // Ensure no caching
      });
      if (!response.ok) {
        console.error('Failed to fetch products');
        return;
      }
      const products: Product[] = await response.json();
      const bestSellingProducts = products.filter((p) => bestsellerIds.includes(String(p.product_id)));
      console.log('Bestsellers:', bestSellingProducts);
      setBestsellers(bestSellingProducts);
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col">

      {/* NAVBAR */}
      <Navbar />


      {/* FOTO y TEXTO */}
      <div style={{ height: '92vh' }} className="mt-16">
        <div className="mx-auto flex justify-center items-center h-full flex-col md:flex-row">

          {/* Left Side */}
          <div className="flex flex-col justify-center items-center px-7 py-10 md:w-1/2">
            <h1 className="text-5xl md:text-4xl lg:text-6xl xl:text-7xl font-black text-azulito-100 mb-4 uppercase text-center">
              welcome to <br className="hidden md:block" /> your local <br className="hidden md:block" /> t-shirt shop
            </h1>
            <p className="text-lg md:text-base lg:text-lg mb-8 text-center px-2 md:px-5 lg:px-10">
              En We The People Wear buscamos inspirarte a perseguir tus sueños y elevamos tu estilo con las mejores T-Shirts. ¡Encuentra el diseño perfecto para ti!
            </p>
            <Link href="/catalogo" className="text-black text-xl border-2 border-black bg-amarillito-100 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-bold rounded-full px-5 py-3 text-center inline-flex items-center">
              Ver catálogo
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>

          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 bg-slate-200 h-full relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/rack.jpg)' }}></div>
          </div>
          {/* <div className="w-full md:w-1/2 bg-slate-200 h-full relative">
            <video
              src="/other/intro.mov"  // Ruta de tu video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div> */}

        </div>
      </div>

      {/* Sección 3 columnas */}
      <section className="bg-azulito-100 text-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid lg:grid-cols-3 md:gap-12 md:space-y-0 text-center">

            {/* Autenticidad */}
            <div>
              <div className="flex justify-center items-center mb-6 w-10 h-5 rounded-full bg-primary-100 mx-auto">
                <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">AUTENTICIDAD</h3>
              <p className="text-gray-100 px-3">
                Diseñamos nuestras camisetas desde cero, por lo que sus diseños son únicos.
              </p>
            </div>

            <Separator className="md:hidden" />

            {/* Comodidad */}
            <div>
              <div className="flex justify-center items-center mb-6 w-10 h-5 rounded-full bg-primary-100 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">COMODIDAD</h3>
              <p className="text-gray-100 px-3">
                Nuestras camisetas 100% algodón son respirables, por lo que estarás cómodo todo el día.
              </p>
            </div>

            <Separator className="md:hidden" />

            {/* Simpleza */}
            <div>
              <div className="flex justify-center items-center mb-6 w-10 h-5 rounded-full bg-primary-100 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">SIMPLEZA</h3>
              <p className="text-gray-100 px-3">
                ¿Nunca sabes qué ponerte? Una T-Shirt, un par de jeans, y ¡estás listo para conquistar el día!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Sección de Carrusel */}
      <section>
        <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-amarillito-100 mb-4 uppercase text-center">
              always look efortlessly cool
            </h1>
            {/* <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online </p> */}
          </div>

          {/* <div className="flex justify-center items-center">
            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Get Started</button>
            <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">Live Demo</button>
          </div> */}

          <Carousel
            className="w-full"
            style={{ width: '75vw' }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
              }),
            ]}>
            <CarouselContent className="-ml-1">

              {Array.from({ length: 30 }).map((_, index) => (
                <CarouselItem key={index} className="pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div className="relative rounded-lg overflow-hidden aspect-square">
                      <img src={`/modelos/modelo-camisas-0${convertToTwoDigits(index + 1)}.jpg`} alt="modelo con t-shirt" className="object-cover w-full h-full" />
                    </div>
                  </div>
                </CarouselItem>
              ))}

            </CarouselContent>

            <CarouselPrevious className="border-0" />
            <CarouselNext className="border-0" />

          </Carousel>
        </div>
      </section>

      {/* OPINIONES */}
      <div className="md:py-10 mb-10 mx-auto px-6 bg-azulito-100">

        <section className="text-center">

          <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">


            {/* opinion #1 */}
            <div className="md:mb-0 px-2 py-8 md:py-0">
              <div className="mb-6 flex justify-center">
                <img src="/logos/LOGO_BLANCO.png"
                  className="w-20" />
              </div>
              {/* <h6 className="mb-4 font-bold text-white">
                Cliente
              </h6> */}
              <p className="mb-4 text-white">
                “Wow!! Son lo máximo para usar a diario, literal me levanto y una t-shirt me soluciona todo el outfit”
              </p>

              <ul className="mb-0 flex justify-center">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
              </ul>

            </div>

            <Separator className="md:hidden" />

            {/* opinion #2 */}
            <div className="md:mb-0 px-2 py-8 md:py-0">
              <div className="mb-6 flex justify-center">
                <img src="/logos/LOGO_BLANCO.png"
                  className="w-20" />
              </div>
              {/* <h6 className="mb-4 font-bold text-white">
                Cliente
              </h6> */}
              <p className="mb-4 text-white">
                “Quedé impresionada con todos los detalles, desde el diseño de la camiseta hasta el empaque”
              </p>

              <ul className="mb-0 flex justify-center">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
              </ul>

            </div>

            <Separator className="md:hidden" />

            {/* opinion #3 */}
            <div className="md:mb-0 px-2 py-8 md:py-0">
              <div className="mb-6 flex justify-center">
                <img src="/logos/LOGO_BLANCO.png"
                  className="w-20" />
              </div>
              {/* <h6 className="mb-4 font-bold text-white">
                Cliente
              </h6> */}
              <p className="mb-4 text-white">
                “Nunca había tenido una camiseta tan diferente. Me encantaron todos los diseños”
              </p>

              <ul className="mb-0 flex justify-center">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-7 text-amarillito-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
              </ul>

            </div>


          </div>
        </section>
      </div>

      {/* BESTSELLERS */}
      <section className="w-full py-8 mb-0" id="bestsellers">

        <div className="container mx-auto flex flex-col items-center mb-12">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-amarillito-100 uppercase text-center">
              MORE THAN YOUR AVERAGE T-SHIRT
            </h1>
          </div>
        </div>

        <div className="container px-4 md:px-6">

          {/* title */}
          <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">BEST SELLERS</h2>
            <Link href="/catalogo" className="text-sm md:text-base font-medium text-primary hover:underline flex items-center" prefetch={false}>
              View All
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">

            {/* Bestsellers */}
            {bestsellers.map((producto) => (
              <div key={producto.product_id} className="group">
                <Link href={`/catalogo/${producto.product_id}`} className="block" prefetch={false}>
                  <img
                    src={producto.variations[0].fotos[1]} // Adjust this based on your data structure
                    alt="Bestseller"
                    width={400}
                    height={400}
                    className="w-full h-[300px] md:h-[350px] bg-slate-200 lg:h-[400px] object-cover rounded-lg group-hover:opacity-60 transition-opacity"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg md:text-xl font-semibold">{producto.name}</h3>
                    <p className="text-base font-medium text-gray-600">{formatCurrency(producto.variations[0].precio)} MXN</p>
                  </div>
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* <section className="py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">Our latest  blog</h2>
          <div className="flex justify-center  gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
              <div className="flex items-center">
                <img src="https://pagedone.io/asset/uploads/1696244317.png" alt="blogs tailwind section" className="rounded-t-2xl w-full object-cover" />
              </div>
              <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                <span className="text-indigo-600 font-medium mb-3 block">Jan 01, 2023</span>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">Clever ways to invest in product to organize your portfolio</h4>
                <p className="text-gray-500 leading-6 mb-10">Discover smart investment strategies to streamline and organize your portfolio..</p>
                <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</a>
              </div>
            </div>
            <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
              <div className="flex items-center">
                <img src="https://pagedone.io/asset/uploads/1696244340.png" alt="blogs tailwind section" className="rounded-t-2xl w-full object-cover" />
              </div>
              <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                <span className="text-indigo-600 font-medium mb-3 block">Feb 01, 2023</span>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">How to grow your profit through systematic investment with us</h4>
                <p className="text-gray-500 leading-6 mb-10">Unlock the power of systematic investment with us and watch your profits soar. Our..</p>
                <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</a>
              </div>
            </div>
            <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
              <div className="flex items-center">
                <img src="https://pagedone.io/asset/uploads/1696244356.png" alt="blogs tailwind section" className="rounded-t-2xl w-full object-cover" />
              </div>
              <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                <span className="text-indigo-600 font-medium mb-3 block">Mar 01, 20233</span>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">How to analyze every holdings of your portfolio</h4>
                <p className="text-gray-500 leading-6 mb-10">Our comprehensive guide will equip you with the tools and insights needed to..</p>
                <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* SOCIAL MEDIA FEED */}
      <div className="relative py-10 pt-14">
        <div className="flex flex-wrap w-full">

          {/* texto */}
          <div className="w-full px-10 md:px-20 mx-auto text-center lg:text-left lg:w-6/12 lg:flex lg:items-center">
            <div className="hero-content">
              <h1 className="mb-6 lg:text-7xl md:text-5xl text-4xl font-bold tracking-tight">
                Visita nuestras redes
              </h1>
              <p className="mb-4 max-w-[480px] text-2xl text-body-color mx-auto lg:mx-0">
                Síguenos en nuestras redes sociales para estar al tanto de nuestras promociones y nuevos lanzamientos.
              </p>

            </div>
          </div>

          {/* embed */}
          <div className="w-full px-4 py-10 lg:w-6/12 mx-auto">
            <div className="z-10 lg:pt-0 flex justify-center">

              <blockquote
                className="instagram-media mx-auto"
                data-instgrm-permalink="https://www.instagram.com/wethepeople.wear/"
                data-instgrm-version="12"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px auto',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: 0,
                  width: '99.375%',
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a
                    id="main_link"
                    href="https://www.instagram.com/wethepeople.wear/"
                    style={{
                      background: '#FFFFFF',
                      lineHeight: 0,
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%',
                    }}
                    target="_blank"
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <div
                        style={{
                          backgroundColor: '#F4F4F4',
                          borderRadius: '50%',
                          flexGrow: 0,
                          height: '40px',
                          marginRight: '14px',
                          width: '40px',
                        }}
                      ></div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          flexGrow: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: '#F4F4F4',
                            borderRadius: '4px',
                            flexGrow: 0,
                            height: '14px',
                            marginBottom: '6px',
                            width: '100px',
                          }}
                        ></div>
                        <div
                          style={{
                            backgroundColor: '#F4F4F4',
                            borderRadius: '4px',
                            flexGrow: 0,
                            height: '14px',
                            width: '60px',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div style={{ padding: '19% 0' }}></div>
                    <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                      {/* SVG Icon */}
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <div
                        style={{
                          color: '#3897f0',
                          fontFamily: 'Arial,sans-serif',
                          fontSize: '14px',
                          fontWeight: 550,
                          lineHeight: '18px',
                        }}
                      >
                        View this post on Instagram
                      </div>
                    </div>
                    <div style={{ padding: '12.5% 0' }}></div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '14px',
                        alignItems: 'center',
                      }}
                    >
                      {/* Additional styling and content */}
                    </div>
                  </a>
                  <p
                    style={{
                      color: '#c9c8cd',
                      fontFamily: 'Arial,sans-serif',
                      fontSize: '14px',
                      lineHeight: '17px',
                      marginBottom: 0,
                      marginTop: '8px',
                      overflow: 'hidden',
                      padding: '8px 0 7px',
                      textAlign: 'center',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <a
                      href="https://www.instagram.com/wethepeople.wear/"
                      style={{
                        color: '#c9c8cd',
                        fontFamily: 'Arial,sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        lineHeight: '17px',
                        textDecoration: 'none',
                      }}
                      target="_blank"
                    >
                      Shared post
                    </a>{' '}
                    on <time style={{ fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px' }}>Time</time>
                  </p>
                </div>
              </blockquote>
              <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />

            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full px-4 py-10 lg:w-6/12 mx-auto text-center justify-center flex flex-row gap-4">

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <InstagramEmbed url="https://www.instagram.com/p/CxbQP5ZJciG/" width={328} />
            </div>

            <div className="hidden xl:block">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InstagramEmbed url="https://www.instagram.com/p/C172po5JmC4/" width={328} />
              </div>
            </div>

          </div> */}

      {/* FOOTER */}
      <Footer />


    </main>
  );
}