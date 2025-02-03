"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductProps } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

export function ProductInfo({
  id,
  thumbnail,
  name,
  description,
  price,
}: ProductProps) {
  const [qty, setQty] = useState(1);
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
          <Button className="w-full" onClick={() => addToCart(id, qty, price)}>
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

function addToCart(id: number, qty: number = 1, price: number) {
  const product = { id, qty, price };
  let allProducts =
    JSON.parse(localStorage.getItem("products") as string) || [];
  const productIndex = allProducts.findIndex(
    (item: { id: number }) => item.id === id
  );
  if (productIndex > -1) {
    allProducts[productIndex].qty += qty;
  } else {
    allProducts.push(product);
  }

  localStorage.setItem("products", JSON.stringify(allProducts));
}
