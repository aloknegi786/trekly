import dbConnect from '@/lib/dbConnect';
import BookingModel from '@/models/Booking';
import UserModel from '@/models/User';
import TrekModel from '@/models/Trek';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);

        const bookingId = searchParams.get('bookingId');
        const customerName = searchParams.get('customerName');
        const trekDestination = searchParams.get('trekDestination');
        const fromDate = searchParams.get('fromDate');
        const toDate = searchParams.get('toDate');

        const filter: any = {};

        if (bookingId) {
            filter.id = bookingId; 
        }

        if (fromDate || toDate) {
            filter.bookingDate = {};
            if (fromDate && !isNaN(Date.parse(fromDate)))
                filter.bookingDate.$gte = new Date(fromDate);
            if (toDate && !isNaN(Date.parse(toDate)))
                filter.bookingDate.$lte = new Date(toDate);
        }


        if (customerName) {
            const users = await UserModel.find({
                fullName: { $regex: customerName, $options: 'i' }
            }).select('_id');
            
            const userIds = users.map(user => user._id);
            filter.userId = { $in: userIds };
        }

        if (trekDestination) {
            const treks = await TrekModel.find({
                destination: { $regex: trekDestination, $options: 'i' }
            }).select('_id');

            const trekIds = treks.map(trek => trek._id);
            filter.trekId = { $in: trekIds };
        }


        const bookings = await BookingModel.find(filter)
            .populate('userId', 'fullName phoneNo')
            .populate('trekId', 'destination location duration')
            .sort({ bookingDate: -1 });

        const formattedBookings = bookings.map((booking: any) => ({
            id: booking.id,
            customerName: booking.userId?.fullName || "Unknown Customer",
            trekName: booking.trekId?.destination || "Unknown Trek",
            location: booking.trekId?.location || "Unknown Location",
            startDate: booking.startDate,
            duration: booking.trekId ? `${booking.trekId.duration} days` : "Unknown Duration",
            bookingStatus: booking.status,
            peopleCount: booking.persons,
            amountPaid: booking.amount,
            phoneNo: booking.userId?.phoneNo || "N/A"
        }));

        return NextResponse.json({ bookings: formattedBookings }, { status: 200 });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, message: 'Error fetching bookings', error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}