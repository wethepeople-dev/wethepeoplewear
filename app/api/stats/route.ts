import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
    const client = await sql.connect();

    try {
        // 1. Total sales
        const totalSalesResult = await client.query(
            'SELECT COALESCE(SUM(final_price), 0) AS total_sales FROM orders'
        );
        const totalSales = totalSalesResult.rows[0].total_sales;

        // 2. Total clients
        const totalClientsResult = await client.query(
            'SELECT COUNT(*) AS total_clients FROM clients'
        );
        const totalClients = totalClientsResult.rows[0].total_clients;

        // 3. Total orders
        const totalOrdersResult = await client.query(
            'SELECT COUNT(*) AS total_orders FROM orders'
        );
        const totalOrders = totalOrdersResult.rows[0].total_orders;

        // 4. Total products sold
        const totalProductsSoldResult = await client.query(
            'SELECT COALESCE(SUM(quantity), 0) AS total_products_sold FROM order_items'
        );
        const totalProductsSold = totalProductsSoldResult.rows[0].total_products_sold;

        // 5. Top products (most sold products and their quantities)
        const topProductsResult = await client.query(
            `SELECT product_name, SUM(quantity) AS total_sold 
             FROM order_items 
             GROUP BY product_name 
             ORDER BY total_sold DESC 
             LIMIT 5`
        );
        const topProducts = topProductsResult.rows;

        // 6. Products sold by week
        const productsSoldByWeekResult = await client.query(
            `SELECT 
                DATE_TRUNC('week', o.created_at) AS week,
                COALESCE(SUM(oi.quantity), 0) AS products_sold
             FROM orders o
             JOIN order_items oi ON o.order_id = oi.order_id
             GROUP BY week
             ORDER BY week DESC
             LIMIT 10`
        );
        const productsSoldByWeek = productsSoldByWeekResult.rows;

        // Compile all stats into a single response object
        const statistics = {
            totalSales,
            totalClients,
            totalOrders,
            totalProductsSold,
            topProducts,
            productsSoldByWeek,
        };

        return NextResponse.json(statistics);
    } catch (err) {
        console.error('Error fetching site statistics:', err);
        return NextResponse.json(
            { error: 'Error fetching site statistics', message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
