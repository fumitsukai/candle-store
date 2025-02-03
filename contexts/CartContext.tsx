"use client";

import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<{
  qty: number;
  fetchCartQty: () => Promise<void>;
}>({
  qty: 0,
  fetchCartQty: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [qty, setQty] = useState<number>(0);

  async function fetchCartQty() {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) return;

    const { data: cart, error: cartError } = await supabase
      .from("cart")
      .select("quantity")
      .eq("user_id", user.user.id);

    if (cartError) {
      console.error("Error fetching cart:", cartError.message);
      return;
    }

    const totalQty = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    setQty(totalQty);
  }

  useEffect(() => {
    fetchCartQty();
  }, []);

  return (
    <CartContext.Provider value={{ qty, fetchCartQty }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
