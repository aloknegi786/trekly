import { TrekHistoryItemAdmin } from "@/types/trek"
import Cookies from "js-cookie"
import toast from "react-hot-toast"

type Props = {
  booking: TrekHistoryItemAdmin
}

export default function TrekRow({ booking }: Props) {

  const updateStatus = async () => {
    const res = await fetch('/api/bookings/' + booking.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Cookies.get('session')}`,
      },
      body: JSON.stringify({ status: "confirmed" }),
    });

    if(res.ok){
      toast.success("Booking status updated to confirmed");
    } else {
      toast.error("Failed to update booking status");
    }
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-gray-500 font-mono text-xs">
        #{booking.id}
      </td>
      <td className="px-4 py-3">{booking.customerName}</td>
      <td className="px-4 py-3">{booking.phoneNo}</td>
      <td className="px-4 py-3 font-medium">{booking.trekName}</td>
      <td className="px-4 py-3">{booking.location}</td>
      <td className="px-4 py-3">{booking.startDate}</td>
      <td className="px-4 py-3">{booking.duration}</td>
      <td className="px-4 py-3 text-center">{booking.peopleCount}</td>
      <td className="px-4 py-3">
        <button onClick={updateStatus} className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 hover:bg-red-200">
          {booking.bookingStatus}
        </button>
      </td>
    </tr>
  )
}
