import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/press" className="hover:text-primary transition-colors">Press</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Products</h3>
                        <ul className="space-y-2">
                            <li><Link href="/health-insurance" className="hover:text-primary transition-colors">Health Insurance</Link></li>
                            <li><Link href="/life-insurance" className="hover:text-primary transition-colors">Life Insurance</Link></li>
                            <li><Link href="/car-insurance" className="hover:text-primary transition-colors">Car Insurance</Link></li>
                            <li><Link href="/home-insurance" className="hover:text-primary transition-colors">Home Insurance</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/claims" className="hover:text-primary transition-colors">Claims</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <Linkedin size={24} />
                            </a>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-100">Subscribe to our newsletter</h4>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-black bg-primary rounded-r-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-primary dark:hover:bg-primary-light dark:focus:ring-offset-gray-800"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-center text-sm">
                        © {new Date().getFullYear()} Your Insurance Company. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}