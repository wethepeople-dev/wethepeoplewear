'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";

import { useCart } from "@/lib/CartContext";
import { formatCurrency } from "@/lib/utils";

export default function Carrito() {

    const { cart, getTotal, getCartQuantity, removeCartItem } = useCart();
    const total = getTotal();
    const cartQuantity = getCartQuantity();

    const [loadedCart, setLoadedCart] = useState(false);


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [addressLine, setAddressLine] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [comments, setComments] = useState("")

    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [emptyFieldsError, setEmptyFieldsError] = useState(false);
    const [loadingFinalizarCompra, setLoadingFinalizarCompra] = useState(false);


    const handleRemoveCartItem = (productId: number, talla: string, color: string) => () => {
        removeCartItem(productId, talla, color);
    }

    const handlePhoneChange = () => {
        if (validatePhone(phone)) {
            setPhoneError(false); // No error
        } else {
            setPhoneError(true);
        }
    };

    const validatePhone = (phoneNum: any): boolean => {
        // Regular expression to allow digits, spaces, parentheses, and the plus sign
        const isValid = /^[\d\s()+-]+$/.test(phoneNum);
        return isValid && phoneNum.replace(/[\s()+-]/g, '').length >= 7;
    };

    const handleEmailChange = () => {
        if (validateEmail(email)) {
            setEmailError(false); // No error
        } else {
            setEmailError(true);
        }
    };

    const validateEmail = (email: any) => {
        const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return expression.test(String(email).toLowerCase());
    };

    const handlePostalCodeChange = () => {
        if (validatePostalCode(postalCode)) {
            setPostalCodeError(false); // No error
        } else {
            setPostalCodeError(true);
        }
    };

    const validatePostalCode = (postalCode: string): boolean => {
        // Regular expression to allow exactly 5 digits
        const isValid = /^\d{5}$/.test(postalCode);
        return isValid;
    };

    const handleFinalizarCompra = async () => {

        if (name.length === 0 || email.length === 0 || phone.length === 0 || addressLine.length === 0 || city.length === 0 || state.length === 0 || postalCode.length === 0 || emailError || phoneError || postalCodeError) {
            setEmptyFieldsError(true);
        } else {
            setEmptyFieldsError(false);
            setLoadingFinalizarCompra(true);
            // const formattedDate = '';
            // if (date) {
            //     const formattedDate = format(date, "EEEE d 'de' MMMM, yyyy", { locale: es });
            // }
            // const temp_prods = cartItems.map((item) => {
            //     return {
            //         id: item.productId,
            //         nombre: item.nombre,
            //         cantidad: item.cantidad,
            //         precio: item.variacion.precio,
            //         tamanio: item.variacion.tamanio,
            //     }
            // });

            // const order_info = {
            //     total: total,
            //     name,
            //     email,
            //     phone,
            //     pickupPerson,
            //     // formattedDate: format(date, "EEEE d 'de' MMMM, yyyy", { locale: es }),
            //     formattedDate: date,
            //     pickupTime,
            //     messageClient,
            //     discount,
            // }

            // localStorage.setItem('orderInfo', JSON.stringify(order_info));
            // localStorage.setItem('cartItems', JSON.stringify(temp_prods));

            // try {
            //     const stripe = await asyncStripe;
            //     const res = await fetch(`/api/stripe/session`, {
            //         method: "POST",
            //         body: JSON.stringify({
            //             products: temp_prods,
            //             orderInfo: order_info,
            //             code,
            //         })
            //     });

            //     if (res.ok) {
            //         console.log('response is ok')
            //     } else {
            //         console.log('response is NOT ok')
            //     }

            //     const { sessionId } = await res.json();
            //     if (stripe) {
            //         const { error } = await stripe.redirectToCheckout({ sessionId });
            //         console.log(error);
            //         if (error) {
            //             // router.push("/error");
            //             console.log("Stripe error 1", error.message)
            //         }
            //     } else {
            //         console.log("Stripe is null");
            //     }
            // } catch (err) {
            //     console.log(err);
            //     // router.push("/error");
            //     console.log("Stripe error 2")
            // }
        }
    }

    useEffect(() => {
        if (cart) {
            setLoadedCart(true);
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO */}
            <section className="mt-20">
                {loadedCart == false ?

                    <div className="flex-grow flex items-center justify-center h-[60vh]">
                        <div role="status" className="flex flex-col items-center justify-center">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Cargando...</span>
                        </div>
                    </div>

                    :

                    cart.length === 0 ?

                        <>
                            <div className="flex flex-col bg-white" style={{ height: '70vh' }}>
                                <div className="flex flex-1 items-center justify-center">
                                    <div className="mx-auto max-w-xl px-4 text-center">
                                        <div className="flex justify-center items-center">
                                            <img className="w-32 h-32 mb-8 rounded-full object-cover"
                                                src="/logos/icon.png"
                                                alt="image empty states" />
                                        </div>
                                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                            Tu carrito esta vacío
                                        </h1>

                                        <p className="mt-2 text-gray-500">
                                            Descubre los productos que tenemos para ti.
                                        </p>

                                        <Link
                                            href="/catalogo"
                                            className="mt-6 inline-block rounded bg-azulito-100 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400 hover:shadow-lg focus:outline-none focus:ring"
                                        >
                                            Explorar productos
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>

                        :

                        <div className="container mx-auto py-10">

                            <h1 className="text-3xl font-bold mb-8">Carrito de compras</h1>

                            <div className="grid md:grid-cols-2 gap-8">

                                {/* RESUMEN de PRODUCTOS */}
                                <Card className="bg-card rounded-lg shadow-lg border">

                                    <CardHeader className="bg-muted px-6 py-4 pb-1 border-b">
                                        <div className="flex justify-between">
                                            <CardTitle className="lg:text-2xl md:text-lg text-lg font-normal mb-4">{cartQuantity} Productos</CardTitle>
                                            <CardTitle className="lg:text-2xl md:text-lg text-lg font-normal mb-4">{formatCurrency(total)} MXN</CardTitle>
                                        </div>
                                    </CardHeader>

                                    {/* productos */}
                                    <div className="grid gap-6 p-6 max-h-[70vh] overflow-auto sticky top-0">
                                        {cart.map((product) => (
                                            <>
                                                <div key={product.productId} className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
                                                    <img
                                                        src={product.foto}
                                                        alt={product.nombre}
                                                        width={100}
                                                        height={100}
                                                        className="rounded-lg object-cover"
                                                        style={{ aspectRatio: "100/100", objectFit: "cover" }}
                                                    />
                                                    <div className="grid gap-2">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-semibold">{product.nombre}</h3>
                                                        </div>
                                                        <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                                                            <span>Color: {product.variacion.color} | Talla: {product.variacion.talla}</span>
                                                            <span>{product.cantidad} x ${product.variacion.precio}</span>
                                                            {/* <span>Qty: {product.cantidad}</span> */}
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="icon" onClick={handleRemoveCartItem(product.productId, product.variacion.talla, product.variacion.color)}>
                                                        <XIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <hr />
                                            </>
                                        ))}
                                    </div>

                                </Card>

                                {/* CHECKOUT */}
                                <Card className="bg-card p-6 rounded-lg shadow-lg border">

                                    <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

                                    <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 my-6 rounded relative" role="alert">
                                        <strong className="font-bold">IMPORTANTE.&nbsp;</strong>
                                        <span className="block sm:inline">Por el momento solo realizamos envíos dentro de la República Mexicana. Envíos locales (Monterrey) +$60 MXN y envíos nacionales +$149 MXN.</span>
                                    </div>

                                    <div className="grid gap-4">

                                        {/* Nombre */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nombre <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className={"block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent"}
                                                placeholder="Escribe tu nombre"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyUp={handleEmailChange}
                                                className={cn("block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent",
                                                    emailError && "border-red-500"
                                                )}
                                                placeholder="Escribe tu email"
                                            />
                                        </div>

                                        {/* Teléfono */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">Número de teléfono <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="phone"
                                                type="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                onKeyUp={handlePhoneChange}
                                                className={cn("block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent",
                                                    phoneError && "border-red-500"
                                                )}
                                                placeholder="Escribe tu número de teléfono"
                                            />
                                        </div>

                                        {/* Dirección */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="addressLine">Dirección <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="addressLine"
                                                value={addressLine}
                                                onChange={(e) => setAddressLine(e.target.value)}
                                                className={"block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent"}
                                                placeholder="Escribe tu dirección"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">

                                            {/* Ciudad */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="city">Ciudad <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="city"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    className={"block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent"}
                                                    placeholder="Ciudad"
                                                />
                                            </div>

                                            {/* Estado */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="state">Estado <span className="text-red-500">*</span></Label>
                                                {/* <Input id="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Estado" /> */}
                                                <Select
                                                    value={state}
                                                    onValueChange={value => setState(value)}
                                                >
                                                    <SelectTrigger id="state">
                                                        <SelectValue placeholder="Estado" className="text-gray-600" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="aguascalientes">Aguascalientes</SelectItem>
                                                        <SelectItem value="baja-california">Baja California</SelectItem>
                                                        <SelectItem value="baja-california-sur">Baja California Sur</SelectItem>
                                                        <SelectItem value="campeche">Campeche</SelectItem>
                                                        <SelectItem value="chiapas">Chiapas</SelectItem>
                                                        <SelectItem value="chihuahua">Chihuahua</SelectItem>
                                                        <SelectItem value="ciudad-de-mexico">Ciudad de México</SelectItem>
                                                        <SelectItem value="coahuila">Coahuila</SelectItem>
                                                        <SelectItem value="colima">Colima</SelectItem>
                                                        <SelectItem value="durango">Durango</SelectItem>
                                                        <SelectItem value="guanajuato">Guanajuato</SelectItem>
                                                        <SelectItem value="guerrero">Guerrero</SelectItem>
                                                        <SelectItem value="hidalgo">Hidalgo</SelectItem>
                                                        <SelectItem value="jalisco">Jalisco</SelectItem>
                                                        <SelectItem value="mexico">Estado de México</SelectItem>
                                                        <SelectItem value="michoacan">Michoacán</SelectItem>
                                                        <SelectItem value="morelos">Morelos</SelectItem>
                                                        <SelectItem value="nayarit">Nayarit</SelectItem>
                                                        <SelectItem value="nuevo-leon">Nuevo León</SelectItem>
                                                        <SelectItem value="oaxaca">Oaxaca</SelectItem>
                                                        <SelectItem value="puebla">Puebla</SelectItem>
                                                        <SelectItem value="queretaro">Querétaro</SelectItem>
                                                        <SelectItem value="quintana-roo">Quintana Roo</SelectItem>
                                                        <SelectItem value="san-luis-potosi">San Luis Potosí</SelectItem>
                                                        <SelectItem value="sinaloa">Sinaloa</SelectItem>
                                                        <SelectItem value="sonora">Sonora</SelectItem>
                                                        <SelectItem value="tabasco">Tabasco</SelectItem>
                                                        <SelectItem value="tamaulipas">Tamaulipas</SelectItem>
                                                        <SelectItem value="tlaxcala">Tlaxcala</SelectItem>
                                                        <SelectItem value="veracruz">Veracruz</SelectItem>
                                                        <SelectItem value="yucatan">Yucatán</SelectItem>
                                                        <SelectItem value="zacatecas">Zacatecas</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            </div>

                                            {/* Código Postal */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="postalCode">Código Postal <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="postalCode"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value)}
                                                    onKeyUp={handlePostalCodeChange}
                                                    className={cn("block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent",
                                                        postalCodeError && "border-red-500"
                                                    )}
                                                    placeholder="Código Postal"
                                                />
                                            </div>
                                        </div>

                                        {/* Comentarios */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="comments">Comentarios</Label>
                                            <Textarea
                                                id="comments"
                                                value={comments}
                                                onChange={(e) => setComments(e.target.value)}
                                                className={"block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent"}
                                                placeholder="Escribe un comentario"
                                                rows={3}
                                            />
                                        </div>

                                        {emptyFieldsError && <p className="mb-2 italic text-red-500 flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                            Favor de llenar correctamente todos los campos requeridos
                                        </p>}

                                        <Button type="submit" onClick={handleFinalizarCompra} className="w-full text-center py-3 transition-all duration-300 hover:shadow-lg hover:bg-gray-600">
                                            {loadingFinalizarCompra ? "Cargando..." : "Proceder al pago"}
                                        </Button>

                                    </div>
                                </Card>

                            </div>
                        </div>
                }

            </section>

            {/* FOOTER */}
            <Footer />


        </main>
    );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    )
}