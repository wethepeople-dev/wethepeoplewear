// app/api/updateOrder.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { orderId, status, trackingId, trackingUrl, completed } = body;

    // Validate the orderId
    if (!orderId) {
        return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const client = await sql.connect();

    try {
        // Build dynamic query based on provided fields
        const fields: string[] = [];
        const values: any[] = [];
        let index = 1;

        if (status !== undefined) {
            fields.push(`shipping_status = $${index}`);
            values.push(status);
            index++;
        }
        if (trackingId !== undefined) {
            fields.push(`tracking_id = $${index}`);
            values.push(trackingId);
            index++;
        }
        if (trackingUrl !== undefined) {
            fields.push(`tracking_url = $${index}`);
            values.push(trackingUrl);
            index++;
        }
        if (completed !== undefined) {
            fields.push(`completed = $${index}`);
            values.push(completed);
            index++;
        }

        // If no fields to update, return an error
        if (fields.length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        values.push(orderId); // Add orderId as the last value

        const result = await client.query(
            `UPDATE orders 
             SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
             WHERE order_id = $${index} 
             RETURNING *`,
            values
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order updated successfully', order: result.rows[0] });
    } catch (err) {
        console.error('Error updating order:', err);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    } finally {
        client.release();
    }
}
