'use client'

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Products = () => {

    const params = useParams();

    return (
        <div className=' text-black'>
            {params.id}
        </div>
    )
}

export default Products
