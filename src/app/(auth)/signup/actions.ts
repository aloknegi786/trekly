'use server'

import { redirect } from 'next/navigation';
import { authAdmin } from '@/lib/firebase-admin'; 
import dbConnect from '@/lib/dbConnect';
import User from "@/models/User";

// 1. Define a return type for type safety
export type SignUpState = {
  message?: string;
  errors?: {
    email?: string;
    username?: string;
    password?: string;
  };
} | undefined;

// 2. Add 'prevState' as the first argument (required for useActionState)
export async function handleSignUp(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
  await dbConnect();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;
  const fullName = formData.get('name') as string || "Not given";

  try {
    // Basic validation logic (optional but recommended)
    if (!email || !password) {
        return { message: "Email and password are required." };
    }

    console.log("firebase registering user")
    const userRecord = await authAdmin.createUser({
      email,
      password,
      displayName: username,
    });
    
    console.log("Saved in firebase and saving now in database");
    await User.create({
        firebaseId: userRecord.uid,
        email: email,
        username,
        fullName,
      }
    );

    console.log("Sign-up Successful");

  } catch (error: any) {
    console.error("Signup error:", error);

    // 3. Handle Duplicate Errors nicely
    if (error.code === 'auth/email-already-exists') {
        return { 
            message: "This email is already registered. Please log in.",
            errors: { email: "Email taken" }
        };
    }

    // Generic fallback
    return { message: "Failed to create account. Please try again." };
  }

  // 4. Redirect MUST happen outside try/catch because it throws an internal error
  redirect('/login');
}