"use client";

import { createClient } from "@/utils/supabase/client";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import {
  ChevronRight,
  House,
  Lock,
  PackageCheck,
  PackageMinus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SessionContext } from "./session_provider";

export default function MyAccountPanel() {
  const supabase = createClient();
  const { fetchCartQty } = useCart();
  const router = useRouter();
  const user = useContext(SessionContext);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
    fetchCartQty();
    router.replace("/login");
  };

  return (
    <div className="bg-lightkeeper-white">
      <div className="relative flex items-center justify-center h-14 px-4 mb-4">
        <h1 className="text-base uppercase tracking-wide font-medium">
          MY ACCOUNT
        </h1>
        <button className="p-2 absolute right-4" onClick={handleSignOut}>
          Sign out
        </button>
      </div>

      <div className="mb-4">
        <div className="text-center">
          <p>Hi,</p>
          <p className="font-medium text-base">
            {user?.user_metadata.firstName}
          </p>
        </div>
        <div className="flex flex-col items-center">
          {[
            { href: "/my-orders", icon: PackageCheck, label: "My Orders" },
            { href: "/my-returns", icon: PackageMinus, label: "My Returns" },
            { href: "/change-password", icon: Lock, label: "Change Password" },
            { href: "/change-address", icon: House, label: "Change Address" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="w-full flex items-center px-4 gap-4"
            >
              <Icon size={24} />
              <div className="border-b p-4 w-full flex justify-between">
                <span>{label}</span>
                <ChevronRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
