"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";
import { ProductProps } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useState, useEffect } from "react";

export function ProductInfo({
  id,
  thumbnail,
  name,
  description,
  price,
}: ProductProps) {
  const [qty, setQty] = useState(1);
  // const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const { fetchCartQty } = useCart();

  // useEffect(() => {
  //   async function getOrCreateUser() {
  //     const { data: user, error } = await supabase.auth.getUser();

  //     if (error || !user?.user) {
  //       // No logged-in user, try to create an anonymous session
  //       const { data: anonUser, error: anonError } =
  //         await supabase.auth.signInAnonymously();

  //       if (anonError) {
  //         console.error("Anonymous sign-in failed:", anonError.message);
  //         return;
  //       }

  //       setUserId(anonUser?.user?.id ?? null);
  //     } else {
  //       setUserId(user.user.id);
  //     }
  //   }

  //   getOrCreateUser();
  // }, [supabase]);

  async function addToCart() {
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("Failed to retrieve session:", userError);
    }

    const userId = user?.user?.id;

    // Check if the item already exists in the cart
    const { data: existingCartItem, error: fetchError } = await supabase
      .from("cart")
      .select("id, quantity")
      .eq("user_id", userId)
      .eq("product_id", id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching cart:", fetchError.message);
      return;
    }

    if (existingCartItem) {
      // Update quantity if item already exists
      const { error: updateError } = await supabase
        .from("cart")
        .update({ quantity: existingCartItem.quantity + qty })
        .eq("id", existingCartItem.id);

      if (updateError) {
        console.error("Error updating cart:", updateError.message);
        return;
      }
    } else {
      // Insert new cart item
      const { error: insertError } = await supabase.from("cart").insert([
        {
          user_id: userId,
          product_id: id,
          quantity: qty,
          price,
        },
      ]);

      if (insertError) {
        console.error("Error adding to cart:", insertError.message);
        return;
      }
    }

    alert("Added to cart!");
    fetchCartQty();
  }
  return (
    <div>
      <div>
        <Image src={thumbnail} alt={name} width={400} height={400} />
      </div>
      <div className="px-2 space-y-2 mt-2">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm">{description}</p>
        <p className="text-slate-600 font-semibold">
          {Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(price / 100)}
        </p>
        <div className="flex justify-between gap-2">
          <Button className="w-full" onClick={addToCart}>
            Add to cart
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="text-xs border px-3 py-1 rounded-sm">
                <h4>Qty</h4>
                <p>{qty}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-12">
              <DropdownMenuCheckboxItem onCheckedChange={() => setQty(1)}>
                1
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onCheckedChange={() => setQty(2)}>
                2
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
