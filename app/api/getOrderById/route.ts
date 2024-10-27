import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    const { order_id } = await req.json();

    const client = await sql.connect();

    try {
        // Fetch order information
        const orderResult = await client.query(
            'SELECT * FROM orders WHERE order_id = $1',
            [order_id]
        );

        if (orderResult.rows.length === 0) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }
        const order = orderResult.rows[0];

        // Fetch client information
        const clientResult = await client.query(
            'SELECT * FROM clients WHERE client_id = $1',
            [order.client_id]
        );
        const clientInfo = clientResult.rows[0];

        // Fetch order items
        const orderItemsResult = await client.query(
            'SELECT * FROM order_items WHERE order_id = $1',
            [order_id]
        );
        const orderItems = orderItemsResult.rows;

        // Fetch discount code if applied
        let discountCode = null;
        if (order.discount_code_id) {
            const discountCodeResult = await client.query(
                'SELECT * FROM discount_codes WHERE code_id = $1',
                [order.discount_code_id]
            );
            discountCode = discountCodeResult.rows[0];
        }

        return NextResponse.json({
            order,
            client: clientInfo,
            items: orderItems,
            discountCode: discountCode || null,
        });
    } catch (err) {
        console.error('Error fetching order information:', err);
        return NextResponse.json(
            { error: 'Error fetching order information' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
