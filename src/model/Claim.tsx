import mongoose, { Schema, Document } from "mongoose";

interface IClaim extends Document {
    claimNumber: string;
    policy: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    type: string;
    status: string;
    dateFiled: Date;
    dateResolved?: Date;
    description: string;
    amountRequested: number;
    amountApproved?: number;
}

const ClaimSchema: Schema = new Schema({
    claimNumber: { type: String, required: true, unique: true },
    policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
    dateFiled: { type: Date, default: Date.now },
    dateResolved: { type: Date },
    description: { type: String },
    amountRequested: { type: Number, required: true },
    amountApproved: { type: Number },
});

const Claim = mongoose.model<IClaim>("Claim", ClaimSchema);
export default Claim;
