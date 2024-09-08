"use client";

import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNav />
      <div className="container my-6">{children}</div>
    </>
  );
}

function AdminNav() {
  const isDesktop = useMediaQuery("(min-width:768px");
  return isDesktop ? (
    <div>DESKTOP</div>
  ) : (
    <div className="flex items-center h-12 py-2 justify-between sticky top-0 bg-white px-3 z-50">
      <Drawer direction="left">
        <DrawerTrigger>
          <Menu className="dark:text-linen text-raisinBlack" />
        </DrawerTrigger>
        <DrawerContent className="flex items-center pt-2 gap-5">
          <DrawerClose asChild className="">
            <Link href="/admin">
              <button className="font-semibold text-xl mb-3">DASHBOARD</button>
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link href="/admin/products">
              <button className="font-semibold text-xl mb-3">PRODUCTS</button>
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link href="/admin/orders">
              <button className="font-semibold text-xl mb-3">ORDERS</button>
            </Link>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
