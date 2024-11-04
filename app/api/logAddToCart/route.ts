import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { product_id, size, color, quantity, variation_id } = body;

    // Validate required fields
    if (!product_id || !size || !color || !quantity) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await sql.connect();

    try {
        // Insert a log entry for adding a product to the cart
        await client.query(
            `INSERT INTO logs (action_type, entity_id, product_size, product_color, quantity, variation_id, timestamp)
             VALUES ('add_to_cart', $1, $2, $3, $4, $5, CURRENT_TIMESTAMP)`,
            [product_id, size, color, quantity, variation_id || null]
        );

        return NextResponse.json({ message: 'Product added to cart log created successfully' });
    } catch (err) {
        console.error('Error logging add to cart:', err);
        return NextResponse.json({ error: 'Failed to log add to cart action' }, { status: 500 });
    } finally {
        client.release();
    }
}
