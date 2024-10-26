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
import { useToast } from '@/hooks/use-toast'
import { generateEmail } from '../app/bot/action'
import { readStreamableValue } from 'ai/rsc'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
    id: string
    text: string
    isUser: boolean
}

export function ChatbotModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isListening, setIsListening] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const recognitionRef = useRef<SpeechRecognition | null>(null)

    const { toast } = useToast();

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ id: 'initial', text: "Hello! How can I assist you today?", isUser: false }])
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

    const handleSend = async () => {
        if (input.trim()) {
            const userMessageId = `user-${Date.now()}`
            const aiMessageId = `ai-${Date.now()}`
            setMessages(prev => [...prev, { id: userMessageId, text: input, isUser: true }])
            setInput('')
            setIsGenerating(true)

            try {
                const { output } = await generateEmail(input)
                let generatedText = ''

                setMessages(prev => [...prev, { id: aiMessageId, text: '', isUser: false }])

                for await (const chunk of readStreamableValue(output)) {
                    generatedText += chunk
                    setMessages(prev => prev.map(msg =>
                        msg.id === aiMessageId ? { ...msg, text: generatedText.trim() } : msg
                    ))
                }
            } catch (error) {
                console.error('Error generating response:', error)
                toast({
                    title: "Error",
                    description: "There was an error generating the response. Please try again.",
                    variant: "destructive",
                })
            } finally {
                setIsGenerating(false)
            }
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
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle>Chat with our AI Assistant</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow px-6 py-4" ref={scrollAreaRef}>
                    <AnimatePresence initial={false}>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${message.isUser
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isGenerating && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex justify-start mb-4"
                        >
                            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                <LoadingIndicator />
                            </div>
                        </motion.div>
                    )}
                </ScrollArea>
                <div className="flex items-center p-4 border-t">
                    <Button
                        variant="outline"
                        size="icon"
                        className={`mr-2 ${isListening ? 'bg-red-500 text-white' : ''}`}
                        onClick={handleVoiceCommand}
                        aria-label={isListening ? "Stop voice input" : "Start voice input"}
                    >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow"
                        onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleSend()}
                        aria-label="Chat input"
                    />
                    <Button
                        className="ml-2"
                        onClick={handleSend}
                        disabled={isGenerating || !input.trim()}
                        aria-label="Send message"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function LoadingIndicator() {
    return (
        <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{
                        y: ["0%", "-50%", "0%"],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.2,
                    }}
                />
            ))}
        </div>
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