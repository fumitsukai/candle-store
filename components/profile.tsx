import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";

export default async function ViewProfile() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return <h1>Error fetching user</h1>;
  }
  const profile = await getProfile(data.user.id);

  return (
    <>
      <div className="mx-4">
        <h1 className="mb-6 font-bold text-lg">View Profile</h1>
        <form action="" className="space-y-2">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" id="username" />
          </div>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={profile.firstname}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={profile.lastname}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address_line_1">Address</Label>
            <Input
              type="text"
              name="address_line_1"
              defaultValue={profile.adress_line_1}
              placeholder="Street Name and Number"
            />
            <Input
              type="text"
              name="address_line_2"
              defaultValue={profile.adress_line_2}
              placeholder="Apartment no/suite/etc"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input type="text" placeholder="City" />
              <Input type="text" placeholder="Country" />
              <Input type="text" placeholder="Postcode" />
              <Input type="text" placeholder="State/County" />
            </div>
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      </div>
    </>
  );
}

async function getProfile(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}
