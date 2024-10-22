import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const host = process.env.NEXT_PUBLIC_HOST;

// https://blog.stackademic.com/nextjs-with-stripe-payment-integration-part-1-d9ece0aa70c7
export const POST = async (request) => {

    const body = await request.json();

    const stripe_products = body.products.map((product) => {
        return {
            price_data: {
                currency: "mxn", // Set currency to Mexican Peso
                product_data: {
                    name: product.nombre + ' (' + product.color + ')' + " - " + product.tamanio,
                },
                unit_amount: product.precio * 100, // Ensure amount is multiplied by 100 for correct Stripe format
            },
            quantity: product.cantidad,
        };
    })

    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], // Only allow card payments
            line_items: stripe_products,
            mode: "payment",
            discounts: body?.code ? [{ coupon: body.code }] : [],
            // shipping_options: [
            //     {
            //         shipping_rate: 'shr_1QCd2Z06GvttNHxde76R6bnb', // envios locales
            //     },
            //     {
            //         shipping_rate: 'shr_1QCd3d06GvttNHxdNBL5g2YX', // envios nacionales
            //     },
            // ],
            cancel_url: `${host}/carrito`,
            success_url: `${host}/success?session_id={CHECKOUT_SESSION_ID}`,
        });

        return new Response(JSON.stringify({ sessionId: session.id }), { status: 200 });

    } catch (err) {

        console.log("err", err);
        return new Response(err.message, { status: 500 });

    }
}
