"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addProduct } from "./action";

export default function CreateProduct() {
  return (
    <form action={addProduct}>
      <div>
        <Label htmlFor="name">Enter Product Name</Label>
        <Input type="text" name="name" id="name" />
      </div>
      <div>
        <Label htmlFor="description">Enter Product Description</Label>
        <Textarea name="description" id="description" />
      </div>
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input type="file" name="thumbnail" id="thumbnail" />
      </div>
      <div>
        <Label htmlFor="price">Price in pennies</Label>
        <Input type="number" name="price" id="price" />
      </div>
      <div>
        <Label htmlFor="stock">How many?</Label>
        <Input type="number" name="stock" id="stock" />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input type="text" name="category" id="category" />
      </div>
      <Button>Save</Button>
    </form>
  );
}
