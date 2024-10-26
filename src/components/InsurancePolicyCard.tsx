import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ThumbsUp } from "lucide-react"
import Image from 'next/image'

// Policy and InsuranceCompany types
interface Policy {
    policy_name: string
    description: string
    cover_amount: string
    premium_per_month: string
    cashless_hospitals?: string
    type_of_room?: string
    day_care_treatment?: string
    renewal_bonus?: string
    pre_hospitalization_coverage?: string
    post_hospitalization_coverage?: string
    life_cover?: string
    coverage_till_age?: string
    claim_settled?: string
}

interface InsuranceCompany {
    name: string
    category: string
    image_path: string
    policies: Policy[]
}

// Component props type
interface InsurancePolicyCardProps {
    company: InsuranceCompany
    onPayment: (policy: Policy) => void
}

export default function InsurancePolicyCard({ company, onPayment }: InsurancePolicyCardProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {company.policies.map((policy, index) => (
                <Card key={index} className="w-full max-w-md mx-auto bg-background dark:bg-gray-800 text-foreground dark:text-gray-100">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <Image
                                src={company.image_path}
                                alt={`${company.name} logo`}
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                            <div className="text-right">
                                <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">{company.category}</p>
                                <h3 className="text-lg font-semibold">{company.name}</h3>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h4 className="text-xl font-bold">{policy.policy_name}</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{policy.description}</p>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">Cover amount</p>
                                <p className="text-lg font-bold">₹{policy.cover_amount}</p>
                            </div>
                            {policy.cashless_hospitals && (
                                <div className="text-right">
                                    <p className="text-sm font-medium">Cashless hospitals</p>
                                    <p className="text-lg font-bold">{policy.cashless_hospitals.split(',').length}</p>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            {policy.type_of_room && <div className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">Room type: {policy.type_of_room}</span></div>}
                            {policy.day_care_treatment && <div className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">Day care treatment: {policy.day_care_treatment}</span></div>}
                            {policy.renewal_bonus && <div className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">Renewal bonus: {policy.renewal_bonus}</span></div>}
                            {policy.pre_hospitalization_coverage && <div className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">Pre-hospitalization: {policy.pre_hospitalization_coverage}</span></div>}
                            {policy.post_hospitalization_coverage && <div className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">Post-hospitalization: {policy.post_hospitalization_coverage}</span></div>}
                            {policy.life_cover && <div className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">Life cover: ₹{policy.life_cover}</span></div>}
                            {policy.coverage_till_age && <div className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">Coverage till age: {policy.coverage_till_age}</span></div>}
                            {policy.claim_settled && <div className="flex items-center"><ThumbsUp className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">Claim settled: {policy.claim_settled}</span></div>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center space-y-2">
                        <p className="text-2xl font-bold text-primary">₹{policy.premium_per_month}/month</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">₹{parseInt(policy.premium_per_month) * 12} annually</p>
                        <Button className="w-full" onClick={() => onPayment(policy)}>Pay Now</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
