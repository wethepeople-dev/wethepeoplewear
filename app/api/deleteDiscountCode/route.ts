import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { code } = body;

        if (!code) {
            return NextResponse.json({ error: 'Code is required.' }, { status: 400 });
        }

        // 1. Delete the coupon from Stripe
        const responseStripe = await stripe.coupons.del(code);

        // 2. Delete the coupon from the database
        const result = await sql`
            DELETE FROM discount_codes
            WHERE code = ${code};
        `;

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Coupon not found in the database.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Coupon deleted successfully.' });
    } catch (error) {
        console.error('Error deleting coupon:', error);
        return NextResponse.json({ error: 'Error deleting coupon.' }, { status: 500 });
    }
}
