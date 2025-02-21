"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { createClient } from "@/utils/supabase/client";
import { fetchCart } from "../_helpers/fetchCart";
import { ProductProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import Header from "@/components/header";

export default function Checkout() {
  const supabase = createClient();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[] | any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

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

      setProducts(items);
    }
    getCartData();
  }, [supabase]);

  // Handler function for checkout process
  async function handleCheckout() {
    if (!userId || products.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, userId }),
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

  async function getAddress(userId: string) {
    try {
      if (!userId) throw new Error("Missing user id");
      //get address from the profile
      const { data: profileData, error: profileDataError } = await supabase
        .from("profiles")
        .select()
        .eq("id", userId)
        .single();

      if (!profileData || profileDataError) {
        console.log("Error retrieving profile", profileDataError);
        return;
      }
      console.log("Fetched profile:", profileData);
      setProfile(profileData);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAddress(userId!);
  }, [userId]);
  return (
    <>
      <div className="bg-slate-100 space-y-4">
        <Header name="CHECKOUT" url="/cart" />
        <MyCart products={products} />
        <ShowAddress {...profile} />
        <div className="p-4 space-y-4">
          <div className="flex justify-between">
            <div>Total to pay:</div>
            <div>
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(
                products.reduce(
                  (acc, product) => acc + product.price * product.qty,
                  0
                ) / 100
              )}
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={loading || !products.length}
            className="w-full"
          >
            {loading ? "Processing..." : "BUY NOW"}
          </Button>
        </div>
      </div>
    </>
  );
}

function ShowAddress(props: any) {
  return (
    <div className="bg-white p-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-bold ">DELIVERY ADDRESS</h3>
        <Link href="/change-address">
          {" "}
          <div className="bg-slate-100 p-1 border text-xs font-light">
            CHANGE
          </div>
        </Link>
      </div>
      <div className="flex gap-2">
        <div>{props.firstname}</div>
        <div>{props.lastname}</div>
      </div>
      <div>{props.address_line_1}</div>
      <div>{props.city}</div>
      <div>{props.country}</div>
      <div>{props.postcode}</div>
    </div>
  );
}

function MyCart({ products }: { products: any }) {
  return (
    <div className="p-4 bg-white space-y-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">MY CART</h3>
        <Link href="/cart">
          <div className="font-extralight">View</div>
        </Link>
      </div>
      <div className="flex gap-4">
        {products.map((product: ProductProps) => (
          <div className="relative">
            <Image
              src={product.thumbnail}
              alt={product.description}
              width={100}
              height={100}
            />
            <div
              className={`absolute bottom-0 right-0 z-50 text-white hidden ${
                product?.qty > 1 && "hidden"
              }`}
            >
              x{product.qty}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
