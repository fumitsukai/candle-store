"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getProducts(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select().eq("id", id);
  if (error) {
    console.log(error);
  }
  return data;
}

export async function checkout(total: number, cartData: any) {
  const supabase = createClient();
  //start transaction
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([{ total: total }])
    .select("id")
    .single();
  if (orderError) {
    redirect("/login");
    throw orderError;
  }
  const order_id = order.id;
  //insert order items in bulk
  const orderItems = cartData.map((item: any) => ({
    order_id,
    product_id: item.id,
    quantity: item.qty,
    price: item.price,
  }));
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);
  if (itemsError) throw itemsError;
  redirect("/");
}
