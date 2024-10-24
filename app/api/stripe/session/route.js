import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const host = process.env.NEXT_PUBLIC_HOST;

// https://blog.stackademic.com/nextjs-with-stripe-payment-integration-part-1-d9ece0aa70c7
export const POST = async (request) => {

    const body = await request.json();

    const stripe_products = body.products.map((product) => {
        return {
            price_data: {
                currency: "mxn",
                product_data: {
                    name: product.nombre + ' (' + product.color + ')' + " - " + product.tamanio,
                },
                unit_amount: product.precio * 100,
            },
            quantity: product.cantidad,
        };
    })

    try {

        let session;
        if (body?.orderInfo?.shipment_cost_id == '') {
            console.log("body?.orderInfo?.shipment_cost_id", body?.orderInfo?.shipment_cost_id);
            console.log('no id de envio');
            session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"], // Only allow card payments
                line_items: stripe_products,
                mode: "payment",
                discounts: body?.code ? [{ coupon: body.code }] : [],
                cancel_url: `${host}/carrito`,
                success_url: `${host}/success?session_id={CHECKOUT_SESSION_ID}`,
            });
        } else {
            console.log("body?.orderInfo?.shipment_cost_id", body?.orderInfo?.shipment_cost_id);
            console.log('si id de envio');
            session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"], // Only allow card payments
                line_items: stripe_products,
                mode: "payment",
                discounts: body?.code ? [{ coupon: body.code }] : [],
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
