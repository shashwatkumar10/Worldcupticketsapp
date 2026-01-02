'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side check for static export compatibility.
        // TODO: Migrate to Firebase Auth for better security.
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

        if (password === ADMIN_PASSWORD) {
            // Set cookie manually for client-side middleware/checks
            document.cookie = "admin_session=authenticated; path=/; max-age=86400; SameSite=Lax";
            router.push('/admin');
            router.refresh();
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f23]">
            <div className="glass-card p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-white">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="w-full btn-primary py-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
