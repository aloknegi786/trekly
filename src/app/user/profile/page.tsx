"use client";

import React from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import Profile from '@/components/global/profile';
import { UserProfile } from '@/types/UserProfile';

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
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const token = Cookies.get('session') || "";

  if (isLoading) {
    return <div className="flex justify-center p-20">Loading adventure data...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-20">
        <p className="text-black-500">Error: {(error as Error).message}</p>
      </div>  
    );
  }

  // 3. Render Profile
  return (
    <div>
      {user && (
        <Profile
          fullName={user.name}
          email={user.email}
          phoneNo={user.phone}
          trips={user.trips}
          yearsActive={user.yearsActive}
          avatarUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          username={user.username || "Mountain Trekker"}
          token={token}
        />
      )}
    </div>
  );
};

export default ProfilePage;