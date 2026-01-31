"use client";

import { TrekHistoryItemAdmin } from "@/types/trek"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

type Props = {
  booking: TrekHistoryItemAdmin
}

const updateStatus = async (bookingId: string) => {
  const res = await fetch('/api/bookings/' + bookingId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${Cookies.get('session')}`,
    },
    body: JSON.stringify({ status: "confirmed" }),
  });

  if(!res.ok){
    throw new Error("Failed to update booking status");
  }
};

export default function TrekRow({ booking }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      toast.success("Booking status updated successfully.");
      queryClient.invalidateQueries({
        predicate: (query) => 
          query.queryKey[0] === 'activeBookings' || 
          query.queryKey[0] === 'searchBookings'
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
  
  const handleStatusUpdate = () => {
    if(booking.bookingStatus === "confirmed") return;
    mutate(booking.id);
  };

  if(isPending){
    return (
      <tr className="border-b hover:bg-gray-50">
        <td colSpan={9} className="text-center py-6 text-gray-500">
          Updating status...
        </td>
      </tr>
    )
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-gray-500 font-mono text-xs">
        {booking.id}
      </td>
      <td className="px-4 py-3">{booking.customerName}</td>
      <td className="px-4 py-3">{booking.phoneNo}</td>
      <td className="px-4 py-3 font-medium">{booking.trekName}</td>
      <td className="px-4 py-3">{booking.location}</td>
      <td className="px-4 py-3">{booking.startDate}</td>
      <td className="px-4 py-3">{booking.duration}</td>
      <td className="px-4 py-3 text-center">{booking.peopleCount}</td>
      <td className="px-4 py-3">
        <button onClick={handleStatusUpdate} className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 hover:bg-red-200 hover:pointer">
          {booking.bookingStatus}
        </button>
      </td>
    </tr>
  )
}
