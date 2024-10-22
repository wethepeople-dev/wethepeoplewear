import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const host = process.env.NEXT_PUBLIC_HOST;

// https://medium.com/@abilsavio/email-contact-form-using-nextjs-app-router-60c29fe70644
export async function POST(request: NextRequest) {
    const body = await request.json();

    const {
        session_id, // Sent from the frontend after Stripe payment
        // client info
        name,
        email,
        phone,
        addressLine,
        city,
        state,
        country = 'México',
        postalCode,
        // order info
        total,
        comments,
        discount,
        discountObject,
        // products
        products,
    } = body;

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    // Generate product list HTML
    const productListHTML = products.map((product: any) => `
        <li>
            <strong>${product.nombre}</strong><br>
            ${product.tamanio} - ${product.color}<br>
            ${product.cantidad} x ${product.precio}<br>
        </li>
    `).join('');

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: email, // Sending email to the client
        subject: `Confirmación de Pedido para ${name}`,
        text: `Hola ${name},\n\nGracias por tu pedido. Aquí están los detalles:\n\nTotal: $${total}\nDescuento: $${discount}\nMensaje: ${comments}\n\nProductos:\n${products.map((product: any) => `- ${product.nombre} (Tamaño: ${product.tamanio}, Cantidad: ${product.cantidad}, Precio: $${product.precio})`).join('\n')}\n\n¡Gracias por elegir nuestro servicio!`,
        html: `
            <p>Hola <strong>${name}</strong>,</p>
            <p>Gracias por tu pedido. Aquí están los detalles:</p>
            <ul>
                <li><strong>Total:</strong> $${total} MXN</li>
                <li><strong>Descuento:</strong> $${total * discount} MXN</li>
                <li><strong>Precio final:</strong> $${(total * (1 - discount))} MXN</li>
                <li><strong>Mensaje:</strong> ${comments}</li>
                <li><strong>Dirección de envío:</strong> ${addressLine}, ${city}, ${state}, ${postalCode}</li>
                <li><strong>Link de confirmación:</strong> <a href="${host}/success?session_id=${session_id}">${host}/success?session_id=${session_id}</a></li>
            </ul>
            <p><strong>Productos:</strong></p>
            <ul>
                ${productListHTML}
            </ul>
            <p>¡Gracias por elegirnos!</p>
        `,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Correo electrónico enviado');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Correo electrónico enviado' });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
