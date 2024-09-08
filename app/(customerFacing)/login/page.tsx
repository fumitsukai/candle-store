"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./action";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [error, dispatch] = useFormState(login, {});
  return (
    <form className="flex flex-col container" action={dispatch}>
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" name="email" />
      <div>{error?.email && <p>{error.email}</p>}</div>
      <Label htmlFor="password">Password</Label>
      {/* <Input type="password" />
      <Label htmlFor="confirmPassword">CONFIRM PASSWORD</Label> */}
      <Input type="password" className="mb-4" id="password" name="password" />
      <div>{error?.password && <p>{error.password}</p>}</div>
      <div>{error && <p>{error.message}</p>}</div>
      <Button type="submit">Login</Button>
    </form>
  );
}
