import teams from '@/data/teams.json';
import fixtures from '@/data/fixtures.json';
import venues from '@/data/venues.json';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Teams', value: teams.length, icon: '🛡️' },
        { label: 'Total Matches', value: fixtures.length, icon: '⚽' },
        { label: 'Host Venues', value: venues.length, icon: '🏟️' },
        { label: 'Affiliates', value: 5, icon: '🔗' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome to the WorldCupTickets.app Admin Panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="glass-card p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="/admin/teams/new" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors text-center">
                            <span className="block text-2xl mb-2">➕</span>
                            <span className="text-sm font-medium text-white">Add Team</span>
                        </a>
                        <a href="/admin/matches/new" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors text-center">
                            <span className="block text-2xl mb-2">📅</span>
                            <span className="text-sm font-medium text-white">Add Match</span>
                        </a>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Projects</h3>
                    <p className="text-sm text-gray-400">Activity logs will be available soon.</p>
                </div>
            </div>
        </div>
    );
}
