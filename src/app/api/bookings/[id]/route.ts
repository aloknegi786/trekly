import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { userBookingConfirmedMail } from "@/lib/mailTemplates";
import BookingModel from "@/models/Booking";
import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";


export async function PUT(req: NextRequest, { params }: {params: Promise<{id: string}>}) {
  try {
    await dbConnect();

    const body = await req.json();
    // this id is the unique uuid you gave using uuid function
    const { id: bookingId } = await params;

    const oldBooking = await BookingModel.findOne({ id: bookingId });
    if (!oldBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }
    const updatedBooking = await BookingModel.findOneAndUpdate(
      { id: bookingId },
      { $set: { status: body.status  || "confirmed"} },
      { new: true }
    );

    if(!updatedBooking){
        return NextResponse.json(
            {success: false, message: "Could not update the booking status."},
            {status: 500}
        )
    }

    if (body.status === "confirmed") {
      const user = await UserModel.findById(oldBooking.userId); 
      
      if (user && user.email && process.env.NODE_ENV === "production") {
        const mail = await userBookingConfirmedMail(updatedBooking);
        await sendMail(
          user.email,
          mail.subject,
          mail.html
        );
        console.log(`Confirmation mail sent to the Mr. ${user.fullName}!`);
      } else {
        console.warn("User not found or no email, skipping email notification.");
      }
    }

    console.log("Booking Verified Successfully");
    return NextResponse.json({
      success: true,
      bookingId,
      status: body.status,
    });

  } catch (error) {
    console.error("Update Booking Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}