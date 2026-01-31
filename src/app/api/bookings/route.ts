import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { Booking } from "@/types/index.types";
import { sendMail } from "@/lib/mail";
import { adminPendingBookingMail } from "@/lib/mailTemplates";
import BookingModel from "@/models/Booking";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { Types } from "mongoose";
import TrekModel from "@/models/Trek";
import { verifySession } from "@/lib/authGuard"; 
import { ensureModelsRegistered } from "@/lib/model";
import { getToken } from "@/lib/authGuard";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    ensureModelsRegistered();

    const token = getToken(req);

    if (!token) {
       return NextResponse.json(
        { success: false, message: "Unauthorized: Missing Token" },
        { status: 401, headers: { 'Content-Type': 'application/json' }}
      );
    }

    const body = await req.json();
    const uid = await verifySession(token);
    const user = await UserModel.findOne({ firebaseId: uid });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User profile not found. Please register." },
        { status: 404, headers: { 'Content-Type': 'application/json' }} 
      );
    }
    let trek;
    if (body.trekId) {
        trek = await TrekModel.findById(body.trekId);
    } else {
        trek = await TrekModel.findOne({ destination: "Nag Tibba" }); 
    }

    if (!trek) {
      return NextResponse.json(
        { success: false, message: "Trek not found" },
        { status: 404, headers: { 'Content-Type': 'application/json' }}
      );
    }

    const booking: Booking = {
      id: uuid(),
      userId: new Types.ObjectId(user._id),
      trekId: new Types.ObjectId(trek._id),
      startDate: new Date(body.startDate), 
      persons: Number(body.persons),     
      amount: Number(body.amount),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await BookingModel.create(booking);

    const mail = await adminPendingBookingMail(booking);
    
    if (process.env.NODE_ENV === "production") {
        console.log("Sending Email...");
        await sendMail(
          process.env.ADMIN_EMAIL!,
          mail.subject,
          mail.html
        );
        console.log("Mail sent successfully");
    }

    return NextResponse.json(
      { success: true, booking },
      { status: 201, headers: { 'Content-Type': 'application/json' }}
    );

  } catch (error: any) {
    console.error("Booking creation failed:", error);
    
    if (error.message.includes("Unauthorized")) {
        return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { success: false, message: error.message || "Failed to create booking" },
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}