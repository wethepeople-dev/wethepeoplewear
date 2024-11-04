import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { product_id } = body;

    // Validar la entrada
    if (!product_id) {
        return NextResponse.json({ error: 'product_id es requerido' }, { status: 400 });
    }

    const client = await sql.connect();

    try {
        // Insertar una nueva entrada en la tabla de logs para una vista de producto
        await client.query(
            `INSERT INTO logs (action_type, entity_id, timestamp) 
             VALUES ('product_view', $1, CURRENT_TIMESTAMP)`,
            [product_id]
        );

        return NextResponse.json({ message: 'Log de vista de producto registrado' });
    } catch (err) {
        console.error('Error al registrar log de vista de producto:', err);
        return NextResponse.json({ error: 'Error al registrar log' }, { status: 500 });
    } finally {
        client.release();
    }
}
