'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
// import { useToast } from '@/components/ui/use-toast'
import { useToast } from '@/hooks/use-toast'
import { PersonalInfoFields } from './personal-info-fields'
import { FinancialInfoFields } from './financial-info-fields'
import { OptionalInfoFields } from './optional-info-fields'

const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    dob: z.date({ required_error: 'A date of birth is required.' }),
    gender: z.enum(['male', 'female', 'other'], { required_error: 'Please select a gender.' }),
    address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
    incomeRange: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one income range.',
    }),
    medicalHistory: z.string().optional(),
    badHabits: z.array(z.string()),
    maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], { required_error: 'Please select a marital status.' }),
    nominee: z.string().min(2, { message: 'Nominee name must be at least 2 characters.' }),
    jobSector: z.string({ required_error: 'Please select a job sector.' }),
    car: z.string().optional(),
    house: z.string().optional(),
    assets: z.array(z.string()).optional(),
})

export default function InsuranceForm() {
    const [step, setStep] = useState(1)
    const { toast } = useToast()
    const [formData, setFormData] = useState({})

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            address: '',
            incomeRange: [],
            medicalHistory: '',
            badHabits: [],
            nominee: '',
            jobSector: '',
            assets: [],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
        setFormData(values);
        toast({
            title: 'Form submitted!',
            description: 'Thank you for submitting your information.',
        })
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold text-center dark:text-white">Insurance Application Form</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {step === 1 && <PersonalInfoFields form={form} />}
                    {step === 2 && <FinancialInfoFields form={form} />}
                    {step === 3 && <OptionalInfoFields form={form} />}

                    <div className="flex justify-between">
                        {step > 1 && (
                            <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                                Previous
                            </Button>
                        )}
                        {step < 3 ? (
                            <Button type="button" onClick={() => setStep(step + 1)}>
                                Next
                            </Button>
                        ) : (
                            <Button type="submit">Submit</Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}