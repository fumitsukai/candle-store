import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ProductProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  id,
  name,
  thumbnail,
  price,
}: ProductProps) {
  return (
    <Link href={`${id}/${name}`}>
      <Card className="overflow-hidden flex flex-col shrink-0">
        <div className="w-full relative h-auto aspect-square">
          <Image src={thumbnail} alt={name} fill />
        </div>
        <CardHeader>
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription>
            {Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(price / 100)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
