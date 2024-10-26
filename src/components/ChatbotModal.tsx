'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Mic, Send, MicOff } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"
import { useToast } from '@/hooks/use-toast'

interface Message {
    text: string
    isUser: boolean
}

export function ChatbotModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isListening, setIsListening] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const recognitionRef = useRef<SpeechRecognition | null>(null)

    const { toast } = useToast();

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ text: "Hello! How can I assist you today?", isUser: false }])
        }
    }, [isOpen, messages.length])

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.interimResults = true

            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('')

                setInput(transcript)
            }

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error)
                setIsListening(false)
                toast({
                    title: "Error",
                    description: "There was an error with the speech recognition. Please try again.",
                    variant: "destructive",
                })
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, isUser: true }])
            setInput('')
            // Simulate bot response
            setTimeout(() => {
                setMessages(prev => [...prev, { text: "I'm processing your request. How else can I help you?", isUser: false }])
            }, 1000)
        }
    }

    const handleVoiceCommand = () => {
        if (!recognitionRef.current) {
            toast({
                title: "Not supported",
                description: "Speech recognition is not supported in your browser.",
                variant: "destructive",
            })
            return
        }

        if (isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        } else {
            recognitionRef.current.start()
            setIsListening(true)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chat with our AI Assistant</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col h-[400px]">
                    <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'
                                    }`}
                            >
                                <div
                                    className={`inline-block p-2 rounded-lg ${message.isUser
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                    <div className="flex items-center mt-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className={`mr-2 ${isListening ? 'bg-red-500 text-white' : ''}`}
                            onClick={handleVoiceCommand}
                        >
                            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow"
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <Button className="ml-2" onClick={handleSend}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start: () => void;
    stop: () => void;
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    length: number;
}

interface SpeechRecognitionAlternative {
    transcript: string;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

declare global {
    interface Window {
        SpeechRecognition: {
            new(): SpeechRecognition;
        };
        webkitSpeechRecognition: {
            new(): SpeechRecognition;
        };
    }
}
