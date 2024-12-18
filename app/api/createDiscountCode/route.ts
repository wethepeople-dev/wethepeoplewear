import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { code, percentage, duration = 'forever', active } = body;

        if (!code || !percentage) {
            return NextResponse.json({ error: 'Code and percentage are required.' }, { status: 400 });
        }

        // 1. Create the coupon on Stripe
        const stripeCoupon = await stripe.coupons.create({
            id: code, // Use provided code as Stripe's coupon ID
            percent_off: percentage,
            duration: duration, // Can be 'once', 'forever', or 'repeating'
        });

        // 2. Store the coupon in the database if Stripe creation succeeds
        await sql`
            INSERT INTO discount_codes (code, percentage, active, stripe_validated)
            VALUES (${code}, ${percentage}, ${active}, ${true})
            ON CONFLICT (code) DO NOTHING;
        `;

        return NextResponse.json({ success: true, message: 'Coupon created successfully.', stripeCoupon });
    } catch (error) {
        console.error('Error creating coupon:', error);
        return NextResponse.json({ error: 'Error creating coupon.' }, { status: 500 });
    }
}