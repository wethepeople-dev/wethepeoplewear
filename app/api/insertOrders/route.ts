// app/api/insertOrders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

interface Product {
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    tamanio: string;
    color: string;
    variation_id: string;
}

interface DiscountObject {
    code_id: string;
    code: string;
    percentage: number;
    active: boolean;
    stripe_validated: boolean;
    created_at: string;
}

interface RequestBody {
    session_id: string;
    // client info
    name: string;
    email: string;
    phone: string;
    addressLine: string;
    municipio: string;
    city: string;
    state: string;
    country?: string;
    postalCode: string;
    // order info
    total: number;
    comments: string;
    discount: number;
    discountObject: DiscountObject | null;
    shipping_method: string;
    shipping_cost: number;
    // promotion info
    promotionApplied?: boolean;
    promotionDetails?: any;
    // products
    products: Product[];
}

// Helper function to calculate 3x999 promotion (same logic as frontend)
const calculate3x999Promotion = (products: Product[]): { total: number; promotionApplied: boolean } => {
    const PROMOTION_ACTIVE = true; // Should match frontend setting
    const PROMOTION_PRICE = 999;
    const PROMOTION_QUANTITY = 3;

    // Calculate total quantity of items
    const totalQuantity = products.reduce((sum, item) => sum + item.cantidad, 0);

    if (!PROMOTION_ACTIVE || totalQuantity < PROMOTION_QUANTITY) {
        const originalTotal = products.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        return {
            total: originalTotal,
            promotionApplied: false
        };
    }

    // Create array of all individual items with their prices
    const allItems: Array<Product & { individualPrice: number }> = [];
    for (const item of products) {
        for (let i = 0; i < item.cantidad; i++) {
            allItems.push({
                ...item,
                individualPrice: Number(item.precio)
            });
        }
    }

    // Sort by price (cheapest first)
    allItems.sort((a, b) => a.individualPrice - b.individualPrice);

    // Take the 3 cheapest items for promotion
    const promotionItems = allItems.slice(0, PROMOTION_QUANTITY);
    const remainingItems = allItems.slice(PROMOTION_QUANTITY);

    // Calculate totals
    const remainingTotal = remainingItems.reduce((sum, item) => sum + item.individualPrice, 0);
    const finalTotal = PROMOTION_PRICE + remainingTotal;

    return {
        total: finalTotal,
        promotionApplied: true
    };
};

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: RequestBody = await req.json();

    const {
        session_id,
        // client info
        name,
        email,
        phone,
        addressLine,
        municipio,
        city,
        state,
        country = 'México',
        postalCode,
        // order info
        total: originalTotal,
        comments,
        discount,
        discountObject,
        shipping_method,
        shipping_cost,
        // promotion info
        promotionApplied,
        promotionDetails,
        // products
        products,
    } = body;

    const client = await sql.connect();

    try {
        // Check if the session_id already exists in the orders table
        const existingOrder = await client.query(
            'SELECT * FROM orders WHERE session_id = $1',
            [session_id]
        );

        if (existingOrder.rows.length > 0) {
            const order = existingOrder.rows[0];

            // Fetch client info
            const clientResult = await client.query(
                'SELECT * FROM clients WHERE client_id = $1',
                [order.client_id]
            );
            const clientInfo = clientResult.rows[0];

            // Fetch order items
            const orderItemsResult = await client.query(
                'SELECT * FROM order_items WHERE order_id = $1',
                [order.order_id]
            );
            const orderItems = orderItemsResult.rows;

            return NextResponse.json({
                order,
                client: clientInfo,
                items: orderItems
            });
        }

        // Calculate the correct total (with promotion if applicable)
        const calculatedPromotion = calculate3x999Promotion(products);
        const actualTotal = calculatedPromotion.total;
        const actualPromotionApplied = calculatedPromotion.promotionApplied;

        // Start transaction to ensure atomic operation
        await client.query('BEGIN');

        // Insert client info
        let clientId = '';
        if (shipping_method !== 'collectif') {
            const clientResult = await client.query(
                `INSERT INTO clients (name, email, phone, address, city, state, postal_code, country, municipio) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                 RETURNING client_id`,
                [name, email, phone, addressLine, city, state, postalCode, country, municipio]
            );
            clientId = clientResult.rows[0].client_id;
        } else {
            const clientResult = await client.query(
                `INSERT INTO clients (name, email, phone) 
                 VALUES ($1, $2, $3) 
                 RETURNING client_id`,
                [name, email, phone]
            );
            clientId = clientResult.rows[0].client_id;
        }

        // Calculate final price
        let finalPrice: number;
        if (actualPromotionApplied) {
            // If promotion is applied, discount codes are not applicable
            finalPrice = actualTotal + shipping_cost;
        } else {
            // Apply discount code if no promotion
            finalPrice = (actualTotal * (1 - discount)) + shipping_cost;
        }

        // Insert order info
        const orderResult = await client.query(
            `INSERT INTO orders 
             (client_id, total, discount_applied, final_price, discount_code_id, comments, session_id, shipping_status, shipping_cost, shipping_method, payment_status, completed) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
             RETURNING *`,
            [
                clientId,
                actualTotal, // Use calculated total with promotion
                actualPromotionApplied ? false : discount > 0, // Don't mark discount as applied if promotion is active
                finalPrice,
                actualPromotionApplied ? null : (discountObject?.code_id || null), // No discount code if promotion applied
                comments,
                session_id,
                'processing',
                shipping_cost,
                shipping_method,
                'paid',
                false
            ]
        );
        const order = orderResult.rows[0];

        // Insert order items and update stock quantities
        const orderItemsPromises = products.map(async (product: Product) => {
            // Update the stock quantity for the variation
            await client.query(
                `UPDATE product_variations 
                 SET stock_qty = stock_qty - $1 
                 WHERE variation_id = $2 AND stock_qty >= $1`,
                [product.cantidad, product.variation_id]
            );

            // Insert the order item
            return client.query(
                `INSERT INTO order_items 
                 (order_id, product_name, product_id, variation_id, quantity) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [
                    order.order_id,
                    product.nombre,
                    product.id,
                    product.variation_id,
                    product.cantidad,
                ]
            );
        });
        await Promise.all(orderItemsPromises);

        // Fetch inserted order items
        const orderItemsResult = await client.query(
            'SELECT * FROM order_items WHERE order_id = $1',
            [order.order_id]
        );
        const orderItems = orderItemsResult.rows;

        // Commit transaction
        await client.query('COMMIT');

        return NextResponse.json({
            order,
            client: {
                client_id: clientId,
                name,
                email,
                phone,
                address: addressLine,
                city,
                state,
                postal_code: postalCode,
                country,
                municipio
            },
            items: orderItems,
        });
    } catch (err) {
        // Rollback transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error processing order:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Error processing order', message: errorMessage },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}