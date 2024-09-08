"use server";

import { createClient } from "@/utils/supabase/server";
import { createProductSchema } from "@/lib/types";
import fs from "fs/promises";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  const supabase = createClient();

  const result = createProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return result.error;
  }

  const data = result.data;

  await fs.mkdir("public/products", { recursive: true });
  const thumbnailPath = `/products/${crypto.randomUUID()}-${
    data.thumbnail.name
  }`;
  await fs.writeFile(
    `public${thumbnailPath}`,
    Buffer.from(await data.thumbnail.arrayBuffer())
  );

  const { error } = await supabase.from("products").insert({
    name: data.name,
    description: data.description,
    thumbnail: thumbnailPath,
    price: data.price,
    stock: data.stock,
    category: data.category,
  });

  if (error) {
    return error.message;
  }

  redirect("/admin/products");
}
