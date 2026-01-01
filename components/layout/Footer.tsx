import Link from 'next/link';

const footerLinks = {
    competitions: [
        { label: 'FIFA World Cup 2026', href: '/fifa-world-cup-2026-tickets' },
        { label: 'Olympics 2028', href: '/summer-olympics-2028-tickets' },
        { label: 'Euro 2028', href: '/euro-2028-tickets' },
        { label: 'Rugby World Cup 2027', href: '/rugby-world-cup-2027-tickets' },
        { label: 'Cricket World Cup 2027', href: '/icc-cricket-world-cup-2027-tickets' },
    ],
    sports: [
        { label: 'Football', href: '/football-world-cup-tickets' },
        { label: 'Olympics', href: '/olympics-tickets' },
        { label: 'Rugby', href: '/rugby-world-cup-tickets' },
        { label: 'Cricket', href: '/cricket-world-cup-tickets' },
        { label: 'Tennis', href: '/tennis-grand-slam-tickets' },
    ],
    partners: [
        { label: 'StubHub', href: '#', external: true },
        { label: 'Viagogo', href: '#', external: true },
        { label: 'HelloTickets', href: '#', external: true },
        { label: 'FootballTicketsNet', href: '#', external: true },
        { label: 'Ticombo', href: '#', external: true },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
    ],
};

export function Footer() {
    return (
        <footer className="footer mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Competitions */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Competitions
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.competitions.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="footer-link text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sports */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Sports
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.sports.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="footer-link text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Partners */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Ticket Partners
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.partners.map((link) => (
                                <li key={link.label}>
                                    <span className="footer-link text-sm">
                                        {link.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="footer-link text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                <span className="text-white text-sm">🏆</span>
                            </div>
                            <span className="text-sm text-gray-400">
                                © 2025 WorldCupTickets.app. All rights reserved.
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-500">
                                The ultimate destination for world championship tickets.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
