'use client'

import { useActionState } from "react";
import { handleSignUp } from "./actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  const [state, action, isPending] = useActionState(handleSignUp, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Join us and start your journey today 🚀</CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action} className="flex flex-col gap-4">
            
            {state?.message && (
                <div className="p-3 bg-red-100 border border-red-200 text-red-600 rounded-md text-sm text-center">
                    {state.message}
                </div>
            )}

            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              className="h-11"
            />

            <Input
              name="username"
              type="text"
              placeholder="Username*"
              required
              className="h-11"
            />

            <Input
              name="email"
              type="email"
              placeholder="Email Address*"
              required
              className={`h-11 ${state?.errors?.email ? "border-red-500" : ""}`}
            />
            
            <Input
              name="password"
              type="password"
              placeholder="Password*"
              required
              className="h-11"
            />

            <Button
              type="submit"
              disabled={isPending}
              className="h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-wide"
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-orange-600 font-medium hover:underline">
              Log in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}