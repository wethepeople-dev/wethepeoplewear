// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Fetch the product and variations
        const productResult = await sql`
            SELECT * FROM products WHERE product_id = ${id}
        `;

        const variationsResult = await sql`
            SELECT * FROM product_variations WHERE product_id = ${id}
        `;

        if (productResult.rowCount === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const product = productResult.rows[0];
        const variations = variationsResult.rows;

        // Sort variations based on color order from product's colores
        const colorOrder = product.colores;
        const sortedVariations = variations.sort((a, b) => {
            return colorOrder.indexOf(a.color) - colorOrder.indexOf(b.color);
        });

        // Return product data with sorted variations
        return NextResponse.json({
            ...product,
            variations: sortedVariations
        });

    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }
}
