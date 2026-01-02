'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // For simplicity, we'll use a hardcoded check in a client component for now 
        // or better, a server action. Given the constraints, let's do a simple 
        // fetch to an auth API route.
        const res = await fetch('/api/admin/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
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
