'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { PaymentPage } from '@/app/page'

const Dashboard = () => {

    const { isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <p>Please log in to view your profile.</p>;
    }

    console.log("user", user)

    return (
        <div className=' text-black dark:text-white font-semibold '>
            <h1>Welcome, {user?.firstName}</h1>
            <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
            <PaymentPage amount={400} />
        </div>
    );
}

export default Dashboard
