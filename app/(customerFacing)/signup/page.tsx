"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "./action";
import { useFormState } from "react-dom";

export default function SignUp() {
  const [error, dispatch] = useFormState(signup, {});
  return (
    <>
      <h1 className="mx-4 font-bold mt-4">Sign Up</h1>
      <form
        action={dispatch}
        className="flex flex-col mx-2 mt-4 border shadow-md p-5 space-y-2 rounded-md"
      >
        <div>
          <Label>First Name</Label>
          <Input type="text" id="firstName" name="firstName" />
          {error?.firstName && (
            <div className="text-red-400 text-xs">{error.firstName}</div>
          )}
        </div>
        <div>
          <Label>Last Name</Label>
          <Input type="text" id="lastName" name="lastName" />
          {error?.lastName && (
            <div className="text-red-400 text-xs">{error.lastName}</div>
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" id="email" name="email" />
          {error?.email && (
            <div className="text-red-400 text-xs">{error.email}</div>
          )}
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" id="password" name="password" />
          {error?.password &&
            error.password.map((line, index) => (
              <div key={index} className="text-red-400 text-xs">
                {line}
              </div>
            ))}
        </div>
        {error?.message && (
          <div className="text-red-400 text-sm">{error.message}</div>
        )}
        <Button>Submit</Button>
      </form>
    </>
  );
}
