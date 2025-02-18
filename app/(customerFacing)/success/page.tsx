import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function Success({ searchParams }: { searchParams: any }) {
  const { session_id } = await searchParams;
  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const { status, customer_details } = await stripe.checkout.sessions.retrieve(
    session_id,
    { expand: ["line_items", "payment_intent"] }
  );

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return <div>COMPLETED</div>;
  }
}
