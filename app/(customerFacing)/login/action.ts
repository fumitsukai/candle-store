"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FormState, loginSchema } from "@/lib/types";

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createClient();

  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.flatten().fieldErrors;
  }

  const data = result.data;

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { message: "Invalid username or password" };
  }
  // revalidatePath("/", "layout");
  redirect("/?auth_redirect=true");
}
