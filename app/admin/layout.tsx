'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Skip check on login page
        if (pathname === '/admin/login') {
            setAuthorized(true);
            return;
        }

        // Simple client-side check for the cookie set by login page
        const hasSession = document.cookie.includes('admin_session=authenticated');

        if (!hasSession) {
            router.push('/admin/login');
        } else {
            setAuthorized(true);
        }
    }, [pathname, router]);

    if (!authorized && pathname !== '/admin/login') {
        return <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center text-white">Checking access...</div>;
    }

    // If on login page, render full screen without sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0f0f23] flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-[#0f0f23] hidden md:block">
                <div className="p-6">
                    <Link href="/admin" className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-purple-500">⚽</span> Admin Panel
                    </Link>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link href="/admin" className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                        Dashboard
                    </Link>
                    <Link href="/admin/teams" className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                        Teams
                    </Link>
                    <Link href="/admin/matches" className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                        Matches
                    </Link>
                    <div className="pt-4 mt-4 border-t border-white/10">
                        <Link href="/" className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                            View Site
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0f0f23]/50 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-lg font-semibold text-white">Admin Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <button className="text-sm text-gray-400 hover:text-white">Admin User</button>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
