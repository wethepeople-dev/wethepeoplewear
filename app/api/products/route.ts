import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

interface ProductVariation {
    variation_id: string; // UUID
    product_id: string; // UUID
    color: string;
    talla: string;
    precio: number;
    fotos: string[]; // Adjust based on your structure
    stock_qty: number;
}

interface Product {
    product_id: string; // UUID
    name: string;
    description: string;
    colores: string[];
    category_id: string;
    tallas: string[];
    release_date: string; // or Date
    variations: ProductVariation[]; // Include variations
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const result = await sql`
            SELECT p.product_id, p.name, p.description, p.colores, p.tallas, p.release_date, p.category_id,
                   pv.variation_id, pv.color, pv.talla, pv.precio, pv.fotos, pv.stock_qty
            FROM products p
            LEFT JOIN product_variations pv ON p.product_id = pv.product_id;
        `;

        const products: Product[] = [];
        const rows = result.rows;

        // Group variations by product
        rows.forEach(row => {
            const { variation_id, ...productData } = row;

            // Create a ProductVariation object
            const variation: ProductVariation = {
                variation_id,
                product_id: row.product_id, // Ensure product_id is included
                color: row.color,
                talla: row.talla,
                precio: row.precio,
                fotos: row.fotos,
                stock_qty: row.stock_qty,
            };

            // Check if product already exists
            const existingProduct = products.find(p => p.product_id === productData.product_id);
            if (existingProduct) {
                existingProduct.variations.push(variation); // Push the variation to the existing product
            } else {
                // Construct the new Product object with all required fields
                const newProduct: Product = {
                    product_id: productData.product_id,
                    name: productData.name,
                    description: productData.description,
                    category_id: productData.category_id,
                    colores: productData.colores,
                    tallas: productData.tallas,
                    release_date: productData.release_date,
                    variations: [variation], // Start the variations array with the current variation
                };
                products.push(newProduct); // Add the new product to the list
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}
