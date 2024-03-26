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
      url: "/carousel/camisas.png",
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
      <div className="mx-auto w-screen">
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
                {/* <img src={image} className="w-full" alt={`Slide ${index + 1}`} /> */}
                {/* <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
                  <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                    Expertos en soluciones <span className="text-slate-400">legales</span> e <span className="text-slate-400">inmobiliarias</span>
                  </h1>
                  <p className="text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                    Nos diferenciamos en estrategias y soluciones de diagnóstico inmobiliario para ayudar a los clientes en situaciones personales y problemáticas de negocio.
                  </p>
                </div> */}
                <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
                  <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center font-black text-gray-100">
                      {image.title}
                    </h1>
                    {/* <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
                      {image.description}
                    </p> */}
                  </div>
                  <div className="flex justify-center items-center">
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito-100 bg-azulito-100 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-azulito-100 py-2 sm:py-4 text-sm">Get Started</button>
                    <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito-100 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-azulito-100 text-azulito-100 px-4 sm:px-10 py-2 sm:py-4 text-sm">Live Demo</button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselNext />
          <CarouselPrevious /> */}
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
      </div>

    </main>
  );
}