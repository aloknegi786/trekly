import TrekHistory from '@/components/global/trekHistory';
import { cookies } from 'next/headers';

type TrekHistoryItem = {
  id: string;
  trekName: string;
  location: string;
  startDate: string;
  duration: string;
  status: "Completed" | "Cancelled" | "Current" | "Upcoming";
  bookingStatus: string;
};

async function getTreks(): Promise<TrekHistoryItem[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value; 

  if (!token) return [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/treks`, { 
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store', 
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.treks || [];
}

export default async function HistoryPage() {
  const treks: TrekHistoryItem[] = await getTreks();

  return (
    <div>
      <TrekHistory treks={treks} />
    </div>
  );
}