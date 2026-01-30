"use client";

import React from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import Profile from '@/components/global/profile';
import { UserProfile } from '@/types/UserProfile';
import { useAuthStore } from '@/zustand-store';
import { useEffect } from 'react';

const fetchUserProfile = async (): Promise<UserProfile> => {
  const token = Cookies.get('session');
  
  if (!token) throw new Error("No session token found");
  try {
    const res = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }
    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

const ProfilePage = () => {
  const login = useAuthStore((state) => state.login);
  const authUser = useAuthStore((state) => state.user);

  console.log("Zustand Auth User:", authUser);

  const token = Cookies.get('session') || "";

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    enabled: !!token && !authUser, // ✅ don't refetch if Zustand already has user
    staleTime: Infinity,
    retry: 1,
  });

  // ✅ Sync React Query → Zustand
  useEffect(() => {
    if (user && token) {
      login(user, token);
    }
  }, [user, token, login]);

  // Loading UI
  if (isLoading && !authUser) {
    return <div className="flex justify-center p-20">Loading profile...</div>;
  }

  // Error UI
  if (isError) {
    return (
      <div className="text-center p-20">
        <p>Error: {(error as Error).message}</p>
      </div>
    );
  }

  // Prefer Zustand user if exists
  const finalUser = authUser || user;

  return (
    <div>
      {finalUser && (
        <Profile
          fullName={finalUser.name}
          email={finalUser.email}
          phoneNo={finalUser.phone}
          trips={finalUser.trips}
          yearsActive={finalUser.yearsActive}
          avatarUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(finalUser.name)}`}
          username={finalUser.username || "Mountain Trekker"}
          token={token}
        />
      )}
    </div>
  );
};

export default ProfilePage;