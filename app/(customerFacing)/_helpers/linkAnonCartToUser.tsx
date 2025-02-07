import { createClient } from "@/utils/supabase/server";

export async function linkAnonymousCartToUser(
  anonymousUserId: string,
  newUserId?: string
) {
  const supabase = createClient();

  if (!anonymousUserId || !newUserId || newUserId === anonymousUserId) {
    console.log("No cart transfer needed!");
    return; // No change needed
  }

  console.log("Transfering cart from", anonymousUserId, "to", newUserId);

  const { error: reassignError } = await supabase.rpc("migrate_cart", {
    old_user: anonymousUserId,
    new_user: newUserId,
  });

  if (reassignError) {
    console.log("Cart migration failed", reassignError.message);
  } else {
    console.log("Migration succesful");
  }

  console.log("✅ Anonymous cart linked to user account!");
}
