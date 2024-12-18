import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        // Parse the body to get the code_id
        const { code_id } = await req.json();

        if (!code_id) {
            return NextResponse.json({ error: 'code_id is required' }, { status: 400 });
        }

        // Query the database to find the discount by code_id
        const result = await sql`
            SELECT code_id, code, percentage, active, stripe_validated, created_at
            FROM discount_codes
            WHERE code_id = ${code_id};
        `;

        // Check if the discount code exists
        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Discount code not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Error validating discount code:', error);
        return NextResponse.json({ error: 'Error validating discount code' }, { status: 500 });
    }
}
