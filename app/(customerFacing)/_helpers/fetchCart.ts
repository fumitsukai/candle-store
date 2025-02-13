import { CartProps } from "@/lib/types";

export async function fetchCart(supabase: any, userId: string) {
  try {
    // Fetch cart items from the database
    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select("product_id, quantity")
      .eq("user_id", userId);

    if (cartError) {
      console.error("Error fetching cart:", cartError.message);
      return { items: [], error: cartError.message };
    }

    if (!cartItems || cartItems.length === 0) {
      return { items: [], error: null };
    }

    // Fetch product details for cart items
    const productPromises = cartItems.map(async (item: CartProps) => {
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", item.product_id)
        .single();

      if (productError) {
        console.error("Error fetching product:", productError.message);
        return null;
      }

      return { ...product, qty: item.quantity, user_id: userId };
    });

    const products = (await Promise.all(productPromises)).filter(Boolean);

    return { items: products, error: null };
  } catch (error) {
    console.error("Error fetching cart data", error);
    return { items: [], error };
  }
}
