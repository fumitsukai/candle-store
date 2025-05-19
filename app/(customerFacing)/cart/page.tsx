"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { fetchCart } from "../_helpers/fetchCart";

export default function Cart() {
  const supabase = createClient();
  const [data, setData] = useState<ProductProps[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  // 1) grab the user
  useEffect(() => {
    let isMounted = true;
    supabase.auth.getUser().then(({ data: u, error }) => {
      if (isMounted) {
        setUser(u?.user ?? null);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  // 2) fetch cart only if logged in
  useEffect(() => {
    if (!user) {
      setData([]);
      setCheckoutTotal(0);
      return;
    }
    let isMounted = true;
    fetchCart(supabase, user.id).then(({ items, error }) => {
      if (error) return console.error(error);
      if (isMounted) {
        setData(items);
        setCheckoutTotal(items.reduce((sum, p) => sum + p.price * p.qty, 0));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [supabase, user]);

  return (
    <div className="space-y-2 px-4 py-2">
      <Checkout checkoutTotal={checkoutTotal} user={user} />
      {data.map((item, i) => (
        <CartCard key={i} {...item} qty={item.qty} />
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
        <p>Qty: {qty}</p>
      </CardHeader>
    </Card>
  );
}

interface CheckoutProps {
  checkoutTotal: number;
  user: any; // or your typed User | null
}

function Checkout({ checkoutTotal, user }: CheckoutProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!user || user.is_anonymous === true) {
      // send them to login, then back to checkout after
      router.push(`/login?redirect=/checkout`);
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="flex justify-between bg-lightkeeper-white items-center p-4 border border-lightkeeper-lightgray">
      <div className="flex gap-2">
        <h3>Total:</h3>
        <p>
          {Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(checkoutTotal / 100)}
        </p>
      </div>
      <Button onClick={handleClick}>CHECKOUT</Button>
    </div>
  );
}
