import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
    const { variation_id } = await req.json();

    try {
        const result = await sql`
            SELECT stock_qty FROM product_variations WHERE variation_id = ${variation_id}
        `;

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Variation not found' }, { status: 404 });
        }

        const { stock_qty } = result.rows[0];
        return NextResponse.json({ stock_qty });
    } catch (err) {
        console.error('Error checking stock:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
