'use client'

import InsurancePolicyList from '@/components/InsurancePolicyList';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { lifeInsuranceCompanies, healthInsuranceCompanies } from "../../../../assets/data/companyData"

const Products = () => {

    const params = useParams();

    if (params.id == 'term-life') {
        return (
            <div>
                <InsurancePolicyList data={lifeInsuranceCompanies} />
            </div>
        )
    }

    if (params.id == 'health') {
        return (
            <div>
                <InsurancePolicyList data={healthInsuranceCompanies} />
            </div>
        )
    }

    return (
        <div className=' text-black'>
        </div>
    )
}

export default Products
