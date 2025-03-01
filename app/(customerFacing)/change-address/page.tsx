import Header from "@/components/header_x";
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
      <div className="bg-slate-100 space-y-4">
        <Header name="CHANGE ADDRESS" url="/" />
        <form
          action={changeAddress.bind(null, user_id)}
          className="p-4 space-y-4 bg-white"
        >
          <div className="space-y-2">
            <Label htmlFor="address_line_1">ADDRESS</Label>
            <Input
              name="address_line_1"
              id="address_line_1"
              type="text"
              defaultValue={profileData.address_line_1}
            />
          </div>
          {profileData.address_line_2 && (
            <div className="space-y-2">
              <Input
                name="address_line_2"
                id="address_line_2"
                type="text"
                defaultValue={profileData.address_line_2}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="city">CITY</Label>
            <Input
              name="city"
              id="city"
              type="text"
              defaultValue={profileData.city}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">COUNTRY</Label>
            <Input
              name="country"
              id="country"
              type="text"
              defaultValue={profileData.country}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postcode">POSTCODE</Label>
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
      </div>
    </>
  );
}
