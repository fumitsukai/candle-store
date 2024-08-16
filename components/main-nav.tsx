"use client";
import Link from "next/link";
import { useMediaQuery } from "../hooks/use-media-query";
import { Drawer, DrawerTrigger, DrawerContent } from "./ui/drawer";
import { Menu, UserRound, ShoppingCart, Heart } from "lucide-react";

export default function MainNav() {
  const isDesktop = useMediaQuery("(min-width:768px");
  return isDesktop ? (
    <div>DESKTOP</div>
  ) : (
    <div className="flex items-center gap-1 h-16 justify-between sticky top-0 bg-white">
      <Drawer direction="left">
        <DrawerTrigger>
          <Menu className="dark:text-linen text-raisinBlack" size={32} />
        </DrawerTrigger>
        <DrawerContent>
          <button className="font-semibold text-xl mb-3">ABOUT</button>
          <button className="font-semibold text-xl mb-3">WORK</button>
          <button className="font-semibold text-xl mb-6">CONTACT</button>
        </DrawerContent>
      </Drawer>
      <Link href="/">LOGO</Link>
      <div className="flex float-end gap-3">
        <Link href="/login">
          <UserRound />
        </Link>
        <button>
          <Heart />
        </button>
        <button>
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
}
