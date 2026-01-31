"use client";

import { useEffect, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Cookies from 'js-cookie';

import TrekFilters from "@/components/global/admin/TrekFilters";
import TrekTable from "@/components/global/admin/TrekTable";
import { MOCK_TREK_HISTORY_ADMIN } from "@/constants/bookedData";
import { TrekHistoryItemAdmin } from "@/types/trek";

type Filters = {
  username: string;
  fromDate: string;
  bookingId: string;
};

const fetchSearchBookings = async (
  filters: Filters
): Promise<TrekHistoryItemAdmin[]> => {
  try {
    const token = Cookies.get('session');

    const queryParams = new URLSearchParams(filters).toString();

    const response = await fetch(`/api/admin/searchBookings?${queryParams}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch active bookings');
    }

    const res = await response.json();
    return res.data as TrekHistoryItemAdmin[];
  } catch (error) {
    console.error('Error fetching active bookings:', error);
    return [] as TrekHistoryItemAdmin[];
  }
};

function SearchBookingContent() {
  const searchParams = useSearchParams();

  const filters = useMemo<Filters>(() => ({
    username: searchParams.get("username") ?? "",
    fromDate: searchParams.get("fromDate") ?? "",
    bookingId: searchParams.get("bookingId") ?? "",
  }), [searchParams]);

  const hasAnyFilter = Object.values(filters).some(val => val !== "");

  const { data: bookings = [], isLoading, isError } = useQuery<TrekHistoryItemAdmin[]>({
    queryKey: ["searchBookings", filters],
    queryFn: () => fetchSearchBookings(filters),
    enabled: hasAnyFilter,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
      <TrekFilters filters={filters} />
      {isLoading ? (
        <div>Loading bookings...</div>
      ) : isError ? (
        <div>Error loading bookings. Please try again.</div>
      ) : bookings.length === 0 ? (
        <div>No bookings found for the given filters.</div>
      ) : (
        <TrekTable bookings={bookings} />
      )}
    </div>
  );
}

export default function SearchBookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchBookingContent />
    </Suspense>
  );
}