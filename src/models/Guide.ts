import mongoose, { Schema, Document, Mongoose } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export interface Camp extends Document {
    guideId: string;
    name: string;
    phoneNo: number;
    gender: string;
    email: string;
}

const CampSchema: Schema<Camp> = new Schema({
    guideId: {
        type: String,
        unique: true,
        default: () => uuidv4(),
    },
    name: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
});


const CampModel = (mongoose.models.Camp as mongoose.Model<Camp>) || (mongoose.model<Camp>("Camp", CampSchema));

export default CampModel;