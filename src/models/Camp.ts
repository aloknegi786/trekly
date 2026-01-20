import mongoose, { Schema, Document, Mongoose } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export interface Camp extends Document {
    campId: string;
    name: string;
    description?: string;
}

const CampSchema: Schema<Camp> = new Schema({
    campId: {
        type: String,
        unique: true,
        default: () => uuidv4(),
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
});


const CampModel = (mongoose.models.Camp as mongoose.Model<Camp>) || (mongoose.model<Camp>("Camp", CampSchema));

export default CampModel;