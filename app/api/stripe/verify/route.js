import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (request) => {
    const { session_id } = await request.json();

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        return new Response(
            JSON.stringify({ payment_status: session.payment_status }),
            { status: 200 }
        );
    } catch (err) {
        console.error('Error verifying payment:', err);
        return new Response(
            JSON.stringify({ error: 'Error verifying payment' }),
            { status: 500 }
        );
    }
};
