// /app/api/getAllOrders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
    const client = await sql.connect();

    try {
        // Fetch orders, clients, and item quantities per order
        const result = await client.query(`
            SELECT
                o.order_id,
                o.created_at,
                SUM(oi.quantity) AS product_quantity,
                o.final_price,
                o.shipping_status,
                o.shipping_method,
                o.completed,
                o.tracking_id,
                o.tracking_url,
                c.name,
                c.email,
                c.phone,
                c.address,
                c.municipio,
                c.city,
                c.postal_code,
                c.state,
                c.country
            FROM orders o
            LEFT JOIN order_items oi ON oi.order_id = o.order_id
            LEFT JOIN clients c ON c.client_id = o.client_id
            GROUP BY o.order_id, o.created_at, o.final_price, o.shipping_status, o.shipping_method, o.completed, o.tracking_id, o.tracking_url, c.name, c.email, c.phone, c.address, c.municipio, c.city, c.postal_code, c.state, c.country
            ORDER BY o.created_at DESC;
        `);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Error fetching orders', message: errorMessage },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
