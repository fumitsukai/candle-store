"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LoginFormState, loginSchema } from "@/lib/types";
import { linkAnonymousCartToUser } from "../_helpers/linkAnonCartToUser";

export async function login(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const supabase = createClient();

  // get anon user

  const { data: anonUser, error: anonError } = await supabase.auth.getUser();

  const anonymousUserId = anonUser?.user?.id;

  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.flatten().fieldErrors;
  }
  const data = result.data;
  const { data: user, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { message: "Invalid username or password" };
  }

  if (anonymousUserId) {
    await linkAnonymousCartToUser(anonymousUserId, user.user.id);
  }

  // revalidatePath("/", "layout");
  redirect("/?auth_redirect=true");
}
