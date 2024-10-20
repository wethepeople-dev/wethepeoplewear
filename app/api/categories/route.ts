import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const result = await sql`
            SELECT * FROM categories;
        `;

        return NextResponse.json(result.rows); // Assuming you're using a structure like { rows: [...] }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}
