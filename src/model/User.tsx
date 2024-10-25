import mongoose, { Schema, Document } from "mongoose"

interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    userId: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    policies: mongoose.Types.ObjectId[];
    claims: mongoose.Types.ObjectId[];
    paymentTransactions: [
        {
            transactionId: string;
            orderId: string;
            amount: number;
            date: Date;
            status: string;
        }
    ];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, },
    userId: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
    },
    policies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Policy" }],
    claims: [{ type: mongoose.Schema.Types.ObjectId, ref: "Claim" }],
    paymentTransactions: [
        {
            transactionId: { type: String, },
            orderId: { type: String, },
            amount: { type: Number, },
            date: { type: Date, default: Date.now },
            status: { type: String, },
        },
    ],
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
