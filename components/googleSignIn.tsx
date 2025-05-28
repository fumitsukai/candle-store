"use client";

import { createClient } from "@/utils/supabase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function GoogleSignIn() {
  const supabase = createClient();
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <>
      <button
        onClick={handleSignIn}
        className="flex justify-center items-center gap-2 border rounded-md p-2"
      >
        <FontAwesomeIcon icon={faGoogle} size="lg" />
        <span>Sign in with Google</span>
      </button>
    </>
  );
}
