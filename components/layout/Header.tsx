'use client';

import Link from 'next/link';
import { useState } from 'react';

const mainNav = [
    { label: 'World Cup 2026', href: '/fifa-world-cup-2026-tickets' },
    { label: 'Olympics 2028', href: '/summer-olympics-2028-tickets' },
    { label: 'Euro 2028', href: '/euro-2028-tickets' },
    { label: 'Rugby WC 2027', href: '/rugby-world-cup-2027-tickets' },
    { label: 'All Events', href: '/events' },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">🏆</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-lg font-bold text-white">WorldCupTickets</span>
                            <span className="text-purple-400">.app</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="nav-link text-sm"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Search & CTA */}
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <Link href="/fifa-world-cup-2026-tickets" className="btn-gold text-sm hidden sm:flex">
                            🎫 Get Tickets
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-gray-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="lg:hidden py-4 border-t border-white/10">
                        <div className="flex flex-col gap-1">
                            {mainNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="nav-link py-3"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
