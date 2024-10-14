
import React, { useState } from 'react';
import { sendEmail } from '@/utils/send-email';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [emailSuccess, setEmailSuccess] = useState<boolean>(false);

    async function onSubmit(data: FormData) {
        setServerMessage(null);
        try {
            const response = await sendEmail(data);
            setServerMessage(response.message);
            setEmailSuccess(true);
        } catch (err: any) {
            setServerMessage(`Error: ${err.message}`);
            setEmailSuccess(false);
        }
    }

    return (
        <>
            {emailSuccess ?
                <>
                    <Alert variant="default" className="bg-green-50 border-green-200 max-w-md mx-auto">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <CheckCircle className="h-16 w-16 text-green-500" strokeWidth={1.5} />
                            <div className="space-y-2">
                                <AlertTitle className="text-2xl font-semibold text-green-800">Mensaje enviado!</AlertTitle>
                                <AlertDescription className="text-green-600">
                                    Gracias por tu mensaje. Nos pondremos en contacto contigo lo antes posible.
                                </AlertDescription>
                            </div>
                        </div>
                    </Alert>
                </>
                :
                <>
                    {/* https://medium.com/@abilsavio/email-contact-form-using-nextjs-app-router-60c29fe70644 */}
                    <form className="ml-auto space-y-4" onSubmit={handleSubmit(onSubmit)}>

                        <input type='text' placeholder='Nombre'
                            className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent ${errors.name ? 'border-red-500' : ''}`}
                            {...register('name', { required: 'El nombre es requerido' })}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

                        <input type='email' placeholder='Email'
                            className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent ${errors.email ? 'border-red-500' : ''}`}
                            {...register('email', {
                                required: 'El email es requerido',
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: 'El email no es válido'
                                }
                            })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                        <input type='text' placeholder='Asunto'
                            className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent ${errors.subject ? 'border-red-500' : ''}`}
                            {...register('subject', { required: 'El asunto es requerido' })}
                        />
                        {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}

                        <textarea placeholder='Mensaje' rows={6}
                            className={`w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-blue-500 focus:bg-transparent ${errors.message ? 'border-red-500' : ''}`}
                            {...register('message', { required: 'El mensaje es requerido' })}
                        ></textarea>
                        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}

                        <button type='submit' className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </button>

                        {/* Server success or error message */}
                        {serverMessage && <Alert variant="default" className="bg-green-50 border-green-200 max-w-md mx-auto">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <CheckCircle className="h-16 w-16 text-green-500" strokeWidth={1.5} />
                                <div className="space-y-2">
                                    <AlertTitle className="text-2xl font-semibold text-green-800">Mensaje enviado!</AlertTitle>
                                    <AlertDescription className="text-green-600">
                                        Gracias por tu mensaje. Nos pondremos en contacto contigo lo antes posible.
                                    </AlertDescription>
                                </div>
                            </div>
                        </Alert>}

                    </form>
                </>
            }

        </>
    );
}