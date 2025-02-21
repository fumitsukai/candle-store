"use server";

import { AddressFormData, changeAddressSchema } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export async function changeAddress(
  user_id: string,
  formData: FormData
): Promise<AddressFormData> {
  const supabase = createClient();

  const result = changeAddressSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  const data = result.data;

  //update profile
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      address_line_1: data?.address_line_1,
      address_line_2: data?.address_line_2,
      city: data?.city,
      country: data?.country,
      postcode: data?.postcode,
    })
    .eq("id", user_id);
  if (profileError) {
    return { message: "Could not find profile" };
  }
}
