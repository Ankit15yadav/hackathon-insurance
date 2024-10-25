import mongoose, { Schema, Document } from "mongoose";

interface IPolicy extends Document {
    policyNumber: string;
    insurer: string;
    type: string;
    premium: number;
    startDate: Date;
    endDate: Date;
    coverageDetails: string;
    user: mongoose.Types.ObjectId;
}

const PolicySchema: Schema = new Schema({
    policyNumber: { type: String, required: true, unique: true },
    insurer: { type: String, required: true },
    type: { type: String, required: true },
    premium: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    coverageDetails: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Policy = mongoose.model<IPolicy>("Policy", PolicySchema);
export default Policy;
