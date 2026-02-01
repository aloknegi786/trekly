import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // 1. Check if we have a connection
  if (connection.isConnected) {
    return;
  }

  try {
    // 2. Add 'bufferCommands: false' to prevent serverless timeouts
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      bufferCommands: false, 
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");

  } catch (error) {
    console.error("Database connection failed", error);
    
    // 3. DO NOT use process.exit(1) here.
    // Let the error throw so the specific API route fails, 
    // but the server instance stays alive for other users.
    throw new Error("Failed to connect to database"); 
  }
}

export default dbConnect;