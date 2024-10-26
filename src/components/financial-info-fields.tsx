import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const incomeRanges = [
    { id: 'below-5l', label: 'Below 5 Lakhs' },
    { id: '5l-10l', label: '5-10 Lakhs' },
    { id: '10l-20l', label: '10-20 Lakhs' },
    { id: 'above-20l', label: 'Above 20 Lakhs' },
]

const badHabits = [
    { id: 'smoking', label: 'Smoking' },
    { id: 'alcohol', label: 'Alcohol' },
    { id: 'drugs', label: 'Drugs' },
]

export function FinancialInfoFields({ form }: { form: any }) {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="incomeRange"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Income Range (INR)</FormLabel>
                        </div>
                        {incomeRanges.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="incomeRange"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, item.id])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                    (value: string) => value !== item.id
                                                                )
                                                            )
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {item.label}
                                            </FormLabel>
                                        </FormItem>
                                    )
                                }}
                            />
                        ))}
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Medical History (if any)</FormLabel>
                        <FormControl>
                            <Input {...field} className="dark:bg-gray-800 dark:text-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="badHabits"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Bad Habits</FormLabel>
                        </div>
                        {badHabits.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="badHabits"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, item.id])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                    (value: string) => value !== item.id
                                                                )
                                                            )
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {item.label}
                                            </FormLabel>
                                        </FormItem>
                                    )
                                }}
                            />
                        ))}
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="dark:bg-gray-800 dark:text-white">
                                    <SelectValue placeholder="Select marital status" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="divorced">Divorced</SelectItem>
                                <SelectItem value="widowed">Widowed</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="nominee"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nominee</FormLabel>
                        <FormControl>
                            <Input {...field} className="dark:bg-gray-800 dark:text-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="jobSector"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Job Sector</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="dark:bg-gray-800 dark:text-white">
                                    <SelectValue placeholder="Select job sector" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="private">Private</SelectItem>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="self-employed">Self-employed</SelectItem>
                                <SelectItem value="unemployed">Unemployed</SelectItem>
                            </SelectContent>
                        </Select>

                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}