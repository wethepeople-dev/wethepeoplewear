'use client'

import React from "react";
import Image from "next/image";
import { useState } from "react";

import Navbar from "@/components/Navbar";

import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {

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

  const images = [
    {
      url: "/carousel/rack.jpg",
      title: '"Coolest t-shirts in town"',
      description: "A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online",
    },
    {
      url: "/carousel/collectif.jpg",
      title: "Encuéntranos en tienda",
      description: "A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online",
    },
    {
      url: "/carousel/espalda.png",
      title: "Autenticidad, comodidad y simpleza",
      description: "A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">

      {/* Open Graph */}
      <meta property="og:url" content="https://wethepeoplewear.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="We The People Wear" />
      <meta property="og:description" content="Graphic T-Shirts con diseños positivos, modernos e inspiradores" />
      <meta property="og:image" content="https://opengraph.b-cdn.net/production/documents/05115e13-7514-43df-b976-c0a17daa288d.jpg?token=Lk5kXZK3ALqlzpLulLg8PLZ420lDZ7oa9obmyVmJHHY&height=320&width=320&expires=33247408942" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="wethepeoplewear.vercel.app" />
      <meta property="twitter:url" content="https://wethepeoplewear.vercel.app" />
      <meta name="twitter:title" content="We The People Wear" />
      <meta name="twitter:description" content="Graphic T-Shirts con diseños positivos, modernos e inspiradores" />
      <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/documents/05115e13-7514-43df-b976-c0a17daa288d.jpg?token=Lk5kXZK3ALqlzpLulLg8PLZ420lDZ7oa9obmyVmJHHY&height=320&width=320&expires=33247408942" />


      {/* NAVBAR */}
      <Navbar />

      {/* CAROUSEL */}
      {/* <div className="mx-auto w-screen">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          setApi={setApi}
          className="bg-slate-200"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="bg-center bg-no-repeat bg-blend-multiply bg-neutral-500 bg-cover"
                style={{
                  backgroundImage: `url(${image.url})`,
                  // backgroundSize: "cover",
                  // backgroundPosition: "center",
                  // backgroundAttachment: "fixed",
                  // opacity: "0.5",
                  height: "50vh",
                }}>
                <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
                  <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center font-black text-gray-100">
                      {image.title}
                    </h1>
                    <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
                      {image.description}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito-100 bg-azulito-100 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-azulito-100 py-2 sm:py-4 text-sm">Get Started</button>
                    <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito-100 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-azulito-100 text-azulito-100 px-4 sm:px-10 py-2 sm:py-4 text-sm">Live Demo</button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 mx-1 md:w-4 md:h-4 md:mx-2 rounded-full ${index === current - 1 ? "bg-azulito-100" : "bg-gray-400"
                }`}
            ></span>
          ))}
        </div>
      </div> */}


      {/* section */}
      <div style={{ height: '90vh' }}>
        <div className="mx-auto flex justify-center items-center h-full flex-col md:flex-row">

          {/* Left Side */}
          <div className="flex flex-col justify-center items-center px-7 py-10 md:w-1/2">
            <h1 className="text-5xl md:text-4xl lg:text-6xl xl:text-7xl font-black text-azulito-100 mb-4 uppercase text-center">
              welcome to <br className="hidden md:block" /> your local <br className="hidden md:block" /> t-shirt shop
            </h1>
            <p className="text-lg mb-8 text-center lg:px-5">
              En We The People Wear buscamos inspirarte a perseguir tus sueños y elevamos tu estilo con las mejores T-Shirts. ¡Encuentra el diseño perfecto para ti!
            </p>
            <button type="button" className="text-black text-xl border-2 border-black bg-amarillito-100 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-bold rounded-full px-5 py-3 text-center inline-flex items-center">
              Ver catálogo
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>

          </div>

          {/* Right Side */}
          <div className="w-screen md:w-1/2 bg-slate-200 h-full relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/rack.jpg)' }}></div>
          </div>

        </div>
      </div>

    </main>
  );
}