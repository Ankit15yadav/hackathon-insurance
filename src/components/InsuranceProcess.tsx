import React from 'react'
import { Tablet, FileText, CheckSquare } from 'lucide-react'

interface StepProps {
    icon: React.ReactNode
    title: string
    description: string
    isLast?: boolean
}

const Step: React.FC<StepProps> = ({ icon, title, description, isLast = false }) => (
    <div className="flex flex-col items-center text-center relative">
        <div className="mb-4 p-4 bg-blue-900 rounded-full">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
        <p className="text-gray-400">{description}</p>
        {!isLast && (
            <div className="hidden md:block absolute top-1/2 left-full w-1/2 h-0.5 bg-blue-700 transform -translate-y-1/2">
                <div className="absolute right-0 w-3 h-3 bg-blue-700 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
            </div>
        )}
    </div>
)

const InsuranceProcess: React.FC = () => {
    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">How PolicyHub Works?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <Step
                        icon={<Tablet size={48} className="text-blue-400" />}
                        title="Fill in Your Details"
                        description="Fill in your details and get insurance policy premium quotes from top-rated insurers instantly."
                    />
                    <Step
                        icon={<FileText size={48} className="text-blue-400" />}
                        title="Select a Plan"
                        description="From numerous available quotes, choose the one that best suits your requirements and budget."
                    />
                    <Step
                        icon={<CheckSquare size={48} className="text-blue-400" />}
                        title="Make Payment and Sit Back"
                        description="Pay online and get your policy right away in your inbox."
                        isLast
                    />
                </div>
            </div>
        </section>
    )
}

export default InsuranceProcess