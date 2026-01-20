import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    firebaseId: string;
    username: string;
    gender?: string;
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
    username: {
        type: String,
        required: [true, "Username Required"]
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'others'],
            message: '{VALUE} is not supported'
        },
        required: false,
    },
    phoneNo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true, // Recommended: ensure emails are always stored in lowercase
        match: [/.+\@.+\..+/, 'please use a valid email address']
    }
}, { timestamps: true }); // Good practice to track when users joined

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;