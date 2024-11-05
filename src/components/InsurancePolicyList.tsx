import React, { useState, useEffect } from 'react'
import InsurancePolicyCard from './InsurancePolicyCard'
import { useUser } from '@clerk/nextjs'
import { useAtom } from 'jotai'
import { updateCreditAtom } from '@/store'
import { useToast } from '@/hooks/use-toast'

interface Policy {
    policy_name: string
    description: string
    cover_amount: string
    premium_per_month: string
}

interface InsuranceCompany {
    name: string
    category: string
    image_path: string
    policies: Policy[]
}

type InsuranceData = {
    [category: string]: InsuranceCompany[]
} | InsuranceCompany[]

interface InsurancePolicyListProps {
    data: InsuranceData
}

export default function InsurancePolicyList({ data }: InsurancePolicyListProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { user } = useUser();
    const [credit, setCredit] = useAtom(updateCreditAtom);
    const { toast } = useToast();

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
    }, [])

    const handlePayment = async (policy: Policy) => {
        setIsProcessing(true);

        toast({
            title: "Payment initiated",
            description: "Please wait while we process your payment.",
            duration: 2000,
        });

        try {
            // Send the amount in the POST request body
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: parseInt(policy.premium_per_month) * 100 }), // Razorpay expects the amount in paise
            });

            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: parseInt(policy.premium_per_month) * 100,
                currency: 'INR',
                name: policy.policy_name,
                description: policy.description,
                order_id: data.orderId,
                handler: function (response: any) {
                    alert(response.razorpay_payment_id);

                    // Calculate 15% of the premium as credit
                    const creditAmount = parseInt(policy.premium_per_month) * 0.15;

                    // Update credit using the writable atom
                    const value = creditAmount + credit;
                    setCredit(value);

                }, prefill: {
                    name: user?.firstName,
                    email: user?.emailAddresses[0].emailAddress,
                    contact: user?.phoneNumbers[0].phoneNumber,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log(error);

            toast({
                title: "Payment failed",
                description: "Please try again later.",
                variant: "destructive",
            });

        } finally {
            setIsProcessing(false);
        }
    };


    const isCompanyArray = (data: InsuranceData): data is InsuranceCompany[] => {
        return Array.isArray(data) && data.every(item => 'policies' in item)
    }

    const renderCompany = (company: InsuranceCompany, index: number) => (
        <div key={index}>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">{company.category}</h2>
            <InsurancePolicyCard company={company} onPayment={handlePayment} />
        </div>
    )

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">Insurance Policies</h1>
            {isCompanyArray(data) ? (
                data.map((company, index) => renderCompany(company, index))
            ) : (
                Object.entries(data).map(([category, companies]) => (
                    <div key={category}>
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">{category}</h2>
                        {Array.isArray(companies) ? (
                            companies.map((company, index) => (
                                <InsurancePolicyCard key={index} company={company} onPayment={handlePayment} />
                            ))
                        ) : (
                            <p className="text-red-500">Invalid data format for category: {category}</p>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}
