import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { changes } = body;

    // Validate input
    if (!Array.isArray(changes) || changes.length === 0) {
        return NextResponse.json({ error: 'Invalid or empty changes array' }, { status: 400 });
    }

    const client = await sql.connect();

    try {
        // Prepare SQL query to update multiple rows
        const query = `
            UPDATE products 
            SET active = data.active::BOOLEAN, updated_at = CURRENT_TIMESTAMP 
            FROM (VALUES 
                ${changes
                .map((_, index) => `($${index * 2 + 1}::UUID, $${index * 2 + 2}::BOOLEAN)`)
                .join(', ')}
            ) AS data(product_id, active)
            WHERE products.product_id = data.product_id
        `;

        // Flatten the changes array to pass as parameters
        const params = changes.flatMap((change) => [change.product_id, change.active]);

        // Execute the query
        const result = await client.query(query, params);

        return NextResponse.json({
            message: 'Products updated successfully',
            updatedCount: result.rowCount,
        });
    } catch (err) {
        console.error('Error updating products:', err);
        return NextResponse.json({ error: 'Failed to update products' }, { status: 500 });
    } finally {
        client.release();
    }
}
