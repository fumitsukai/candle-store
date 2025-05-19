"use client";

import HeaderBack from "@/components/header_back";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePass } from "./action";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

export default function ChangePassword() {
  const [error, dispatch] = useFormState(changePass, {});
  return (
    <>
      <HeaderBack url="/view-profile" name="change password" />
      <form action={dispatch} className="bg-lightkeeper-white p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="old_password" className="font-medium">
            CURRENT PASSWORD
          </Label>
          <Input type="password" name="old_password" id="old_password" />
          {error?.old_password && (
            <div className="font-thin text-red-500">{error.old_password}</div>
          )}
          {error?.code === "INCORRECT_CURRENT" && (
            <div className="font-thin text-red-500 text-xs">
              {error.message}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="new_password" className="font-medium">
            NEW PASSWORD
          </Label>
          <Input type="password" name="new_password" id="new_password" />
          {error?.new_password && (
            <div className="font-thin text-red-500 text-xs">
              {error.new_password}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm_new_password" className="font-medium">
            CONFIRM NEW PASSWORD
          </Label>
          <Input
            type="password"
            name="confirm_new_password"
            id="confirm_new_password"
          />
          <div className="font-thin text-xs">
            Password must be 1 or more characters
          </div>
        </div>

        {error?.code === "MISMATCH" && (
          <div className="font-thin text-red-500 text-xs">{error.message}</div>
        )}
        <Button type="submit" className="w-full">
          CHANGE PASSWORD
        </Button>
      </form>
    </>
  );
}
