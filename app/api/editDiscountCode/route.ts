import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function PATCH(req: NextRequest) {
    try {
        // Parse request body
        const { code, active } = await req.json();

        // Input validation
        if (typeof code !== 'string' || typeof active !== 'boolean') {
            return NextResponse.json(
                { error: "Invalid input. 'code' must be a string and 'active' a boolean." },
                { status: 400 }
            );
        }

        // Update the 'active' field in the database
        const result = await sql`
            UPDATE discount_codes
            SET active = ${active}
            WHERE code = ${code}
            RETURNING code, active;
        `;

        // Check if the discount code exists
        if (result.rowCount === 0) {
            return NextResponse.json(
                { error: 'Discount code not found.' },
                { status: 404 }
            );
        }

        // Respond with the updated discount code
        return NextResponse.json({
            message: 'Discount code updated successfully.',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error updating discount code:', error);
        return NextResponse.json(
            { error: 'Failed to update the discount code.' },
            { status: 500 }
        );
    }
}
