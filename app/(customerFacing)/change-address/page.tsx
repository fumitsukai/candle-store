import Header from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import { changeAddress } from "./action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default async function ChangeAddress() {
  const supabase = createClient();
  //get user
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (!user || userError) {
    return { message: "No user Error" };
  }
  const user_id = user.user.id;
  //get profile
  const { data: profileData, error: profileDataError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user_id)
    .single();
  if (profileDataError) {
    return <h1>No Profile Data</h1>;
  }

  return (
    <>
      <Header name="CHANGE ADDRESS" url="/" />
      <form
        action={changeAddress.bind(null, user_id)}
        className="p-4 space-y-1"
      >
        <div>
          <Label htmlFor="address_line_1">Address</Label>
          <Input
            name="address_line_1"
            id="address_line_1"
            type="text"
            defaultValue={profileData.address_line_1}
          />
        </div>
        {profileData.address_line_2 && (
          <div>
            <Input
              name="address_line_2"
              id="address_line_2"
              type="text"
              defaultValue={profileData.address_line_2}
            />
          </div>
        )}
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            name="city"
            id="city"
            type="text"
            defaultValue={profileData.city}
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            name="country"
            id="country"
            type="text"
            defaultValue={profileData.country}
          />
        </div>
        <div>
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            name="postcode"
            id="postcode"
            type="text"
            defaultValue={profileData.postcode}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </>
  );
}
