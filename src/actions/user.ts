"use server";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { verifySession } from "@/lib/authGuard";

export const getUserInfo = async (token: string) => {
  try {
    const uid = await verifySession(token); 

    await dbConnect();

    const user = await User.findOne({ firebaseId: uid });
    
    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.error("Error fetching user info:", error);
    throw new Error(error.message || "Failed to fetch user info");
  }
};

export const createUser = async (token: string, userData: any) => {
  try {
    const uid = await verifySession(token);

    if (userData.firebaseId !== uid) {
      throw new Error("Forbidden: UID mismatch");
    }

    await dbConnect();

    const existingUser = await User.findOne({ firebaseId: uid });
    if (existingUser) {
      return JSON.parse(JSON.stringify(existingUser));
    }

    if(userData.phoneNo === undefined) {
      userData.phoneNo = `${userData.email.split('@')[0]}-phone`; // uunique constraint workaround
    }

    const newUser = await User.create(userData);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw new Error(error.message || "Failed to create user");
  }
};

export const updateInfo = async (token: string, data: any) => {
  try {
    const uid = await verifySession(token);

    await dbConnect();
    const updatedUser = await User.findOneAndUpdate(
      { firebaseId: uid },
      { $set: data },
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return NextResponse.json(
            { success: false, message: "User not found or update failed" },
            { status: 400 }
      );
    }

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error: any) {
    console.error("Error updating user info:", error);
    return NextResponse.json(
          { success: false, message: error.message || "Failed to update user info" },
          { status: 400 }
    );
  }
};

export const deleteUser = async (token: string) => {
  try {
    const uid = await verifySession(token);

    await dbConnect();
    
    const deletedUser = await User.findOneAndDelete({ firebaseId: uid });

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    throw new Error(error.message || "Failed to delete user");
  }
};