import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from '@/types/UserProfile';

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthState = {
  user: UserProfile | null;
  token: string | null;
  isLogin: boolean;
  isAdmin: boolean;

  login: (user: UserProfile, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogin: false,
      isAdmin: false,

      login: (user, token) =>
        set({
          user,
          token,
          isLogin: true,
          isAdmin: user.isAdmin,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isLogin: false,
          isAdmin: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
