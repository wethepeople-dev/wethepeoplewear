// app/api/updateProductVariation.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { variation_id, stock, price } = body;

    // Validate input
    if (!variation_id || stock === undefined || price === undefined) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await sql.connect();

    try {
        // Update stock and price for the given variation_id
        const result = await client.query(
            `UPDATE product_variations 
             SET stock_qty = $1, precio = $2, updated_at = CURRENT_TIMESTAMP 
             WHERE variation_id = $3 
             RETURNING *`,
            [stock, price, variation_id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Variation not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product variation updated successfully', variation: result.rows[0] });
    } catch (err) {
        console.error('Error updating product variation:', err);
        return NextResponse.json({ error: 'Failed to update product variation' }, { status: 500 });
    } finally {
        client.release();
    }
}
