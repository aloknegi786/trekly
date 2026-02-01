'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

// 1. Refactored fetcher: Throws on failure so React Query catches the error
const formSubmit = async (formData: FormData) => {
  const response = await fetch('/signup/api', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (!response.ok) {
    // Throwing allows useMutation to trigger the 'onError' callback
    throw new Error(result.message || result.errors?.email || "Signup failed");
  }

  return result; // This goes to onSuccess
}

export default function SignUpPage() {
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: formSubmit,
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      router.push('/login');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData); // Using 'mutate' instead of 'mutateAsync' for cleaner callback usage
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Join us and start your journey today 🚀</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* 2. Using the 'error' object from React Query */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-600 rounded-md text-sm text-center">
                {error.message}
              </div>
            )}

            <Input
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="h-11"
              required
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
              className="h-11"
            />

            <Input
              name="phoneNo"
              type="tel"
              placeholder="Phone Number*"
              required
              className="h-11"
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

          {/* Login link omitted for brevity */}
        </CardContent>
      </Card>
    </div>
  )
}