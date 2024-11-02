import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
    const client = await sql.connect();

    try {
        // Total sales
        const totalSalesResult = await client.query(
            'SELECT COALESCE(SUM(final_price), 0) AS total_sales FROM orders'
        );
        const totalSales = totalSalesResult.rows[0].total_sales;

        // Total orders
        const totalOrdersResult = await client.query(
            'SELECT COUNT(*) AS total_orders FROM orders'
        );
        const totalOrders = totalOrdersResult.rows[0].total_orders;

        // Total products sold
        const totalProductsSoldResult = await client.query(
            'SELECT COALESCE(SUM(quantity), 0) AS total_products_sold FROM order_items'
        );
        const totalProductsSold = totalProductsSoldResult.rows[0].total_products_sold;

        // Products sold by day
        const productsSoldByDayResult = await client.query(
            `SELECT 
                o.order_id,
                o.client_id,
                o.final_price,
                o.created_at AT TIME ZONE 'America/Monterrey' AS created_at,
                oi.product_id,
                oi.quantity,
                oi.product_name,
                oi.variation_id
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            WHERE o.created_at >= CURRENT_DATE - INTERVAL '10 days'`
        );
        const productsSoldByDay = productsSoldByDayResult.rows;

        // Average Order Value
        const avgOrderValueResult = await client.query(
            'SELECT AVG(final_price) AS avg_order_value FROM orders'
        );
        const avgOrderValue = avgOrderValueResult.rows[0].avg_order_value || 0;

        // Fetching latest 5 sales
        const latestSalesResult = await client.query(
            `SELECT c.name, c.email, o.final_price 
             FROM orders o
             JOIN clients c ON o.client_id = c.client_id
             ORDER BY o.created_at DESC 
             LIMIT 5`
        );
        const latestSales = latestSalesResult.rows;

        // Monthly stats
        const monthlyStatsResult = await client.query(
            `SELECT 
                COALESCE(SUM(final_price), 0) AS total_revenue
             FROM orders
             WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'`
        );
        const totalRevenueMonthly = monthlyStatsResult.rows[0].total_revenue;

        const totalOrdersResultMonthly = await client.query(
            `SELECT 
                COUNT(DISTINCT order_id) AS total_orders
             FROM orders
             WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'`
        );
        const totalOrdersMonthly = totalOrdersResultMonthly.rows[0].total_orders;

        const totalProductsSoldResultMonthly = await client.query(
            `SELECT 
                COALESCE(SUM(oi.quantity), 0) AS total_products_sold
             FROM orders o
             JOIN order_items oi ON o.order_id = oi.order_id
             WHERE o.created_at >= CURRENT_DATE - INTERVAL '30 days'`
        );
        const totalProductsSoldMonthly = totalProductsSoldResultMonthly.rows[0].total_products_sold;

        // Combine results into an object
        const monthlyStats = {
            totalRevenueMonthly,
            totalOrdersMonthly,
            totalProductsSoldMonthly
        };

        // New Queries for Alerts
        // Orders with shipping status "processing"
        const processingOrdersResult = await client.query(
            `SELECT COUNT(*) AS processing_orders 
             FROM orders 
             WHERE shipping_status = 'processing'`
        );
        const processingOrders = processingOrdersResult.rows[0].processing_orders;

        // Orders with shipping status "delivered"
        const deliveredOrdersResult = await client.query(
            `SELECT COUNT(*) AS delivered_orders 
             FROM orders 
             WHERE shipping_status = 'delivered'`
        );
        const deliveredOrders = deliveredOrdersResult.rows[0].delivered_orders;

        // Product variations with 0 stock
        const outOfStockVariationsResult = await client.query(
            `SELECT COUNT(*) AS out_of_stock_variations 
             FROM product_variations 
             WHERE stock_qty = 0`
        );
        const outOfStockVariations = outOfStockVariationsResult.rows[0].out_of_stock_variations;

        // Products with 2 or less in stock
        const lowStockProductsResult = await client.query(
            `SELECT COUNT(*) AS low_stock_products 
             FROM product_variations 
             WHERE stock_qty <= 2`
        );
        const lowStockProducts = lowStockProductsResult.rows[0].low_stock_products;

        // Compile all stats into a single response object
        const statistics = {
            totalSales,
            totalOrders,
            totalProductsSold,
            productsSoldByDay,
            avgOrderValue,
            latestSales,
            monthlyStats: {
                totalRevenue: monthlyStats.totalRevenueMonthly,
                totalOrders: monthlyStats.totalOrdersMonthly,
                totalProductsSold: monthlyStats.totalProductsSoldMonthly,
            },
            alerts: {
                processingOrders,
                deliveredOrders,
                outOfStockVariations,
                lowStockProducts
            }
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
