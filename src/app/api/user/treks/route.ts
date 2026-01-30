import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "@/actions/user";
import dbConnect from "@/lib/dbConnect";
import BookingModel from "@/models/Booking";
import TrekModel from "@/models/Trek"; 
import { getToken } from "@/lib/authGuard";
import { TrekHistoryItem } from "@/types/trek";
import { bookings }  from "@/constants/bookedData";

export async function GET(req: NextRequest) {

  return NextResponse.json({ success: true, treks: bookings }, { status: 200 });

  try {
    await dbConnect();
    const token = getToken(req);
    const user = await getUserInfo(token);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const bookings = await BookingModel.find({ userId: user._id });

    const formattedTreks = await Promise.all(
      bookings.map(async (booking) => {
        const trekDetails = await TrekModel.findById(booking.trekId);

        let displayStatus = "Upcoming";
        let bookingStatus = "Booking Confirmation Pending";

        const now = new Date();
        const startDate = new Date(booking.startDate);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 2);

        if (now > endDate) {
          displayStatus = "Completed"; 
        } else if (now >= startDate) {
          displayStatus = "Current"; 
        }

        if (booking.status === "confirmed") {
          bookingStatus = "Booking Confirmed !!";
        }
        return {
          id: booking._id.toString(),
          trekName: trekDetails ? trekDetails.destination : "Unknown Trek",
          location: "Uttarakhand", 
          duration: trekDetails ? `${trekDetails.duration} Days` : "N/A",
          startDate: new Date(booking.startDate).toLocaleDateString('en-GB', {
             day: 'numeric', month: 'short', year: 'numeric' 
          }), 
          status: displayStatus, 
          bookingStatus: bookingStatus,
        };
      })
    );

    return NextResponse.json({ success: true, treks: formattedTreks }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Unauthorized" },
      { status: 401 }
    );
  }
}