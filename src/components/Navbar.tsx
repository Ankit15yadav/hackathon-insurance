'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useUser, UserButton } from '@clerk/nextjs' // Import from Clerk
import { Button } from './ui/button'
import logo from "../assets/logo.png"
// import InsuranceForm from './insurance-form'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false) // Check if component is mounted
    const pathname = usePathname()
    const { isSignedIn, isLoaded } = useUser() // `isLoaded` ensures Clerk's hook is ready

    // Ensures that the component has mounted on the client side
    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Renew', path: '/services' },
        { name: 'About', path: '/about' },
    ]

    // Avoid rendering until `isLoaded` and `mounted` are true
    if (!mounted || !isLoaded) return null

    return (
        <nav className="bg-white dark:bg-black shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <Image src={logo} alt="Logo" width={120} height={120} className='rounded-md' />
                        </Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === item.path
                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {isSignedIn ? (
                                <div className=' flex items-center justify-center gap-3'>
                                    <UserButton />
                                    <Link href={"/dashboard"}>
                                        <Button
                                            className=' mr-2'
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>

                                    <Link href="/insurance-form">
                                        <Button size="lg" className="text-lg bg-green-500 hover:bg-green-400">
                                            Details form
                                        </Button>
                                    </Link>

                                </div>
                            ) : (
                                <>
                                    <Link href="/sign-in">
                                        <Button className="mr-2">Log in</Button>
                                    </Link>
                                    <Link href="/sign-up">
                                        <Button className='mr-2'>Sign up</Button>
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.path
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                        {isSignedIn ? (
                            <div className="flex items-center px-5">
                                <UserButton />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center px-5">
                                    <Link href="/sign-in" className="w-full">
                                        <Button className="w-full mb-2">Log in</Button>
                                    </Link>
                                </div>
                                <div className="flex items-center px-5 mt-3">
                                    <Link href="/sign-up" className="w-full">
                                        <Button className="w-full">Sign up</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
