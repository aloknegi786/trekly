// api end point for signup
import { NextResponse } from "next/server";
import { registerUserService } from "@/actions/signup";
import { RegisterUserInput } from '@/types/auth';

export async function POST(request: Request) {

    // try catch for following code
    try {
        const formData = await request.formData();

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const username = formData.get("username") as string;
        const fullName = formData.get("fullName") as string;
        const phoneNo = formData.get("phoneNo") as string;
        console.log("Received signup data:", { email, username, fullName, phoneNo, password });

        // validate required fields
        if (!email || !password || !username || !fullName || !phoneNo) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        // format validation 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNo)) {
            return NextResponse.json({ success: false, message: "Invalid phone number format" }, { status: 400 });
        }

        const data: RegisterUserInput = {
            email,
            password,
            username,
            fullName,
            phoneNo
        };

        const result = await registerUserService(data);
        if (result.success === false || result.errors) {
            return NextResponse.json(result, { status: 400 });
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("API Signup Error:", error);
        return NextResponse.json({ success: false, message: (error as Error).message || "Internal Server Error" }, { status: 500 });
    }
}
