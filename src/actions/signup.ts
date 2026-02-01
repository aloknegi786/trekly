import { authAdmin } from '@/lib/firebase-admin';
import dbConnect from '@/lib/dbConnect';
import User from "@/models/User";
import { RegisterUserInput } from '@/types/auth';

export async function registerUserService(data: RegisterUserInput): Promise<{ success: boolean; errors?: any }> {
  await dbConnect();

  const { email, password, username, fullName, phoneNo } = data;

  // 1. Pre-check MongoDB (Optimization)
  // Use 'exists' for better performance than 'findOne' if you only need a boolean
  const existing = await User.findOne({ $or: [{ email }, { username }, { phoneNo }] });
  if (existing) {
    if (existing.email === email) throw new Error("EMAIL_EXISTS");
    if (existing.username === username) throw new Error("USERNAME_TAKEN");
    if (existing.phoneNo === phoneNo) throw new Error("PHONE_USED");
  }

  let firebaseUid: string | null = null;

  try {
    // 2. Create Firebase User
    const userRecord = await authAdmin.createUser({
      email,
      password,
      displayName: username,
    });
    firebaseUid = userRecord.uid;

    // 3. Create MongoDB Record
    const newUser = await User.create({
      firebaseId: firebaseUid,
      email,
      username,
      fullName,
      phoneNo,
    });

    return { success: true, errors: null };

  } catch (error: any) {
    // 4. Manual Distributed Rollback
    if (firebaseUid) {
      await authAdmin.deleteUser(firebaseUid).catch(console.error);
    }

    // Map specific errors for the caller
    if (error.code === 'auth/email-already-exists') throw new Error("EMAIL_EXISTS");
    if (error.code === 11000) throw new Error("DUPLICATE_KEY_ERROR");

    throw error; // Let the caller handle unexpected errors
  }
}