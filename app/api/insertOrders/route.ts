import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const {
        session_id, // Sent from the frontend after Stripe payment
        // client info
        name,
        email,
        phone,
        addressLine,
        municipio,
        city,
        state,
        country = 'México',
        postalCode,
        // order info
        total,
        comments,
        discount,
        discountObject,
        shipping_method,
        shipping_cost,
        // products
        products,
    } = body;

    const client = await sql.connect();

    try {
        // Check if the session_id already exists in the orders table
        const existingOrder = await client.query(
            'SELECT * FROM orders WHERE session_id = $1',
            [session_id]
        );

        if (existingOrder.rows.length > 0) {
            const order = existingOrder.rows[0];

            // Fetch client info
            const clientResult = await client.query(
                'SELECT * FROM clients WHERE client_id = $1',
                [order.client_id]
            );
            const clientInfo = clientResult.rows[0];

            // Fetch order items
            const orderItemsResult = await client.query(
                'SELECT * FROM order_items WHERE order_id = $1',
                [order.order_id]
            );
            const orderItems = orderItemsResult.rows;

            return NextResponse.json({
                order,
                client: clientInfo,
                items: orderItems
            });
        }

        // Start transaction to ensure atomic operation
        await client.query('BEGIN');

        // Insert client info
        let clientId = '';
        if (shipping_method != 'collectif') {
            const clientResult = await client.query(
                `INSERT INTO clients (name, email, phone, address, city, state, postal_code, country, municipio) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                 RETURNING client_id`,
                [name, email, phone, addressLine, city, state, postalCode, country, municipio]
            );
            clientId = clientResult.rows[0].client_id;
        } else {
            const clientResult = await client.query(
                `INSERT INTO clients (name, email, phone) 
                 VALUES ($1, $2, $3) 
                 RETURNING client_id`,
                [name, email, phone]
            );
            clientId = clientResult.rows[0].client_id;
        }

        // Insert order info
        const orderResult = await client.query(
            `INSERT INTO orders 
             (client_id, total, discount_applied, final_price, discount_code_id, comments, session_id, shipping_status, shipping_cost, shipping_method, payment_status, completed) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
             RETURNING *`,
            [
                clientId,
                total,
                discount > 0,
                (total * (1 - discount)) + shipping_cost,
                discountObject?.code_id || null, // Handle discount object
                comments,
                session_id,
                'processing',
                shipping_cost,
                shipping_method,
                'paid',
                false
            ]
        );
        const order = orderResult.rows[0];

        // Insert order items and update stock quantities
        const orderItemsPromises = products.map(async (product: { nombre: string; id: string; variation_id: string; cantidad: number }) => {
            // Update the stock quantity for the variation
            await client.query(
                `UPDATE product_variations 
                 SET stock_qty = stock_qty - $1 
                 WHERE variation_id = $2 AND stock_qty >= $1`,
                [product.cantidad, product.variation_id]
            );

            // Insert the order item
            return client.query(
                `INSERT INTO order_items 
                 (order_id, product_name, product_id, variation_id, quantity) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [
                    order.order_id,
                    product.nombre,
                    product.id,
                    product.variation_id,
                    product.cantidad,
                ]
            );
        });
        await Promise.all(orderItemsPromises);

        // Fetch inserted order items
        const orderItemsResult = await client.query(
            'SELECT * FROM order_items WHERE order_id = $1',
            [order.order_id]
        );
        const orderItems = orderItemsResult.rows;

        // Commit transaction
        await client.query('COMMIT');

        return NextResponse.json({
            order,
            client: { client_id: clientId, name, email, phone, address: addressLine, city, state, postalCode, country, municipio },
            items: orderItems,
        });
    } catch (err) {
        // Rollback transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error processing order:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Error processing order', message: errorMessage },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
