import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

        // 5. Top products
        const topProductsResult = await client.query(
            `SELECT product_name, SUM(quantity) AS total_sold 
             FROM order_items 
             GROUP BY product_name 
             ORDER BY total_sold DESC 
             LIMIT 5`
        );
        const topProducts = topProductsResult.rows;

        // 6. Products sold by day
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
            WHERE o.created_at >= CURRENT_DATE - INTERVAL '7 days'`
        );
        const productsSoldByDay = productsSoldByDayResult.rows;

        // 7. Average Order Value
        const avgOrderValueResult = await client.query(
            'SELECT AVG(final_price) AS avg_order_value FROM orders'
        );
        const avgOrderValue = avgOrderValueResult.rows[0].avg_order_value || 0;

        // 8. Discount Usage Trends
        const discountUsageResult = await client.query(
            `SELECT 
                COUNT(CASE WHEN discount_applied = true THEN 1 END) AS with_discount,
                COUNT(CASE WHEN discount_applied = false THEN 1 END) AS without_discount
             FROM orders`
        );
        const discountUsage = discountUsageResult.rows[0];

        // 9. Top States by Sales
        const topStatesResult = await client.query(
            `SELECT c.state, COUNT(o.order_id) AS order_count
             FROM clients c
             JOIN orders o ON c.client_id = o.client_id
             GROUP BY c.state
             ORDER BY order_count DESC`
        );
        const topStates = topStatesResult.rows;

        // 10. Customer Acquisition Over Time
        const customerAcquisitionResult = await client.query(
            `SELECT DATE_TRUNC('month', created_at) AS month, COUNT(client_id) AS new_clients
             FROM clients
             GROUP BY month
             ORDER BY month`
        );
        const customerAcquisition = customerAcquisitionResult.rows;

        // 11. Top Purchasing Times
        const purchasingTimesResult = await client.query(
            `SELECT DATE_PART('hour', created_at) AS hour, COUNT(order_id) AS order_count
             FROM orders
             GROUP BY hour
             ORDER BY order_count DESC`
        );
        const purchasingTimes = purchasingTimesResult.rows;

        // 12. Best-Selling Variations
        const bestSellingVariationsResult = await client.query(
            `SELECT pv.color, pv.talla, SUM(oi.quantity) AS total_sold
             FROM order_items oi
             JOIN product_variations pv ON oi.variation_id = pv.variation_id
             GROUP BY pv.color, pv.talla
             ORDER BY total_sold DESC`
        );
        const bestSellingVariations = bestSellingVariationsResult.rows;

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
             WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'`
        );
        const totalProductsSoldMonthly = totalProductsSoldResultMonthly.rows[0].total_products_sold;

        // Combine results into an object
        const monthlyStats = {
            totalRevenueMonthly,
            totalOrdersMonthly,
            totalProductsSoldMonthly
        };


        // Compile all stats into a single response object
        const statistics = {
            totalSales,
            totalClients,
            totalOrders,
            totalProductsSold,
            topProducts,
            productsSoldByDay,
            avgOrderValue,
            discountUsage,
            topStates,
            customerAcquisition,
            purchasingTimes,
            bestSellingVariations,
            latestSales,
            monthlyStats: {
                totalRevenue: monthlyStats.totalRevenueMonthly,
                totalOrders: monthlyStats.totalOrdersMonthly,
                totalProductsSold: monthlyStats.totalProductsSoldMonthly,
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
