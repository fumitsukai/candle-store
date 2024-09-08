"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "./action";
import { useFormState } from "react-dom";

export default function SignUp() {
  const [error, dispatch] = useFormState(signup, {});
  return (
    <form action={dispatch}>
      <div>
        <Label>First Name</Label>
        <Input type="text" id="firstName" name="firstName" />
        {error?.firstName && <div>{error.firstName}</div>}
      </div>
      <div>
        <Label>Last Name</Label>
        <Input type="text" id="lastName" name="lastName" />
        {error?.lastName && <div>{error.lastName}</div>}
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" id="email" name="email" />
        {error?.email && <div>{error.email}</div>}
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" id="password" name="password" />
        {error?.password && <div>{error.password}</div>}
      </div>
      {error?.message && <div>{error.message}</div>}
      <Button>Submit</Button>
    </form>
  );
}
