'use client'

import { useState, useCallback } from 'react'

export function useStreamableValue() {
    const [value, setValue] = useState('')

    const startStreaming = useCallback((streamableValue: {
        done: any, value: string
    }) => {
        const updateValue = () => {
            setValue(streamableValue.value)
            if (!streamableValue.done) {
                requestAnimationFrame(updateValue)
            }
        }
        updateValue()
    }, [])

    return { value, startStreaming }
}