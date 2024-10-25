import { NextResponse, NextRequest } from "next/server";
import Razorpay from "razorpay";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID ?? '',
    key_secret: process.env.RAZORPAY_KEY_SECRET ?? '',
});

export async function POST(req: NextRequest) {

    try {
        const order = await razorpay.orders.create({
            amount: 10000 * 1000,
            currency: 'INR',
            receipt: "receipt_ " + Math.random().toString(36).substring(7),
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
        }, {
            status: 200
        });
    }

    catch (err) {
        console.error("Error creating order:", err);
        return NextResponse.json({
            success: false,
            error: "Error creating order",
        }, {
            status: 500
        });
    }
}