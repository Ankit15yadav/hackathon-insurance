import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
    policy: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    amount: number;
    date: Date;
    method: string;
    status: string;
}

const PaymentSchema: Schema = new Schema({
    policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    method: { type: String, required: true },
    status: { type: String, required: true, default: "Completed" },
});

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
