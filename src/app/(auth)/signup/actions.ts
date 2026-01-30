'use server'

import { redirect } from 'next/navigation';
import { authAdmin } from '@/lib/firebase-admin'; 
import dbConnect from '@/lib/dbConnect';
import User from "@/models/User";
import admin from 'firebase-admin';

export type SignUpState = {
  message?: string;
  errors?: {
    email?: string;
    phoneNo?: string;
    username?: string;
    password?: string;
  };
};

export async function handleSignUp(
  prevState: SignUpState | undefined,
  formData: FormData
): Promise<SignUpState> {

  await dbConnect();

  // 1. Trim inputs to avoid " " errors
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const username = (formData.get('username') as string)?.trim();
  const fullName = (formData.get('name') as string)?.trim() || "Not given";
  const phoneNo = (formData.get('phoneNo') as string)?.trim();

  // 2. Basic Validation
  if (!email || !password) {
    return {
      errors: {
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined,
      }
    };
  }

  if (!username || !phoneNo) {
    return {
      errors: {
        username: !username ? "Username is required" : undefined,
        phoneNo: !phoneNo ? "Phone number is required" : undefined,
      }
    };
  }

  if (!/^\d{10}$/.test(phoneNo)) {
    return { errors: { phoneNo: "Enter a valid 10-digit phone number" } };
  }

  if (password.length < 6) {
    return { errors: { password: "Password must be at least 6 characters" } };
  }

  // 3. PRE-CHECK: Check MongoDB for duplicates BEFORE calling Firebase
  // This prevents creating a Firebase user if we know Mongo will fail anyway.
  const existingUser = await User.findOne({ 
    $or: [{ email }, { username }, { phoneNo }] 
  });

  if (existingUser) {
    if (existingUser.email === email) return { errors: { email: "Email already registered" } };
    if (existingUser.username === username) return { errors: { username: "Username already taken" } };
    if (existingUser.phoneNo === phoneNo) return { errors: { phoneNo: "Phone number already used" } };
  }

  let userRecord;


  try {
    // 4. Create Firebase User
    userRecord = await authAdmin.createUser({
      email,
      password,
      displayName: username,
    });

    const newUser = await User.create({
      firebaseId: userRecord.uid,
      email,
      username,
      fullName,
      phoneNo,
    });

  } catch (error: any) {
    // ROLLBACK: If Mongo fails, delete the Firebase user
    if (userRecord?.uid) {
      try {
        await authAdmin.deleteUser(userRecord.uid);
      } catch (cleanupError) {
        // CRITICAL: Log this. This is a "Zombie Account" that needs manual fixing.
        console.error("CRITICAL: Failed to rollback Firebase user:", userRecord.uid, cleanupError);
      }
    }

    // Handle Firebase specific errors
    if (error.code === 'auth/email-already-exists') {
      return { errors: { email: "Email already registered" } };
    }

    console.error("Signup Error:", error);
    return { message: "Failed to create account. Please try again." };
  }

  // 6. Redirect on success (Must be outside try/catch in Server Actions)
  redirect('/login');
}