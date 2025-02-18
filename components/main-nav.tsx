"use client";
import Link from "next/link";
import { useMediaQuery } from "../hooks/use-media-query";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "./ui/drawer";
import { AlignJustify, UserRound, ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/img/Untitled.png";
import { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { SessionContext } from "@/app/(customerFacing)/layout";
import { useCart } from "@/contexts/CartContext";

export default function MainNav() {
  const supabase = createClient();
  const user = useContext(SessionContext);
  const { qty, fetchCartQty } = useCart();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
    }
    fetchCartQty();
  };
  const isDesktop = useMediaQuery("min-width:768px");
  return isDesktop ? (
    <div>DESKTOP</div>
  ) : (
    <div className="flex items-center h-10 py-6 justify-between sticky top-0 bg-white px-3 z-50 overflow-hidden">
      <Drawer direction="left">
        <DrawerTrigger className="p-1">
          <AlignJustify
            className="dark:text-linen text-raisinBlack"
            size={20}
          />
        </DrawerTrigger>
        <DrawerContent className="text-center">
          <DrawerClose asChild>
            <Link href="/products">
              <button className="font-semibold text-xl mb-3">CANDLES</button>
            </Link>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
      <Link href="/" className="ps-14 justify-self-start">
        <Image src={Logo} alt="Logo" width={130} height={50}></Image>
      </Link>
      <div className="flex float-end gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1">
            <UserRound size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {!user ? (
              <Link href="/login">
                <DropdownMenuItem>Sign In</DropdownMenuItem>
              </Link>
            ) : (
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            )}
            <Link href="/view-profile">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        <button className="p-1">
          <Heart size={20} />
        </button>
        <Link href="/cart">
          <div className="relative p-1">
            {qty > 0 && (
              <div className="absolute text-[8px] w-3 h-3 text-white bg-slate-900 rounded-full items-center right-0 bottom-0 flex justify-center">
                {qty}
              </div>
            )}
            <ShoppingBag size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
}
