"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  Field,
  FieldSeparator,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeOffIcon } from "lucide-react";
import { SpinnerLoader } from "@/components/comps/Loader";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function signInUser() {
    const { data, error } = await authClient.signIn.email({
      email: email, // user email address
      password: password, // user password -> min 8 characters by default
      rememberMe: true,
      callbackURL: "/assistant" // A URL to redirect to after the user verifies their email (optional)
    }, {
      onRequest: (ctx) => {
        setLoading(true)
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        alert("done")
        router.push("/assistant")
        setLoading(false)
      },
      onError: (ctx) => {
        // display the error message
        setLoading(false)
        alert(ctx.error.message);
      },
    });
  }
  
  return (
    <div className="flex h-[90vh] mr-7.5 ml-7.5 pt-5 justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-4 w-100 p-5 pt-0">
        <div className="flex flex-col justify-center items-center mb-2">
          <span className="font-sans font-medium text-2xl m-0 tracking-[-0.05em]">Welcome to witness</span>
          <span className="font-sans tracking-[-0.05em] font-normal m-0 text-[#808080]">Sign in to witness to use witness AI</span>
        </div>
        <Button variant="outline" size="sm" className="rounded-full w-80">
          <Image src="/google-symbol.png" width={14} height={14} alt="Google logo" />
          <span className="font-sans font-medium tracking-[-0.05em]">Continue with google</span>
        </Button> 
        <FieldSet className="w-full max-w-xs gap-y-3">
          <FieldSeparator/>
          <FieldGroup className="gap-y-5">
            <Field orientation="responsive" className="gap-y-2">
              <FieldLabel htmlFor="email" className="font-sans tracking-[-0.05em] font-medium">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="tryingwitness@gmail.com"
                className="placeholder:text-sm placeholder:tracking-[-0.05em] placeholder:font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field orientation="responsive" className="gap-y-2">
              <FieldLabel htmlFor="password" className="font-sans tracking-[-0.05em] font-medium">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="placeholder:text-sm placeholder:tracking-[-0.05em] placeholder:font-sans"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <EyeOffIcon />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field orientation="responsive">
              <Button size="sm" className="rounded-full"onClick={signInUser}>
                {loading
                  ?
                  <SpinnerLoader />
                  :
                  <span className="font-sans tracking-[-0.05em] text-base font-normal">Sign in to your account</span>
                }
              </Button>
            </Field>
            <Field orientation="responsive" className="flex justify-center items-center h-5 p-0">
              <Button variant="link" asChild>
                <Link href="/sign-up" className="font-sans tracking-[-0.05em] text-[#808080]">Create an account</Link>
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  )
}