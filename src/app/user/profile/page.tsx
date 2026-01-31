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
  const authUser = useAuthStore((state) => state.user);

  console.log("Zustand Auth User:", authUser);


  return (
    <div>
      {authUser && (
        <Profile
          fullName={authUser.name}
          email={authUser.email}
          phoneNo={authUser.phone}
          trips={authUser.trips}
          yearsActive={authUser.yearsActive}
          avatarUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.name)}`}
          username={authUser.username || "Mountain Trekker"}
          token={authUser.token}
        />
      )}
    </div>
  );
};

export default ProfilePage;