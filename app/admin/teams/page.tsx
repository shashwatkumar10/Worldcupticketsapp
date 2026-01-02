import teams from '@/data/teams.json';
import Link from 'next/link';

export default function AdminTeamsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Teams</h1>
                    <p className="text-gray-400">Total {teams.length} teams participating</p>
                </div>
                <Link href="/admin/teams/new" className="btn-primary px-6 py-2">
                    Add New Team
                </Link>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Team</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Confederation</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Ranking</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {teams.map((team) => (
                            <tr key={team.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-lg">
                                            ⚽
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{team.name}</div>
                                            <div className="text-xs text-gray-500">{team.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {team.confederation}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    #{team.fifaRanking}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs ${team.qualificationStatus === 'Host' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                                        }`}>
                                        {team.qualificationStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/teams/edit/${team.id}`} className="text-purple-400 hover:text-purple-300 mr-4">
                                        Edit
                                    </Link>
                                    <button className="text-red-400 hover:text-red-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
