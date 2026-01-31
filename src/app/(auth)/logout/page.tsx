"use client";

import { useAuthStore } from "@/zustand-store";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Logout = async () => {
  const logout = useAuthStore((state) => state.logout);

  await signOut(auth);
  Cookies.remove("session");
  
  // Perform logout actions
  logout();
  
  return redirect('/login');
};

export default Logout;