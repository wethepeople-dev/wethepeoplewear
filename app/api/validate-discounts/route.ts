// app/api/validate-discounts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    try {
        // Parse the body to get the discount code
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Discount code is required' }, { status: 400 });
        }

        // Get the free shipping code from environment variables
        const freeShippingCode = process.env.FREE_SHIPPING_CODE;

        // Check if the environment variable exists and if it matches the submitted code
        if (freeShippingCode && code.toUpperCase() === freeShippingCode.toUpperCase()) {
            return NextResponse.json({
                code_id: 'free-shipping-special',
                code: freeShippingCode,
                percentage: 0,
                active: true,
                stripe_validated: false,
                created_at: new Date().toISOString(),
                is_free_shipping: true
            });
        }

        // Query the database to find the discount code
        const result = await sql`
            SELECT code_id, code, percentage, active, stripe_validated, created_at
            FROM discount_codes
            WHERE code = ${code};
        `;

        // Check if the discount code exists
        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Discount code not found' }, { status: 404 });
        }

        // Add is_free_shipping: false to normal discount codes
        return NextResponse.json({
            ...result.rows[0],
            is_free_shipping: false
        });
    } catch (error) {
        console.error('Error validating discount code:', error);
        return NextResponse.json({ error: 'Error validating discount code' }, { status: 500 });
    }
}