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

export async function checkout(total: number, localStorageData: any) {
  console.log(total, localStorageData);
  const supabase = createClient();
  const { error } = await supabase
    .from("orders")
    .insert([{ total: total, products: localStorageData }])
    .select();
  if (error) {
    console.log(error);
  }
  redirect("/");
}
