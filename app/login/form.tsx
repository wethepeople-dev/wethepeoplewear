'use client'

import { FormEvent, use } from "react";
import { signIn } from "next-auth/react";
import { permanentRedirect, redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock } from 'lucide-react'
import Link from "next/link";
import { set } from "date-fns";

export default function Form() {

    const router = useRouter();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })

        console.log({ response });

        if (!response?.error) {
            setError(false)
            router.push('/admin')
        } else {
            setError(true)
        }
        setLoading(false);
    }

    return (
        <>
            <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center p-4">

                <Link
                    className="left-4 flex items-center mb-6 underline hover:no-underline hover:text-gray-600"
                    href={"/"}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Ir al Inicio
                </Link>

                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">

                    <div className="flex justify-center mb-6">
                        <Image src="/logos/icon.png" className="rounded-full" alt="Logo" width={90} height={90} />
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-6">
                        Admin
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            {/* <input id="email" name="email" className="border border-black" type="email" placeholder="Enter your email" required /> */}
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                required
                            />
                        </div>
                        <div className="space-y-2 pb-2">
                            <Label htmlFor="password">Password</Label>
                            {/* <input id="password" name="password" className="border border-black" type="password" placeholder="Enter your password" required /> */}
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                required
                            />
                        </div>
                        {error &&
                            <p className="text-sm text-red-500">
                                Credenciales incorrectas. Intenta de nuevo.
                            </p>
                        }
                        <Button type="submit" className="w-full bg-azulito-100 hover:bg-blue-400">
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}