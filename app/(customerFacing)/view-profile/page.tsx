import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function MyAccount() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return <h1>Error fetching user</h1>;
  }
  return (
    <>
      <div className="">
        <div className="flex justify-between">
          <h1>MY ACCOUNT</h1>
          <button>Sign out</button>
        </div>
        <div>Hi, {data.user.user_metadata.firstName}</div>
        <div>
          <Link href="/my-orders">
            <button>My orders</button>
          </Link>
        </div>
        <div>
          <button>My returns</button>
        </div>
        <div>
          <button>My details</button>
        </div>
        <div>
          <button>Change password</button>
        </div>
        <div>
          <button>Address</button>
        </div>
      </div>
    </>
  );
}
