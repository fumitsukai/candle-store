"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { removeProduct } from "../[id]/editproduct/action";

export default function RemoveProduct({ id }: { id: number }) {
  return (
    <>
      <DropdownMenuItem onClick={() => removeProduct(id)}>
        Remove
      </DropdownMenuItem>
    </>
  );
}
