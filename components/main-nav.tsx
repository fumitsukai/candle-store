"use client";
import Link from "next/link";
import { useMediaQuery } from "../hooks/use-media-query";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "./ui/drawer";
import { AlignJustify, UserRound, ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/img/logogpt3.png";
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
    <div className="flex items-center h-16 py-6 justify-between bg-lightkeeper-white sticky top-0 px-4 z-50 overflow-hidden">
      <div className="basis-1/3">
        <Drawer direction="left">
          <DrawerTrigger className="p-2">
            <AlignJustify
              className="dark:text-linen text-raisinBlack"
              size={24}
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
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={160} height={48}></Image>
        </Link>
      </div>
      <div className="flex gap-4 items-center z-40">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-100 transition">
            <UserRound size={24} />
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
        {/* <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Heart size={25} />
        </button> */}
        <Link href="/cart">
          <div className="relative p-2 rounded-full hover:bg-gray-100 transition">
            {qty > 0 && (
              <div className="absolute text-[10px] w-4 h-4 text-white bg-slate-900 rounded-full items-center right-0 bottom-0 flex justify-center">
                {qty}
              </div>
            )}
            <ShoppingBag size={24} />
          </div>
        </Link>
      </div>
    </div>
  );
}
