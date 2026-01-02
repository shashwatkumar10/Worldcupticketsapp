'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditTeamPage() {
    const router = useRouter();
    const { id } = useParams();
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && id !== 'new') {
            fetch('/api/admin/teams')
                .then(res => res.json())
                .then(data => {
                    const found = data.find((t: any) => t.id === id);
                    setTeam(found);
                    setLoading(false);
                });
        } else {
            setTeam({
                id: '',
                name: '',
                countryCode: '',
                confederation: '',
                fifaRanking: 0,
                competitionIds: ['fifa-world-cup-2026'],
                slug: '',
                qualificationStatus: 'Qualified',
                previousWorldCups: 0
            });
            setLoading(false);
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/admin/teams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(team),
        });

        if (res.ok) {
            router.push('/admin/teams');
            router.refresh();
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-8">{id === 'new' ? 'Add New Team' : `Edit ${team.name}`}</h1>

            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Team ID</label>
                        <input
                            type="text"
                            value={team.id}
                            onChange={(e) => setTeam({ ...team, id: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            required
                            disabled={id !== 'new'}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                        <input
                            type="text"
                            value={team.name}
                            onChange={(e) => setTeam({ ...team, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Country Code (ISO)</label>
                        <input
                            type="text"
                            value={team.countryCode}
                            onChange={(e) => setTeam({ ...team, countryCode: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Confederation</label>
                        <input
                            type="text"
                            value={team.confederation}
                            onChange={(e) => setTeam({ ...team, confederation: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">FIFA Ranking</label>
                        <input
                            type="number"
                            value={team.fifaRanking}
                            onChange={(e) => setTeam({ ...team, fifaRanking: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                        <input
                            type="text"
                            value={team.slug}
                            onChange={(e) => setTeam({ ...team, slug: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary px-8 py-2"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
