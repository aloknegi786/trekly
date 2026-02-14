import { NextRequest, NextResponse } from "next/server";
import { 
  getUserInfo, 
  createUser, 
  updateInfo, 
  deleteUser 
} from "@/actions/user";
import dbConnect from "@/lib/dbConnect";
import BookingModel from "@/models/Booking";
import UserModel from "@/models/User";
import { verifySession } from "@/lib/authGuard";
import { getToken } from "@/lib/authGuard";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = getToken(req);
    const user = await getUserInfo(token);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const bookings = await BookingModel.find({ userId: user._id });
    const tripsCount = bookings.length;

    const joinedDate = new Date(user.createdAt || Date.now());
    const currentDate = new Date();
    let yearsActive = currentDate.getFullYear() - joinedDate.getFullYear();
    const formattedUser = {
      name: user.fullName,
      username: user.username || "Mountain Trekker", 
      email: user.email,
      phone: user.phoneNo || "", 
      trips: tripsCount,
      yearsActive: yearsActive,
      isAdmin: user.email === process.env.ADMIN_EMAIL ? true : false,
    };

    return NextResponse.json({ success: true, user: formattedUser }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Unauthorized" }, 
      { status: 401 }
    );
  }
}
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const token = getToken(req);
    const body = await req.json();

    const existingUser = await UserModel.findOne({ firebaseId: body.firebaseId });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" }, 
        { status: 200  } 
      );
    }

    const newUser = await createUser(token, body);

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 400 } 
    );
  }
}

// ... existing imports

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const token = getToken(req);
    
    const body = await req.json();

    const uid = await verifySession(token);
    const cleanUpdateData: any = await UserModel.findOne({firebaseId: uid});
    console.log("Clean Update Data:", body);
    if (body.name) cleanUpdateData.fullName = body.fullName;
    if (body.username) cleanUpdateData.username = body.username;
    if (body.phoneNo) cleanUpdateData.phoneNo = body.phoneNo;

    if (Object.keys(cleanUpdateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updatedUser = await updateInfo(token, cleanUpdateData);
    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });

  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update profile" }, 
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const token = getToken(req);
    
    await deleteUser(token);

    return NextResponse.json(
      { success: true, message: "User deleted successfully" }, 
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}