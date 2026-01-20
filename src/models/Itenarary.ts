import mongoose, { Schema, Document, Types } from "mongoose";

export interface Itenarary extends Document {
    trekId: Types.ObjectId; 
    campId: Types.ObjectId;
    orderNo: number;
    distanceFromSource: number;
}

const ItenararySchema: Schema<Itenarary> = new Schema({
    trekId: {
        type: Schema.Types.ObjectId,
        ref: "Trek",
        required: true
    },
    campId: {
        type: Schema.Types.ObjectId,
        ref: "Camp",
        required: true
    },
    orderNo: {
        type: Number,
        required: true,
        default: 1
    },
    distanceFromSource: {
        type: Number,
        required: true,
        default: 0
    }
});


const ItenararyModel = 
    (mongoose.models.Itenarary as mongoose.Model<Itenarary>) || 
    mongoose.model<Itenarary>("Itenarary", ItenararySchema);

export default ItenararyModel;