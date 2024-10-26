import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const assetOptions = [
    { id: 'stocks', label: 'Stocks' },
    { id: 'bonds', label: 'Bonds' },
    { id: 'real-estate', label: 'Real Estate' },
    { id: 'crypto', label: 'Cryptocurrency' },
]

export function OptionalInfoFields({ form }: { form: any }) {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="car"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Car (Optional)</FormLabel>
                        <FormControl>
                            <Input {...field} className="dark:bg-gray-800 dark:text-white" placeholder="Car model and year" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="house"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>House (Optional)</FormLabel>
                        <FormControl>
                            <Input {...field} className="dark:bg-gray-800 dark:text-white" placeholder="House type or address" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="assets"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Assets (Optional)</FormLabel>
                        </div>
                        {assetOptions.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="assets"
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
                                                                    (value: string) => value !== item.id)
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
        </div>
    )
}