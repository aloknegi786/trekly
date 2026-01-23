import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    firebaseId: string;
    fullName: string;
    username: string;
    phoneNo?: string;
    email: string;
}

const UserSchema: Schema<User> = new Schema({
    // Store the Firebase UID here
    firebaseId: {
        type: String,
        unique: true,
        required: true,
    },
    fullName: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "Username Required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true, 
        match: [/.+\@.+\..+/, 'please use a valid email address']
    }
}, { timestamps: true }); 

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;