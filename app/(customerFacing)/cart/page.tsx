"use client";

import { useEffect, useState } from "react";
import { checkout, getLocalStorage } from "./action";
import { ProductProps } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BouncyBallsLoader from "react-loaders-kit/lib/bouncyBalls/BouncyBallsLoader";

type Product = {
  id: number;
  qty: number;
};

export default function Cart() {
  const [ls, setLs] = useState<Product[]>([]);
  const [data, setData] = useState<ProductProps[] | any[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);
  useEffect(() => {
    const products = localStorage.getItem("products");
    if (products) {
      const parsedProducts = JSON.parse(products).map((item: any) => ({
        id: item.id,
        qty: item.qty,
      }));
      setLs(parsedProducts);
    } else {
      console.log("No products in localStorage");
    }
  }, []);
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        console.log("Fetching data");
        const results = await Promise.all(
          ls.map((item) =>
            getLocalStorage(item.id).then((products) =>
              products?.map((product) => ({ ...product, qty: item.qty }))
            )
          )
        );
        const flatResults = results.flat();
        if (isMounted) setData(flatResults);

        const totalCost = flatResults.reduce(
          (acc, product) => acc + product.price * product.qty,
          0
        );
        if (isMounted) setCheckoutTotal(totalCost);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    if (ls.length > 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [ls]);

  return (
    <div className="space-y-2">
      <Checkout checkoutTotal={checkoutTotal} />
      {data.map((item, index) => (
        <CartCard key={index} {...item} qty={item.qty} />
      ))}
    </div>
  );
}

function CartCard({ name, thumbnail, price, qty }: ProductProps) {
  return (
    <Card className="flex flex-row overflow-hidden">
      <Image src={thumbnail} width={150} height={150} alt={name} />
      <CardHeader className="space-y-4">
        <CardTitle>
          {Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(price / 100)}
        </CardTitle>
        <CardDescription className="text-black">{name}</CardDescription>
        <p>
          Qty<span>{qty}</span>
        </p>
      </CardHeader>
    </Card>
  );
}

function Checkout({ checkoutTotal }: { checkoutTotal: number }) {
  return (
    <div className="flex justify-between items-center py-5 px-2 border m-1">
      <div className="flex gap-2">
        <h3>Total:</h3>
        <p>
          {Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(checkoutTotal / 100)}
        </p>
      </div>
      <Button
        onClick={(e) =>
          checkout(checkoutTotal, localStorage.getItem("products"))
        }
      >
        CHECKOUT
      </Button>
    </div>
  );
}
