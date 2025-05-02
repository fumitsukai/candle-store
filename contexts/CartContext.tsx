"use client";

import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useEffect, useState } from "react";
import { SessionContext } from "@/components/session_provider";

interface CartContextValue {
  qty: number;
  fetchCartQty: () => Promise<void>;
}

const CartContext = createContext<CartContextValue>({
  qty: 0,
  fetchCartQty: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const user = useContext(SessionContext); // <— pull in the current user
  const [qty, setQty] = useState<number>(0);

  const fetchCartQty = async () => {
    // if no logged-in user, clear out
    if (!user) {
      setQty(0);
      return;
    }

    // load only this user’s cart rows
    const { data: cart, error: cartError } = await supabase
      .from("cart")
      .select("quantity")
      .eq("user_id", user.id);

    if (cartError) {
      console.error("Error fetching cart:", cartError.message);
      setQty(0);
      return;
    }

    const totalQty = cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
    setQty(totalQty);
  };

  // 🔄 re-fetch every time the user logs in or out
  useEffect(() => {
    fetchCartQty();
  }, [user]);

  return (
    <CartContext.Provider value={{ qty, fetchCartQty }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
