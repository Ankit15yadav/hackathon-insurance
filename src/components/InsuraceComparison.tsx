

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaBolt, FaUmbrella, FaHeartbeat, FaChartLine, FaCar, FaPlane, FaFemale, FaRecycle, FaPiggyBank, FaChild } from 'react-icons/fa'
import { Plane } from "lucide-react"
import InsuranceProcess from './InsuranceProcess';
import { useAtom } from 'jotai';
import { updateCreditAtom } from '@/store';
import { useUser } from '@clerk/nextjs';
import UserProfileModal from './auth/use-profile';


interface BenefitIconProps {
    icon: React.ReactNode
    text: string
}

const insuranceOptions = [
    {
        icon: <FaUmbrella className="text-purple-400" />,
        title: "Term Life Insurance",
        label: "Upto 10% Discount",
        link: "/term-life" // Add the desired link for this insurance type
    },
    {
        icon: <FaHeartbeat className="text-red-400" />,
        title: "Health Insurance",
        label: "FREE Home Visit",
        link: "/health"
    },
    // {
    //     icon: <FaChartLine className="text-yellow-400" />,
    //     title: "Investment Plans",
    //     label: "In-Built Life Cover",
    //     link: "/investment"
    // },
    {
        icon: <FaCar className="text-gray-400" />,
        title: "Car Insurance",
        label: "Upto 85% Discount",
        link: "/car"
    },
    // {
    //     icon: <FaFemale className="text-pink-400" />,
    //     title: "Term Insurance (Women)",
    //     label: "Upto 20% Cheaper",
    //     link: "/women-term"
    // },
    {
        icon: <FaPlane className="text-green-400" />,
        title: "Travel Insurance",
        label: "Upto 20% Discount",
        link: "/return-premium"
    },
    {
        icon: <FaPiggyBank className="text-blue-400" />,
        title: "Pet Insurance",
        label: "No offer",
        link: "/guaranteed-return"
    },
    {
        icon: <FaChild className="text-orange-400" />,
        title: "Child Savings Plans",
        label: "Premium Waiver",
        link: "/child-savings"
    },
];


const BenefitIcon: React.FC<BenefitIconProps> = ({ icon, text }) => (
    <div className="flex items-center space-x-2 text-lg text-gray-300">
        {icon}
        <span>{text}</span>
    </div>
)

interface InsuranceCardProps {
    icon: React.ReactNode
    title: string
    label?: string
    onClick: () => void
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ icon, title, label, onClick }) => (
    <div
        onClick={onClick}
        className="bg-gray-800 p-4 rounded-lg text-center shadow-lg hover:cursor-pointer hover:bg-gray-600"
    >
        {label && (
            <div className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded-full mb-2 inline-block">
                {label}
            </div>
        )}
        <div className="text-4xl mb-2 flex justify-center text-gray-300">{icon}</div>
        <h3 className="font-semibold text-gray-200">{title}</h3>
    </div>
)

const InsuranceComparison: React.FC = () => {
    const router = useRouter();
    const [credit] = useAtom(updateCreditAtom);
    const [clientCredit, setClientCredit] = React.useState<string | number>();
    // const { isSignedIn } = useAuth();
    const { isSignedIn, user } = useUser();
    const [showModal, setShowModal] = useState(false);




    React.useEffect(() => {
        setClientCredit(credit);
    }, [credit]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasShownModal = localStorage.getItem('hasShownModal');

            if (isSignedIn && !hasShownModal) {
                setShowModal(true);
                localStorage.setItem('hasShownModal', 'true');
            }
        }
    }, [isSignedIn]);

    useEffect(() => {
        // Clear local storage when signed out
        if (!isSignedIn) {
            localStorage.removeItem('hasShownModal');
        }
    }, [isSignedIn]);
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className=' flex items-center justify-between'>
                    <h1 className="text-4xl font-bold mb-4">
                        Let's find you <br />
                        the <span className="text-blue-400">Best Insurance</span>
                    </h1>

                    <h1>
                        {credit ?
                            <span className=' text-yellow-400 text-2xl animate-pulse'>
                                You have {clientCredit} credits
                            </span>
                            :
                            <span className=' text-red-400'>
                                You have no credits
                            </span>
                        }
                    </h1>
                </div>


                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <BenefitIcon
                        icon={<FaBolt className="text-purple-400" />}
                        text="50 insurers offering competitive prices"
                    />
                    <BenefitIcon
                        icon={<FaBolt className="text-orange-400" />}
                        text="Quick, easy & hassle free"
                    />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {insuranceOptions.map((option, index) => (
                        <InsuranceCard
                            key={index}
                            icon={option.icon}
                            title={option.title}
                            label={option.label}
                            onClick={() => router.push(`/dashboard${option.link}`)}
                        />
                    ))}
                </div>
                <div className=' mt-6'>
                    <InsuranceProcess />
                </div>

                {showModal && <UserProfileModal onClose={() => setShowModal(false)} />}
            </div>
        </div>


    )
}

export default InsuranceComparison