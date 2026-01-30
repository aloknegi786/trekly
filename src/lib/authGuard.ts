import { authAdmin } from "@/lib/firebase-admin";
import { NextRequest } from "next/server";

export const verifySession = async (token: string): Promise<string> => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const decodedToken = await authAdmin.verifyIdToken(token);
  
    return decodedToken.uid; 
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Unauthorized: Invalid token");
  }
};

export const getToken = (req: NextRequest): string => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  const token = authHeader.split(" ")[1];
  
  if (!token) {
    throw new Error("Token not found in Authorization header");
  }
  return token;
};