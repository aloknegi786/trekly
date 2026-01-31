"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
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

  setUser: (user: Partial<UserProfile>) => void;
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

      setUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : (userData as UserProfile),
        })),

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
      name: "auth-storage",
    }
  )
);
