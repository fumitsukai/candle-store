"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import { fetchCart } from "../_helpers/fetchCart";
import { addToOrders } from "./action";

export default function Cart() {
  const supabase = createClient();
  const [data, setData] = useState<ProductProps[] | any[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);
  const { fetchCartQty } = useCart();

  useEffect(() => {
    let isMounted = true;

    async function getCartData() {
      // Get authenticated user
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) return;

      console.log("Fetching cart for user id", user.user.id);

      // Fetch cart items from the database
      const { items, error } = await fetchCart(supabase, user.user.id);
      if (error) {
        console.log("Failed fetching cart items:", error);
        return;
      }

      if (isMounted) {
        setData(items);
        setCheckoutTotal(
          items.reduce((acc, product) => acc + product.price * product.qty, 0)
        );
      }
    }

    getCartData();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  return (
    <div className="space-y-2">
      <Checkout checkoutTotal={checkoutTotal} />
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

function Checkout({ checkoutTotal }: { checkoutTotal: number }) {
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
      <Link href="/checkout">
        <Button>CHECKOUT</Button>
      </Link>
    </div>
  );
}
