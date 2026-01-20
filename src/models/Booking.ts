import mongoose, { Schema, Document, Types } from "mongoose";

export interface Booking extends Document {
    userId: Types.ObjectId; 
    trekId: Types.ObjectId;
    paymentId: Types.ObjectId;
    startTime: Date;
    endTime: Date;
}

const BookingSchema: Schema<Booking> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    trekId: {
        type: Schema.Types.ObjectId,
        ref: "Trek", 
        required: true
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    }
});

const BookingModel = 
    (mongoose.models.Booking as mongoose.Model<Booking>) || 
    mongoose.model<Booking>("Booking", BookingSchema);

export default BookingModel;