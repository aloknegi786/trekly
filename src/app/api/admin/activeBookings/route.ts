// generate code to fetch active bookings from the database
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BookingModel from '@/models/Booking';
import { Booking } from '@/types/index.types';
import { Types } from 'mongoose'; 
import TrekModel from '@/models/Trek';
import UserModel from '@/models/User';
import { TrekHistoryItemAdmin } from '@/types/trek';

// export type TrekHistoryItem = {
//   id: string; 
//   trekName: string;
//   location: string;
//   startDate: string;
//   duration: string;
//   status: "Completed" | "Cancelled" | "Current" | "Upcoming";
//   bookingStatus: string;
//   peopleCount?: number
// };

// export type TrekHistoryItemAdmin = TrekHistoryItem & {
//     customerName: string
//     phoneNo: string;
// };

export async function GET() {
  try {
    await dbConnect();
    
    const today = new Date();
    const twoDaysFromToday = new Date(today);
    twoDaysFromToday.setDate(today.getDate() + 2);

    const activeBookings: Booking[] = await BookingModel.find({
      startDate: {
        $gte: today,
        $lte: twoDaysFromToday
      }
    });

    const formattedBookings = activeBookings.map(async (booking) =>{
        const userId = booking.userId as Types.ObjectId;
        const trekId = booking.trekId as Types.ObjectId;
        const user = await UserModel.findById(userId);
        const trek = await TrekModel.findById(trekId);

        // if(!user || !trek) {
        //     console.warn(`User or Trek not found for booking ID: ${booking.id}`);
        //     return null;
        // }
        return {
            id: booking.id,
            customerName: user?.fullName || "Unknown Customer",
            trekName: trek?.destination || "Unknown Trek",
            location: trek?.location || "Unknown Location",
            startDate: booking.startDate.toISOString().split('T')[0],
            duration: trek ? `${trek.duration} days` : "Unknown Duration",
            bookingStatus: booking.status,
            status: "Current",
            peopleCount: booking.persons,
            amountPaid: booking.amount,
            phoneNo: user?.phoneNo || "N/A"
        } as TrekHistoryItemAdmin;
    });
    const resolvedBookings = await Promise.all(formattedBookings);
    const validBookings = resolvedBookings.filter(booking => booking !== null) as TrekHistoryItemAdmin[];
    
    return NextResponse.json(
      { success: true, data: validBookings },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
};