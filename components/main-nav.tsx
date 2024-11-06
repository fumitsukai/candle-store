"use client";
import Link from "next/link";
import { useMediaQuery } from "../hooks/use-media-query";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "./ui/drawer";
import { Menu, UserRound, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/img/Untitled.png";
import { useEffect, useState } from "react";

export default function MainNav() {
  const [qty, setQty] = useState(0);
  const isDesktop = useMediaQuery("(min-width:768px");
  useEffect(() => {
    const prdt = JSON.parse(localStorage.getItem("products") as string);
    setQty(prdt?.length as number);
  }, []);
  return isDesktop ? (
    <div>DESKTOP</div>
  ) : (
    <div className="flex items-center h-12 py-2 justify-between sticky top-0 bg-white px-3 z-50 overflow-hidden">
      <Drawer direction="left">
        <DrawerTrigger>
          <Menu className="dark:text-linen text-raisinBlack" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerClose asChild>
            <Link href="/products">
              <button className="font-semibold text-xl mb-3">CANDLES</button>
            </Link>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
      <Link href="/" className="ps-12 mt-1 justify-self-start">
        <Image src={Logo} alt="Logo"></Image>
      </Link>
      <div className="flex float-end gap-6">
        <Link href="/login">
          <UserRound />
        </Link>
        <button>
          <Heart />
        </button>
        <Link href="/cart">
          <div className="relative">
            {qty > 0 && (
              <div className="absolute text-[10px] text-white bg-red-600 rounded-full px-1 right-0">
                {qty}
              </div>
            )}
            <ShoppingCart />
          </div>
        </Link>
      </div>
    </div>
  );
}
