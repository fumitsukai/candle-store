"use server";

import { ChangePasswordFormState, changePasswordSchema } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export async function changePass(
  state: ChangePasswordFormState,
  formData: FormData
): Promise<ChangePasswordFormState> {
  const supabase = createClient();

  const result = changePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!result.success) {
    return result.error.flatten().fieldErrors;
  }
  const data = result.data;

  const { data: isValid, error } = await supabase.rpc("verify_user_password", {
    password: data?.old_password,
  });
  if (error) {
    console.log("rpc error", error);
  }

  if (!isValid) {
    return { code: "INCORRECT_CURRENT", message: "Incorrect password." };
  } else if (isValid && data?.new_password !== data?.confirm_new_password) {
    return { code: "MISMATCH", message: "Passwords must match" };
  } else await supabase.auth.updateUser({ password: data?.new_password });
}
