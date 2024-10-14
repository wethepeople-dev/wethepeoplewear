
import React from 'react';
import Link from 'next/link';
import { sendEmail } from '@/utils/send-email';
import { useForm } from 'react-hook-form';

export type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactForm() {

    const { register, handleSubmit } = useForm<FormData>();

    function onSubmit(data: FormData) {
        sendEmail(data);
    }

    return (
        <>
            {/* https://medium.com/@abilsavio/email-contact-form-using-nextjs-app-router-60c29fe70644 */}
            <form className="ml-auto space-y-4" onSubmit={handleSubmit(onSubmit)}>

                <input type='text' placeholder='Nombre'
                    className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
                    {...register('name', { required: true })}
                />

                <input type='email' placeholder='Email'
                    className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
                    {...register('email', { required: true })}
                />

                <input type='text' placeholder='Asunto'
                    className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
                    {...register('subject', { required: true })}
                />

                <textarea placeholder='Mensaje' rows={6}
                    className="w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-blue-500 focus:bg-transparent"
                    {...register('message', { required: true })}
                ></textarea>

                <button type='submit' className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6">
                    Enviar
                </button>

            </form>

        </>
    );
}