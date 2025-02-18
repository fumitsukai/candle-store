"use client";
import Footer from "@/components/footer";
import MainNav from "@/components/main-nav";
import { createClient } from "@/utils/supabase/client";
import { useState, createContext, useEffect } from "react";
import { CartProvider } from "@/contexts/CartContext";

export const SessionContext = createContext(null);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  const syncSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }
      if (data?.session) {
        setUser(data.session.user);
      }
    } catch (error) {
      console.error("Error synchronizing session:", error);
    }
  };

  useEffect(() => {
    const syncSessionOnRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authRedirect = urlParams.get("auth_redirect");

      if (authRedirect) {
        // Fetch the updated session
        await syncSession();

        // Clean the URL by removing the query parameter
        urlParams.delete("auth_redirect");
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    };

    // Sync session if redirected
    syncSessionOnRedirect();

    // Perform a standard sync on component mount
    syncSession();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={user}>
      <CartProvider>
        <div className="flex flex-col min-h-screen text-sm">
          <MainNav />
          <div className="space-y-2 flex-1">{children}</div>
          <Footer />
        </div>
      </CartProvider>
    </SessionContext.Provider>
  );
}
