"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./action";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
  const [error, dispatch] = useFormState(login, {});
  return (
    <form
      className="flex flex-col mx-2 mt-4 border shadow-md p-5 space-y-2 rounded-md"
      action={dispatch}
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
        <div>{error?.email && <p>{error.email}</p>}</div>
      </div>
      <Label htmlFor="password">Password</Label>
      <div>
        <Input type="password" className="mb-4" id="password" name="password" />
        <div>{error?.password && <p>{error.password}</p>}</div>
      </div>
      <div>{error && <p>{error.message}</p>}</div>
      <Button type="submit">Login</Button>
      <div className="border-t">
        <div className="flex">
          <p>Don't have an account?</p>
          <Link href="/signup">
            <span className="decoration-slate-900">Create one</span>
          </Link>
        </div>
      </div>
    </form>
  );
}
