"use client";

import { useAuthStore } from "@/zustand-store";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";

const Logout = () => {
  const logout = useAuthStore((state) => state.logout);

  signOut(auth);
  Cookies.remove("session");
  
  // Perform logout actions
  logout();
  
  return redirect('/login');
};

export default Logout;