"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { createClient } from "@/utils/supabase/client";
import { fetchCart } from "../_helpers/fetchCart";
import { ProductProps } from "@/lib/types";

export default function Checkout() {
  const supabase = createClient();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ProductProps[] | any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getCartData() {
      //get user
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (!user || userError) {
        console.log("Error retrieving user", userError);
        return;
      }

      const user_id = user.user.id;
      setUserId(user_id);

      //fetch cart from db

      const { items, error } = await fetchCart(supabase, user_id);
      if (error) {
        console.log("Error retriving cart items", error);
        return;
      }

      setItems(items);
    }
    getCartData();
  }, [supabase]);

  // Handler function for checkout process
  async function handleCheckout() {
    if (!userId || items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, userId }),
      });

      const { sessionId } = await res.json();
      if (!sessionId) {
        throw new Error("Missing sessionId from API response");
      }
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.log("Stripe redirect error", error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={loading || !items.length}>
      {loading ? "Processing..." : "PAY BY CARD"}
    </Button>
  );
}
