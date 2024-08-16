"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  return (
    <form>
      <div>
        <Label>First Name</Label>
        <Input type="text" id="firstName" name="firstName" />
      </div>
      <div>
        <Label>Last Name</Label>
        <Input type="text" id="lastName" name="lastName" />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" id="email" name="email" />
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <Button>Submit</Button>
    </form>
  );
}
