"use server";

import { createClient } from "@/utils/supabase/server";
import { editProductSchema } from "@/lib/types";
import fs from "fs/promises";
import { redirect } from "next/navigation";

export async function updateProduct(id: number, formData: FormData) {
  const supabase = createClient();

  const result = editProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return result.error;
  }

  const data = result.data;
  const { data: product } = await supabase
    .from("products")
    .select()
    .eq("id", id);

  let thumbnailPath = product![0].thumbnail;
  if (data.thumbnail != null && data.thumbnail.size > 0) {
    await fs.unlink(product![0].thumbnail);
    await fs.mkdir("public/products", { recursive: true });
    thumbnailPath = `/products/${crypto.randomUUID()}-${data.thumbnail.name}`;
    await fs.writeFile(
      `public${thumbnailPath}`,
      Buffer.from(await data.thumbnail.arrayBuffer())
    );
  }

  const { error } = await supabase
    .from("products")
    .update({
      name: data.name,
      description: data.description,
      thumbnail: thumbnailPath,
      price: data.price,
      stock: data.stock,
      category: data.category,
    })
    .eq("id", id)
    .select();

  if (error) {
    return error.message;
  }

  redirect("/admin/products");
}

export async function removeProduct(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  redirect("/admin/products");
}
