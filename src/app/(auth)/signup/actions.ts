'use server'

import { redirect } from 'next/navigation';
// Use firebase-admin on the server for extra security
import { authAdmin } from '@/lib/firebase-admin'; 
import dbConnect from '@/lib/dbConnect';
import User from "@/models/User";

export async function handleSignUp(formData: FormData) {
   await dbConnect();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  try {
    // 1. Create User in Firebase
    const userRecord = await authAdmin.createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Save User to your custom DB
    await User.create({
        firebaseId: userRecord.uid,
        email: email,
        username: name,
      }
    );

    console.log("Sign-up Successfull");

  } catch (error) {
    console.error(error);
    throw new Error("Failed to create account");
  }

  redirect('/dashboard');
}