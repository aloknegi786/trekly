import mongoose, { Schema, Document, Mongoose } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface Trek extends Document {
    trekId: string;
    destination: string;
    duration: Number;
    descriiption: string;
    fare: Number
}

const TrekSchema: Schema<Trek> = new Schema({
    trekId: {
        type: String,
        unique: true,
        default: () => uuidv4(),
    },
    destination: {
        type: String,
        required: [true, "destination name is required"]
    },
    descriiption: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: [true, "phone number required"]
    }
});


const TrekModel = (mongoose.models.Trek as mongoose.Model<Trek>) || (mongoose.model<Trek>("Trek", TrekSchema));

export default TrekModel;