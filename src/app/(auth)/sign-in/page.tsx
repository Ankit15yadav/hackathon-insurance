import UserProfile from '@/components/use-profile'
import { SignIn, useUser } from '@clerk/nextjs'
import React from 'react'

const Signin = () => {

    return (
        <div className='flex justify-center items-center h-screen'>
            <SignIn routing='hash' />
        </div>
    )
}

export default Signin
