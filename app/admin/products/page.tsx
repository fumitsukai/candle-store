import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import { removeProduct } from "../[id]/editproduct/action";
import RemoveProduct from "../_components/deleteProduct";

export default async function AdminProducts() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from("products").select();
  return (
    <>
      <div className="flex justify-between items-center">
        <h1>PRODUCTS</h1>
        <Link href="/admin/createproduct">
          <Button size="sm">Add Product</Button>
        </Link>
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Picture</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={200}
                  height={200}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Options id={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function Options({ id }: { id: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/admin/${id}/editproduct`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <RemoveProduct id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
