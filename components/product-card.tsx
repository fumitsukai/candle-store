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
import { Button } from "./ui/button";

export default function ProductCard({
  id,
  name,
  description,
  thumbnail,
  price,
}: ProductProps) {
  return (
    <Card className="overflow-hidden flex flex-col shrink-0">
      <div className="w-full relative h-auto aspect-square">
        <Image src={thumbnail} alt={name} fill />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(price / 100)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
