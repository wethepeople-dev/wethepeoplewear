import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        // Query the database to fetch all discount codes
        const result = await sql`
            SELECT code_id, code, percentage, active, stripe_validated, created_at
            FROM discount_codes;
        `;

        // Check if any rows were returned
        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'No discount codes found' }, { status: 404 });
        }

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching discount codes:', error);
        return NextResponse.json({ error: 'Error fetching discount codes' }, { status: 500 });
    }
}
