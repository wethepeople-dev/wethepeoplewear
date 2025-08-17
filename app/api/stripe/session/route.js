// app/api/stripe/session/route.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const host = process.env.NEXT_PUBLIC_HOST;

// Helper function to calculate 3x999 promotion (same logic as frontend)
const calculate3x999Promotion = (products) => {
    const PROMOTION_ACTIVE = true; // Should match frontend setting
    const PROMOTION_PRICE = 999;
    const PROMOTION_QUANTITY = 3;

    // Calculate total quantity of items
    const totalQuantity = products.reduce((sum, item) => sum + item.cantidad, 0);

    if (!PROMOTION_ACTIVE || totalQuantity < PROMOTION_QUANTITY) {
        return {
            promotionApplied: false,
            stripeProducts: products.map((product) => ({
                price_data: {
                    currency: "mxn",
                    product_data: {
                        name: product.nombre + ' (' + product.color + ')' + " - " + product.tamanio,
                    },
                    unit_amount: product.precio * 100,
                },
                quantity: product.cantidad,
            }))
        };
    }

    // Create array of all individual items with their prices
    const allItems = [];
    for (const item of products) {
        for (let i = 0; i < item.cantidad; i++) {
            allItems.push({
                ...item,
                individualPrice: Number(item.precio),
                originalIndex: allItems.length
            });
        }
    }

    // Sort by price (cheapest first)
    allItems.sort((a, b) => a.individualPrice - b.individualPrice);

    // Take the 3 cheapest items for promotion
    const promotionItems = allItems.slice(0, PROMOTION_QUANTITY);
    const remainingItems = allItems.slice(PROMOTION_QUANTITY);

    // Create Stripe line items
    const stripeProducts = [];

    // Add promotion bundle as a single line item
    if (promotionItems.length === PROMOTION_QUANTITY) {
        // Create description of the 3 promotional items
        const promotionDescription = promotionItems.map(item =>
            `${item.nombre} (${item.color}) - ${item.tamanio}`
        ).join(', ');

        stripeProducts.push({
            price_data: {
                currency: "mxn",
                product_data: {
                    name: "PROMOCIÓN 3x$999",
                    description: `Incluye: ${promotionDescription}`,
                },
                unit_amount: PROMOTION_PRICE * 100,
            },
            quantity: 1,
        });
    }

    // Add remaining items at regular price
    if (remainingItems.length > 0) {
        // Group remaining items by product details for Stripe
        const remainingGrouped = {};

        remainingItems.forEach(item => {
            const key = `${item.nombre}-${item.color}-${item.tamanio}-${item.precio}`;
            if (!remainingGrouped[key]) {
                remainingGrouped[key] = {
                    ...item,
                    quantity: 0
                };
            }
            remainingGrouped[key].quantity++;
        });

        // Convert grouped items to Stripe format
        Object.values(remainingGrouped).forEach(item => {
            stripeProducts.push({
                price_data: {
                    currency: "mxn",
                    product_data: {
                        name: `${item.nombre} (${item.color}) - ${item.tamanio}`,
                    },
                    unit_amount: item.precio * 100,
                },
                quantity: item.quantity,
            });
        });
    }

    return {
        promotionApplied: true,
        stripeProducts
    };
};

export const POST = async (request) => {
    const body = await request.json();

    // Check if 3x999 promotion should be applied
    const promotionResult = calculate3x999Promotion(body.products);

    // Use promotional pricing if applicable, otherwise use original products
    const stripe_products = promotionResult.stripeProducts;

    // If promotion is applied, disable other discount codes
    const shouldApplyDiscountCode = !promotionResult.promotionApplied && body?.code;

    console.log('Promotion applied:', promotionResult.promotionApplied);
    console.log('Stripe products:', stripe_products);

    try {
        let session;

        if (body?.orderInfo?.shipment_cost_id == '') {
            console.log("body?.orderInfo?.shipment_cost_id", body?.orderInfo?.shipment_cost_id);
            console.log('no id de envio');
            session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: stripe_products,
                mode: "payment",
                discounts: shouldApplyDiscountCode ? [{ coupon: body.code }] : [],
                cancel_url: `${host}/carrito`,
                success_url: `${host}/success?session_id={CHECKOUT_SESSION_ID}`,
            });
        } else {
            console.log("body?.orderInfo?.shipment_cost_id", body?.orderInfo?.shipment_cost_id);
            console.log('si id de envio');
            session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: stripe_products,
                mode: "payment",
                discounts: shouldApplyDiscountCode ? [{ coupon: body.code }] : [],
                shipping_options: [
                    {
                        shipping_rate: body?.orderInfo?.shipment_cost_id,
                    },
                ],
                cancel_url: `${host}/carrito`,
                success_url: `${host}/success?session_id={CHECKOUT_SESSION_ID}`,
            });
        }

        return new Response(JSON.stringify({ sessionId: session.id }), { status: 200 });

    } catch (err) {
        console.log("err", err);
        return new Response(err.message, { status: 500 });
    }
}