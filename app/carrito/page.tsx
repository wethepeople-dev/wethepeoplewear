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
import { ToastContainer, toast } from 'react-toastify';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, ShoppingCart, Trash2, BadgePercent } from 'lucide-react'
import { cn } from "@/lib/utils";

import { loadStripe } from "@stripe/stripe-js";

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

import { useCart } from "@/lib/CartContext";
import { formatCurrency } from "@/lib/utils";

interface DiscountCode {
    code_id: string;       // UUID
    code: string;          // The discount code
    percentage: number;    // Discount percentage
    active: boolean;       // Whether the code is active
    stripe_validated: boolean; // Whether it's validated by Stripe
    created_at: string;    // Timestamp of when the code was created
}

const shippingOptions = [
    {
        id: 'shr_1QCd2Z06GvttNHxde76R6bnb',
        name: 'Envíos locales',
        price: 60,
    },
    {
        id: 'shr_1QCd3d06GvttNHxdNBL5g2YX',
        name: 'Envíos nacionales',
        price: 150,
    },
];

export default function Carrito() {

    const { cart, getTotal, getCartQuantity, removeCartItem, emptyCart } = useCart();
    const total = getTotal();
    const cartQuantity = getCartQuantity();

    const [loadedCart, setLoadedCart] = useState(false);
    const [loadingFinalizarCompra, setLoadingFinalizarCompra] = useState(false);

    // Form fields
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [addressLine, setAddressLine] = useState("")
    const [municipio, setMunicipio] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [tipoEnvio, setTipoEnvio] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [comments, setComments] = useState("")

    // coupon code
    const [couponCode, setCouponCode] = useState('')
    const [searchingDiscount, setSearchingDiscount] = useState(false);
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [message, setMessage] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountObject, setDiscountObject] = useState<DiscountCode | null>(null);

    // Errors
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [emptyFieldsError, setEmptyFieldsError] = useState(false);


    const handleEmptyCart = () => {
        emptyCart();
        toast.success("Carrito vaciado", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const validateCode = async () => {
        setSearchingDiscount(true);
        try {
            const response = await fetch(`/api/validate-discounts`, {
                method: "POST",
                body: JSON.stringify({ code: couponCode })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.active && data.stripe_validated) {
                    setMessage(`Código válido. Descuento del ${data.percentage}% aplicado.`);
                    setIsCodeValid(true);
                    setDiscount(data.percentage / 100);
                    setDiscountObject(data);
                    setSearchingDiscount(false);
                } else {
                    setMessage('El código no está activo o no es válido.');
                    setIsCodeValid(false);
                    setDiscount(0);
                    setSearchingDiscount(false);
                }
            } else {
                console.log('response', response);
                setMessage('Código inválido. Intente de nuevo.');
                setIsCodeValid(false);
                setDiscount(0);
                setSearchingDiscount(false);
            }

        } catch (error) {
            console.log('error', error);
        }
    };

    const handleRemoveCartItem = (productId: string, talla: string, color: string) => () => {
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

    const handleEnvioChange = (value: string) => {
        setTipoEnvio(value);
        if (value == 'local') {
            setCity('Monterrey');
            setState('Nuevo León');
        } else {
            setCity('');
            setState('');
        }
    }

    const validatePostalCode = (postalCode: string): boolean => {
        // Regular expression to allow exactly 5 digits
        const isValid = /^\d{5}$/.test(postalCode);
        return isValid;
    };

    const handleFinalizarCompra = async () => {

        // checar campos del Envio
        if (tipoEnvio === '') {
            setEmptyFieldsError(true);
            console.log('error envio vacio')
            return;
        } else if (tipoEnvio != 'collectif') {
            if (addressLine.length === 0 || municipio.length === 0 || city.length === 0 || state.length === 0 || postalCode.length === 0 || postalCodeError) {
                setEmptyFieldsError(true);
                console.log('error campos de envio')
                return;
            }
        }

        // checar campos de contacto
        if (name.length === 0 || email.length === 0 || phone.length === 0 || tipoEnvio.length === 0 || emailError || phoneError) {
            setEmptyFieldsError(true);
            console.log('error campos de contacto')

            // Proceder al pago
        } else {
            setEmptyFieldsError(false);
            setLoadingFinalizarCompra(true);
            const temp_prods = cart.map((item) => {
                return {
                    id: item.productId,
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.variacion.precio,
                    tamanio: item.variacion.talla,
                    color: item.variacion.color,
                    variation_id: item.variacion.variation_id,
                }
            });

            const order_info = {
                total: total,
                name,
                email,
                phone,
                addressLine,
                municipio,
                city,
                state,
                country: 'México',
                postalCode,
                shipping_status: 'processing',
                shipping_method: tipoEnvio,
                shipping_cost: tipoEnvio == 'local' ? 60 : tipoEnvio == 'nacional' ? 150 : 0,
                shipment_cost_id: tipoEnvio == 'local' ? 'shr_1QCd2Z06GvttNHxde76R6bnb' : tipoEnvio == 'nacional' ? 'shr_1QCd3d06GvttNHxdNBL5g2YX' : '',
                comments,
                discount,
                discountObject,
            }

            localStorage.setItem('orderInfo', JSON.stringify(order_info));
            localStorage.setItem('cartItems', JSON.stringify(temp_prods));

            try {
                const stripe = await asyncStripe;
                const res = await fetch(`/api/stripe/session`, {
                    method: "POST",
                    body: JSON.stringify({
                        products: temp_prods,
                        orderInfo: order_info,
                        code: discountObject ? discountObject.code : null,
                    })
                });

                if (res.ok) {
                    console.log('response is ok')
                } else {
                    console.log('response is NOT ok')
                }

                const { sessionId } = await res.json();
                if (stripe) {
                    const { error } = await stripe.redirectToCheckout({ sessionId });
                    console.log(error);
                    if (error) {
                        // router.push("/error");
                        console.log("Stripe error 1", error.message)
                    }
                } else {
                    console.log("Stripe is null");
                }
            } catch (err) {
                console.log(err);
                // router.push("/error");
                console.log("Stripe error 2")
            }
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
            <section className="mt-16">
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

                        <>

                            {/* barra superior */}
                            <div className="bg-gray-100 border-b mb-6 mt-2">
                                <div className="container mx-auto px-8 py-2">
                                    <div className="flex flex-row items-center justify-between gap-4">

                                        {/* seguir comprano */}
                                        <div className="flex items-center gap-4">
                                            <Link href={'/catalogo'} className="w-auto flex items-center hover:text-blue-800">
                                                <ArrowLeft className="h-6 w-6 md:h-4 md:w-4 mr-2" />
                                                <span className="md:block hidden">Seguir comprando</span>
                                            </Link>
                                        </div>

                                        {/* botones */}
                                        <div className="flex flex-row items-center gap-2 w-auto">

                                            {/* Aplicar cupón */}
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                {isCodeValid ?
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-800 font-bold">Ahorras {discount * 100}%</span>
                                                    </div>
                                                    :
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline">
                                                                <BadgePercent className="h-4 w-4 mr-2" />
                                                                Aplicar cupón
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-md">
                                                            <DialogHeader>
                                                                <DialogTitle>Cupón de descuento</DialogTitle>
                                                                <DialogDescription>
                                                                    Ingresa el código de tu cupón para aplicar el descuento.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="flex items-center space-x-2">
                                                                <div className="grid flex-1 gap-2">
                                                                    <Label htmlFor="link" className="sr-only">
                                                                        Link
                                                                    </Label>
                                                                    <Input
                                                                        id="link"
                                                                        defaultValue="Ingresa tu código..."
                                                                        value={couponCode}
                                                                        onChange={(e) => setCouponCode(e.target.value)}
                                                                        disabled={searchingDiscount || isCodeValid}
                                                                    />
                                                                </div>
                                                                <Button type="submit"
                                                                    size="sm"
                                                                    className="px-3"
                                                                    onClick={validateCode}
                                                                    disabled={searchingDiscount || couponCode.length <= 0 || isCodeValid}
                                                                >
                                                                    {
                                                                        searchingDiscount ?
                                                                            'Validando...'
                                                                            :
                                                                            isCodeValid ?
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                                </svg>
                                                                                :
                                                                                'Validar'
                                                                    }
                                                                </Button>
                                                            </div>
                                                            <DialogFooter className="sm:justify-start">
                                                                {message ?
                                                                    isCodeValid ?
                                                                        <p className="text-sm text-green-700">{message}</p>
                                                                        :
                                                                        <p className="text-sm text-red-500">{message}</p>
                                                                    :
                                                                    <></>
                                                                }
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                }
                                            </div>

                                            {/* Vaciar carrito */}
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                <ToastContainer />
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button
                                                            type="button"
                                                            className="px-4 py-2 my-2 flex items-center bg-white hover:bg-gray-100 border-red-300 border hover:shadow-lg focus:ring-0 text-red-500 text-sm rounded font-medium"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-1" />
                                                            Vaciar
                                                        </button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>¿Vaciar carrito?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Esta acción no se puede deshacer.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-red-500" onClick={handleEmptyCart}>Vaciar</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container mx-auto pb-10">

                                <div className="grid lg:grid-cols-2 gap-8">

                                    {/* RESUMEN de PRODUCTOS */}
                                    <Card className="bg-card rounded-lg shadow-lg border">

                                        <CardHeader className="bg-muted px-6 py-4 border-b pb-4">

                                            <div className="flex justify-between">
                                                <CardTitle className="lg:text-2xl md:text-lg text-lg font-normal">{cartQuantity} Productos</CardTitle>
                                                <CardTitle className="lg:text-2xl md:text-lg text-lg font-normal">{isCodeValid ? formatCurrency(total * (1 - discount)) : formatCurrency(total)} MXN</CardTitle>
                                            </div>

                                            {/* codigo de descuento */}
                                            {isCodeValid &&
                                                <div className="flex justify-end">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-muted-foreground">Total sin descuento:</span>
                                                        <span className="font-semibold line-through">{formatCurrency(total)} MXN</span>
                                                    </div>
                                                </div>
                                            }

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
                                            <span className="block sm:inline">
                                                Por el momento solo realizamos envíos dentro de la República Mexicana. Envíos locales (Monterrey) +$60 MXN y envíos nacionales +$150 MXN.
                                            </span>
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

                                            {/* Envío */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="envio">Envío <span className="text-red-500">*</span></Label>
                                                <Select
                                                    value={tipoEnvio}
                                                    onValueChange={value => handleEnvioChange(value)}
                                                >
                                                    <SelectTrigger id="envio">
                                                        <SelectValue placeholder="Seleccionar método" className="text-gray-600" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="local">Local (Monterrey y área metropolitana) - $60</SelectItem>
                                                        <SelectItem value="nacional">Nacional (Todo México) - $150</SelectItem>
                                                        <SelectItem value="collectif">Recoger en Collectif (Monterrey) - Gratis</SelectItem>
                                                    </SelectContent>

                                                </Select>

                                            </div>

                                            {tipoEnvio != '' ?
                                                tipoEnvio != 'collectif' ?
                                                    <>
                                                        {/* Dirección */}
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="addressLine">Dirección (calle, número y colonia) <span className="text-red-500">*</span></Label>
                                                            <Input
                                                                id="addressLine"
                                                                value={addressLine}
                                                                onChange={(e) => setAddressLine(e.target.value)}
                                                                className={"block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent"}
                                                                placeholder="Escribe tu dirección"
                                                            />
                                                        </div>

                                                        <div className="grid md:grid-cols-2 gap-4">

                                                            {/* Municipio */}
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="municipio">Municipio <span className="text-red-500">*</span></Label>
                                                                <Input
                                                                    id="municipio"
                                                                    value={municipio}
                                                                    onChange={(e) => setMunicipio(e.target.value)}
                                                                    className={"block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent"}
                                                                    placeholder="Municipio"
                                                                />
                                                            </div>

                                                            {/* Ciudad */}
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="city">Ciudad <span className="text-red-500">*</span></Label>
                                                                <Input
                                                                    id="city"
                                                                    disabled={tipoEnvio == 'local'}
                                                                    value={city}
                                                                    onChange={(e) => setCity(e.target.value)}
                                                                    className={"block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:bg-gray-100 focus-visible:ring-0 focus-visible:ring-transparent"}
                                                                    placeholder={tipoEnvio == 'local' ? "Monterrey" : "Ciudad"}
                                                                />
                                                            </div>

                                                        </div>

                                                        <div className="grid md:grid-cols-2 gap-4">

                                                            {/* Estado */}
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="state">Estado <span className="text-red-500">*</span></Label>
                                                                {/* <Input id="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Estado" /> */}
                                                                <Select
                                                                    value={state}
                                                                    disabled={tipoEnvio == 'local'}
                                                                    onValueChange={value => setState(value)}
                                                                >
                                                                    <SelectTrigger id="state">
                                                                        <SelectValue placeholder={tipoEnvio == 'local' ? "Nuevo León" : "Estado"} className="text-gray-600" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Aguascalientes">Aguascalientes</SelectItem>
                                                                        <SelectItem value="Baja California">Baja California</SelectItem>
                                                                        <SelectItem value="Baja California Sur">Baja California Sur</SelectItem>
                                                                        <SelectItem value="Campeche">Campeche</SelectItem>
                                                                        <SelectItem value="Chiapas">Chiapas</SelectItem>
                                                                        <SelectItem value="Chihuahua">Chihuahua</SelectItem>
                                                                        <SelectItem value="Ciudad de México">Ciudad de México</SelectItem>
                                                                        <SelectItem value="Coahuila">Coahuila</SelectItem>
                                                                        <SelectItem value="Colima">Colima</SelectItem>
                                                                        <SelectItem value="Durango">Durango</SelectItem>
                                                                        <SelectItem value="Guanajuato">Guanajuato</SelectItem>
                                                                        <SelectItem value="Guerrero">Guerrero</SelectItem>
                                                                        <SelectItem value="Hidalgo">Hidalgo</SelectItem>
                                                                        <SelectItem value="Jalisco">Jalisco</SelectItem>
                                                                        <SelectItem value="Estado de México">Estado de México</SelectItem>
                                                                        <SelectItem value="Michoacán">Michoacán</SelectItem>
                                                                        <SelectItem value="Morelos">Morelos</SelectItem>
                                                                        <SelectItem value="Nayarit">Nayarit</SelectItem>
                                                                        <SelectItem value="Nuevo León">Nuevo León</SelectItem>
                                                                        <SelectItem value="Oaxaca">Oaxaca</SelectItem>
                                                                        <SelectItem value="Puebla">Puebla</SelectItem>
                                                                        <SelectItem value="Querétaro">Querétaro</SelectItem>
                                                                        <SelectItem value="Quintana Roo">Quintana Roo</SelectItem>
                                                                        <SelectItem value="San Luis Potosí">San Luis Potosí</SelectItem>
                                                                        <SelectItem value="Sinaloa">Sinaloa</SelectItem>
                                                                        <SelectItem value="Sonora">Sonora</SelectItem>
                                                                        <SelectItem value="Tabasco">Tabasco</SelectItem>
                                                                        <SelectItem value="Tamaulipas">Tamaulipas</SelectItem>
                                                                        <SelectItem value="Tlaxcala">Tlaxcala</SelectItem>
                                                                        <SelectItem value="Veracruz">Veracruz</SelectItem>
                                                                        <SelectItem value="Yucatán">Yucatán</SelectItem>
                                                                        <SelectItem value="Zacatecas">Zacatecas</SelectItem>
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
                                                    </>
                                                    :
                                                    <>
                                                        <p className="text-sm text-gray-500">
                                                            Collectif Concept Store: <br />
                                                            Río Guadalquivir 320 ote, col. Del Valle, San Pedro Garza García, Nuevo León, CP 66220 <br />
                                                            <a href="https://maps.app.goo.gl/ZdFY7pYak5pMWfTT9" className=" underline hover:text-gray-300" target="blank">https://maps.app.goo.gl/ZdFY7pYak5pMWfTT9</a>
                                                        </p>
                                                    </>
                                                :
                                                <></>
                                            }

                                            {/* Comentarios */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="comments">Comentarios adicionales</Label>
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

                                            <Button
                                                type="submit"
                                                onClick={handleFinalizarCompra}
                                                className="w-full text-center py-3 transition-all duration-300 hover:shadow-lg hover:bg-gray-600"
                                            >
                                                {loadingFinalizarCompra ? "Cargando..." : "Proceder al pago"}
                                            </Button>

                                        </div>
                                    </Card>

                                </div>
                            </div>
                        </>
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