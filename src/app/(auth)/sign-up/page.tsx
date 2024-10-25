import { SignUp } from '@clerk/nextjs'
import React from 'react'

const signup = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <SignUp routing='hash' />
        </div>
    )
}

export default signup
