"use client";

import { useQuery } from '@tanstack/react-query';
import TrekHistory from '@/components/global/trekHistory';
import Cookies from 'js-cookie';
import { TrekHistoryItem } from '@/types/trek';

const fetchTreks = async (): Promise<TrekHistoryItem[]> => {
  try {
    const token = Cookies.get('session');
    const res = await fetch('/api/user/treks', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    
    if (!data.treks) return [];
    return data.treks;
  } catch (error) {
    console.error("Error fetching treks:", error);
    throw error;
  }
};

const TrekHistoryPage = () => {
  const { data: treks, isLoading, isError } = useQuery({
    queryKey: ['treks'],
    queryFn: fetchTreks,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 mins
    retry: 1,
  });

  if (isLoading) {
    return <div className="flex justify-center p-20">Loading trek history...</div>;
  }

  if (isError) {
    return <div className="text-center p-20 text-red-500">Error loading trek history</div>;
  }

  return (
    <div>
      <TrekHistory treks={treks ?? []} />;
    </div>
  );
}

export default TrekHistoryPage;