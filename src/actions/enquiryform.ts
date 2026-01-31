"use server";

import nodemailer from 'nodemailer';

interface EnquiryData {
    fullName: string;
    email: string;
    phoneNumber: string;
    date: string;
    message: string;
}

export type ActionState = {
  success?: boolean;
  error?: string;
} | null;

export async function handleEnquiryAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    // 1. Extraction with Null Checks
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phoneNumber = formData.get("phoneNumber");
    const date = formData.get("date");
    const message = formData.get("message");

    // 2. Validate existence before casting
    if (!fullName || !email || !phoneNumber || !date) {
      return { error: "All fields are required." };
    }

    // Now they are guaranteed to be strings (if not files)
    const rawData: EnquiryData = {
      fullName: fullName.toString(),
      email: email.toString(),
      phoneNumber: phoneNumber.toString(),
      date: date.toString(),
      message: message?.toString() || "",
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Trek Enquiry from ${rawData.fullName}`,
      text: `
        New Enquiry Details:  
        -------------------
        Name: ${rawData.fullName}
        Email: ${rawData.email}
        Phone: ${rawData.phoneNumber}
        Trek Date: ${rawData.date}
        
        Message:
        ${rawData.message}
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true};

  } catch (error) {
    console.error("Email Error:", error);
    return { error: "Failed to send email. Please try again later.", success: false};
  }
}