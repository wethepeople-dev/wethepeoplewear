// app/api/updateOrder.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { DeliveryStatusEmail } from '@/components/emails/DeliveryStatusEmail';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { render } from '@react-email/render';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { orderId, status, trackingId, trackingUrl, completed } = body;

    // Validate the orderId
    if (!orderId) {
        return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const client = await sql.connect();

    try {
        // Build dynamic query based on provided fields
        const fields: string[] = [];
        const values: any[] = [];
        let index = 1;

        if (status !== undefined) {
            fields.push(`shipping_status = $${index}`);
            values.push(status);
            index++;
        }
        if (trackingId !== undefined) {
            fields.push(`tracking_id = $${index}`);
            values.push(trackingId);
            index++;
        }
        if (trackingUrl !== undefined) {
            fields.push(`tracking_url = $${index}`);
            values.push(trackingUrl);
            index++;
        }
        if (completed !== undefined) {
            fields.push(`completed = $${index}`);
            values.push(completed);
            index++;
        }

        // If no fields to update, return an error
        if (fields.length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        values.push(orderId); // Add orderId as the last value

        const result = await client.query(
            `UPDATE orders 
             SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
             WHERE order_id = $${index} 
             RETURNING *`,
            values
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        const updatedOrder = result.rows[0];

        // Check if the email should be sent based on the specified conditions
        const { shipping_method, shipping_status, tracking_url, delivery_email_sent } = updatedOrder;

        const shouldSendEmail =
            !delivery_email_sent && // delivery_email_sent must be false
            ((shipping_method === 'local' || shipping_method === 'nacional')
                ? shipping_status === 'delivered' && tracking_url !== null // local/nacional requires delivered status and a tracking URL
                : shipping_method === 'collectif' && shipping_status === 'delivered'); // collectif only requires delivered status

        if (shouldSendEmail) {
            // Email sending logic here

            // Fetch client information
            const clientResult = await client.query(
                'SELECT * FROM clients WHERE client_id = $1',
                [updatedOrder.client_id]
            );
            const clientInfo = clientResult.rows[0];

            // Fetch order items
            const orderItemsResult = await client.query(
                'SELECT * FROM order_items WHERE order_id = $1',
                [updatedOrder.order_id]
            );
            const orderItems = orderItemsResult.rows;

            // Fetch discount code if applied
            let discountCode = null;
            if (updatedOrder.discount_code_id) {
                const discountCodeResult = await client.query(
                    'SELECT * FROM discount_codes WHERE code_id = $1',
                    [updatedOrder.discount_code_id]
                );
                discountCode = discountCodeResult.rows[0];
            }

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MY_EMAIL,
                    pass: process.env.MY_PASSWORD,
                },
            });

            const formattedOrderItems = [];

            for (const item of orderItems) {
                // Fetch product variation details from the database
                const variationResult = await sql`
                    SELECT talla, color, precio
                    FROM product_variations
                    WHERE variation_id = ${item.variation_id}
                `;

                const variation = variationResult.rows[0];
                if (variation) {
                    // Create formatted object and push it to the result list
                    formattedOrderItems.push({
                        nombre: item.product_name,
                        tamanio: variation.talla,
                        color: variation.color,
                        cantidad: item.quantity,
                        precio: parseFloat(variation.precio),
                    });
                } else {
                    console.warn(`Variation not found for ID: ${item.variation_id}`);
                }
            }


            // Render the email template to HTML
            const emailHTML = await render(
                DeliveryStatusEmail({
                    // client
                    name: clientInfo.name,
                    addressLine: clientInfo.address,
                    municipio: clientInfo.municipio,
                    city: clientInfo.city,
                    state: clientInfo.state,
                    postalCode: clientInfo.postal_code,
                    // order
                    total: updatedOrder.total,
                    discount: discountCode ? discountCode.discount : 0,
                    comments: updatedOrder.comments,
                    tracking_url: trackingUrl,
                    shipping_method,
                    shipping_cost: updatedOrder.shipping_cost,
                    shipping_status,
                    session_id: updatedOrder.session_id,
                    // products
                    products: formattedOrderItems,
                    // other
                    host: process.env.NEXT_PUBLIC_HOST,
                })
            );

            // Now assign the rendered HTML to the mailOptions
            const mailOptions: Mail.Options = {
                from: process.env.MY_EMAIL,
                to: clientInfo.email, // Sending email to the client
                subject: `Notificación de entrega`,
                html: emailHTML, // Make sure this is now a string, not a Promise
            };


            try {
                console.log('Sending email to', clientInfo.email);
                await transport.sendMail(mailOptions);

                // Update delivery_email_sent to true after sending the email
                const resultUpdateEmail = await client.query(
                    `UPDATE orders 
                     SET delivery_email_sent = TRUE, updated_at = CURRENT_TIMESTAMP 
                     WHERE order_id = $1`,
                    [orderId]
                );

                if (resultUpdateEmail.rowCount === 0) {
                    console.error('Failed to update delivery_email_sent');
                } else {
                    console.log('delivery_email_sent updated successfully');
                }

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

        return NextResponse.json({ message: 'Order updated successfully', order: result.rows[0] });
    } catch (err) {
        console.error('Error updating order:', err);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    } finally {
        client.release();
    }
}
