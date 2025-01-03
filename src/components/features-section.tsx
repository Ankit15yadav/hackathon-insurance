'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Bot, Zap, ArrowRight } from "lucide-react"
import { ChatbotModal } from "./ChatbotModal"

export default function FeaturesSection() {
    const [isChatOpen, setIsChatOpen] = useState(false)

    return (
        <div className="bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Simplify Your Coverage</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardContent className="p-6">
                                <Shield className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Secure KYC Process</h3>
                                <p className="text-muted-foreground mb-4">
                                    Our streamlined Know Your Customer (KYC) process ensures a safe and efficient onboarding experience.
                                </p>
                                <Button variant="outline" className="group">
                                    Get Verified
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <Bot className="w-12 h-12 text-green-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Intelligent Health Assistant</h3>
                                <p className="text-muted-foreground mb-4">
                                    Our AI-powered chatbot guides you through the symptoms and answers all your queries.
                                </p>
                                <Button variant="outline" className="group" onClick={() => setIsChatOpen(true)}>
                                    Chat Now
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">One Policy, Complete Protection</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Revolutionizing insurance by merging multiple policies into one comprehensive solution.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Simplified Management</h3>
                                <p className="text-muted-foreground">
                                    Manage all your insurance needs through a single, user-friendly platform.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Comprehensive Coverage</h3>
                                <p className="text-muted-foreground">
                                    Get complete protection with our expertly curated policy combinations.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Bot className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                                <p className="text-muted-foreground">
                                    Access our AI chatbot anytime for instant support and policy information.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
            <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    )
}