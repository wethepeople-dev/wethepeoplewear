import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { render } from '@react-email/render';
import { ConfirmationEmail } from '@/components/emails/ConfirmationEmail';
const host = process.env.NEXT_PUBLIC_HOST;

export async function POST(request: NextRequest) {
    const body = await request.json();

    const {
        session_id,
        name,
        email,
        phone,
        addressLine,
        city,
        state,
        country = 'México',
        postalCode,
        total,
        comments,
        discount,
        discountObject,
        products,
    } = body;

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    console.log('rendering email template');


    // Render the email template to HTML
    const emailHTML = await render(
        ConfirmationEmail({
            name,
            total,
            discount,
            comments,
            addressLine,
            city,
            state,
            postalCode,
            session_id,
            host,
            products,
        })
    );

    console.log('assigning mail options');

    // Now assign the rendered HTML to the mailOptions
    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: email, // Sending email to the client
        subject: `Confirmación de Pedido para ${name}`,
        html: emailHTML, // Make sure this is now a string, not a Promise
        attachments: [
            {
                filename: 'LOGO_BLANCO.png',
                path: './public/logos/icon.png', // Path to your logo
                cid: 'logo', // Same CID referenced in the HTML
            },
        ],
    };


    try {
        console.log('Sending email to', email);
        await transport.sendMail(mailOptions);
        return NextResponse.json({ message: 'Correo electrónico enviado' });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error sending email:', err);
            return NextResponse.json({ error: err.message }, { status: 500 });
        } else {
            console.error('Unknown error:', err);
            return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
        }
    }
}
