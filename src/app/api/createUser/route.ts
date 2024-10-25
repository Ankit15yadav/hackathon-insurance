import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Adjust the import path as needed
// import User from '../../../models/User'; // Adjust the import path as needed
import User from '@/model/User';

export const POST = async (req: Request) => {
    await dbConnect();

    const { clerkId, email, name } = await req.json();

    if (!clerkId || !email || !name) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        let user = await User.findOne({ userId: clerkId });
        if (!user) {
            user = await User.create({
                userId: clerkId,
                email,
                name,
            });
        } else {
            // Update existing user if needed
            user.email = email;
            user.name = name;
            await user.save();
        }
        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        console.error("Error creating/updating user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
