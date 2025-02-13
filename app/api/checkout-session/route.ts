import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { items, userId } = await req.json();

    // Convert items to Stripe format
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "GBP",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.qty,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: { userId },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating Stripe session" },
      { status: 500 }
    );
  }
}
