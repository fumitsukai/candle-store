import MyAccountPanel from "@/components/my_account_panel"; // this will be Client
import { createClient } from "@/utils/supabase/server";
export const dynamic = "force-dynamic";

export default async function MyAccountPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return <h1>Error fetching user</h1>;
  }

  return <MyAccountPanel />;
}
