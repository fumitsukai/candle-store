"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FormState, loginSchema } from "@/lib/types";
import { linkAnonymousCartToUser } from "../_helpers/linkAnonCartToUser";

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createClient();

  // get anon user

  const { data: anonUser, error: anonError } = await supabase.auth.getUser();

  if (anonError || !anonUser.user) {
    console.log("Error fetching anonymous user:", anonError?.message);
    return { message: "Error getting anonymous session" };
  }

  const anonymousUserId = anonUser.user.id;

  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.flatten().fieldErrors;
  }

  const data = result.data;
  const { error: updateError } = await supabase.auth.updateUser(data);
  if (updateError) {
    const { data: user, error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return { message: "Invalid username or password" };
    }

    console.log("User ID:", user.user.id);

    await linkAnonymousCartToUser(anonymousUserId, user.user.id);
    // revalidatePath("/", "layout");
    redirect("/?auth_redirect=true");
  }
}
