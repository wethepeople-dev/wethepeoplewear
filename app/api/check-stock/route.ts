import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
    const { variation_id, product_id } = await req.json();

    try {
        // Query the product_variations table for stock_qty
        const variationResult = await sql`
            SELECT stock_qty, product_id FROM product_variations WHERE variation_id = ${variation_id}
        `;

        if (variationResult.rows.length === 0) {
            return NextResponse.json({ error: 'Variation not found' }, { status: 404 });
        }

        const { stock_qty } = variationResult.rows[0];

        // Query the products table for active status
        const productResult = await sql`
            SELECT active FROM products WHERE product_id = ${product_id}
        `;

        if (productResult.rows.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const { active } = productResult.rows[0];

        // Return the combined result
        return NextResponse.json({ stock_qty, active });
    } catch (err) {
        console.error('Error checking stock or product status:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}