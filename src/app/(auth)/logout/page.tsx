"use client";

import { useAuthStore } from "@/zustand-store";
import Cookies from "js-cookie";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Logout = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // 1. Sign out from Firebase
        await signOut(auth);

        // 2. Clear Browser Storage/Cookies
        Cookies.remove("session");

        // 3. Clear Global State (Zustand)
        logout();

        // 4. Client-side navigation
        router.push('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    performLogout();
  }, [logout, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg font-medium">Logging you out...</p>
        <p className="text-sm text-muted-foreground">Cleaning up your session securely.</p>
      </div>
    </div>
  );
};

export default Logout;