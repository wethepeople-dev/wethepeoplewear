import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const result = await sql`
            SELECT * FROM categories;
        `;

        console.log('fetched categories:', result.rows);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}
