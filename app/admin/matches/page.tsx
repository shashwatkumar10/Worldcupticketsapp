'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminMatchesPage() {
    const [fixtures, setFixtures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'fixtures'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort by date/time if needed, or leave natural order
            setFixtures(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this match?')) {
            await deleteDoc(doc(db, 'fixtures', id));
        }
    };

    if (loading) return <div className="p-8 text-white">Loading matches...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Matches</h1>
                    <p className="text-gray-400">Total {fixtures.length} fixtures scheduled</p>
                </div>
                <Link href="/admin/matches/editor?id=new" className="btn-primary px-6 py-2">
                    Add New Match
                </Link>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Match</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Venue</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {fixtures.slice(0, 50).map((match: any) => (
                            <tr key={match.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-white">
                                        {match.team1Name} vs {match.team2Name}
                                    </div>
                                    <div className="text-xs text-gray-500">{match.round}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {match.venueName}, {match.city}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {match.matchDate} {match.matchTime}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/matches/editor?id=${match.id}`} className="text-purple-400 hover:text-purple-300 mr-4">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(match.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {fixtures.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No matches found. Add your first match!
                    </div>
                )}
                {fixtures.length > 50 && (
                    <div className="p-4 text-center text-gray-500 text-sm italic">
                        Showing first 50 matches. Use search to find specific fixtures.
                    </div>
                )}
            </div>
        </div>
    );
}
