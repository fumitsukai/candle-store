"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./action";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GoogleSignIn from "@/components/googleSignIn";
import FormError from "@/components/form-error";
import LoginHeader from "@/public/img/login-header2.png";
import Image from "next/image";

export default function Login() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect") ?? "/view-profile";
  const [error, dispatch] = useFormState(login, {});
  return (
    <>
      <div className="max-w-md mx-auto w-full">
        <div className="w-full relative h-52 sm:h-56 md:h-64 overflow-hidden">
          <Image
            src={LoginHeader}
            alt="Cover image"
            className="w-full h-full object-cover"
          />
        </div>
        <form
          className="flex flex-col px-6 py-8 sm:py-10 lg:px-12 lg:py-12 bg-lightkeeper-white"
          action={dispatch}
        >
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl tracking-wide font-semibold">Welcome!</h1>
            <h2 className="font-light">
              Enter your email and password to log in
            </h2>
          </div>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="mb-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-lightkeeper-gray font-medium uppercase text-sm"
              >
                EMAIL:
              </Label>
              <Input type="email" id="email" name="email" />
              <div>{error?.email && <FormError error={error.email} />}</div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-lightkeeper-gray font-medium uppercase"
              >
                PASSWORD:
              </Label>
              <Input
                type="password"
                className="mb-4"
                id="password"
                name="password"
              />
              <div>
                {error?.password && <FormError error={error.password} />}
              </div>
            </div>
            <div>{error && <FormError error={error.message} />}</div>
          </div>
          <Button type="submit" className="uppercase tracking-wide font-medium">
            Login
          </Button>
          <div className="my-4 text-center text-lightkeeper-darkgray font-thin">
            <div className="inline-flex items-center gap-1">
              <p>Don't have an account?</p>
              <Link href="/signup">
                <span className="text-lightkeeper-accent font-medium hover:underline">
                  Create one
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <hr className="flex-grow border-t border-lightkeeper-gray" />
            <span className="mx-4  text-lightkeeper-darkgray">or</span>
            <hr className="flex-grow border-t border-lightkeeper-gray" />
          </div>
          <div id="social-media" className="flex justify-center">
            <GoogleSignIn />
          </div>
        </form>
      </div>
    </>
  );
}
