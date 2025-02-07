"use client";

import { useEffect, useState } from "react";
import { checkout, getProducts } from "./action";
import { ProductProps } from "@/lib/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const supabase = createClient();
  const [data, setData] = useState<ProductProps[] | any[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);
  const { fetchCartQty } = useCart();

  useEffect(() => {
    let isMounted = true;

    async function fetchCart() {
      try {
        // Get authenticated user
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError || !user?.user) return;

        console.log("Fetching cart for user id", user.user.id);

        // Fetch cart items from the database
        const { data: cartItems, error: cartError } = await supabase
          .from("cart")
          .select("product_id, quantity")
          .eq("user_id", user.user.id);

        if (cartError) {
          console.error("Error fetching cart:", cartError.message);
          return;
        } else {
          console.log("Cart items", cartItems);
        }

        if (cartItems.length === 0) {
          setData([]);
          setCheckoutTotal(0);
          return;
        }

        // Fetch product details for cart items
        const productPromises = cartItems.map(async (item) => {
          const { data: product, error: productError } = await supabase
            .from("products")
            .select("*")
            .eq("id", item.product_id)
            .single();

          if (productError) {
            console.error("Error fetching product:", productError.message);
            return null;
          }

          return { ...product, qty: item.quantity };
        });

        const products = (await Promise.all(productPromises)).filter(Boolean);

        if (isMounted) {
          setData(products);
          setCheckoutTotal(
            products.reduce(
              (acc, product) => acc + product.price * product.qty,
              0
            )
          );
        }
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    }

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  async function handleCheckout() {
    //pass cart data
    await checkout(checkoutTotal, data);
    //refresh cart
    fetchCartQty();
  }

  return (
    <div className="space-y-2">
      <Checkout checkoutTotal={checkoutTotal} onCheckout={handleCheckout} />
      {data.map((item, index) => (
        <CartCard key={index} {...item} qty={item.qty} />
      ))}
    </div>
  );
}

function CartCard({ name, thumbnail, price, qty }: ProductProps) {
  return (
    <Card className="flex flex-row overflow-hidden">
      <Image src={thumbnail} width={150} height={150} alt={name} />
      <CardHeader className="space-y-4">
        <CardTitle>
          {Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(price / 100)}
        </CardTitle>
        <CardDescription className="text-black">{name}</CardDescription>
        <p>
          Qty<span>{qty}</span>
        </p>
      </CardHeader>
    </Card>
  );
}

function Checkout({
  checkoutTotal,
  onCheckout,
}: {
  checkoutTotal: number;
  onCheckout: () => void;
}) {
  return (
    <div className="flex justify-between items-center py-5 px-2 border m-1">
      <div className="flex gap-2">
        <h3>Total:</h3>
        <p>
          {Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(checkoutTotal / 100)}
        </p>
      </div>
      <Button onClick={onCheckout}>CHECKOUT</Button>
    </div>
  );
}
