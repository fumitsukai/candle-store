"use server";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "./action";
import { createClient } from "@/utils/supabase/server";

export default async function EditProduct({
  params: { id },
}: {
  params: { id: number };
}) {
  const supabase = createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select()
    .eq("id", id);

  return (
    <>
      <h1>Edit Product</h1>
      <form action={updateProduct.bind(null, id)} className="mt-4">
        <div>
          <Label htmlFor="name">Enter Product Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={product![0].name || ""}
          />
        </div>
        <div>
          <Label htmlFor="description">Enter Product Description</Label>
          <Textarea
            name="description"
            id="description"
            required
            defaultValue={product![0].description || ""}
          />
        </div>
        <div>
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input type="file" name="thumbnail" id="thumbnail" />
        </div>
        <div>
          <Label htmlFor="price">Price in pennies</Label>
          <Input
            type="number"
            name="price"
            id="price"
            defaultValue={product![0].price}
          />
        </div>
        <div>
          <Label htmlFor="stock">How many?</Label>
          <Input
            type="number"
            name="stock"
            id="stock"
            defaultValue={product![0].stock}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            name="category"
            id="category"
            defaultValue={product![0].category}
          />
        </div>
        <Button>Save</Button>
      </form>
    </>
  );
}
