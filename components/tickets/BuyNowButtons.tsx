// Buy Now Buttons Component for All Affiliate Partners

interface BuyNowButtonsProps {
    eventName: string;
    className?: string;
}

const affiliatePartners = [
    { name: 'StubHub', url: 'https://stubhub.com', color: 'from-purple-600 to-purple-800' },
    { name: 'Viagogo', url: 'https://viagogo.com', color: 'from-green-600 to-green-800' },
    { name: 'HelloTickets', url: 'https://hellotickets.com', color: 'from-orange-500 to-orange-700' },
    { name: 'FootballTicketsNet', url: 'https://footballticketsnet.com', color: 'from-blue-600 to-blue-800' },
    { name: 'Ticombo', url: 'https://ticombo.com', color: 'from-red-500 to-red-700' },
];

export function BuyNowButtons({ eventName, className = '' }: BuyNowButtonsProps) {
    return (
        <div className={`py-8 ${className}`}>
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">🎫 Buy {eventName} Tickets Now</h3>
                <p className="text-gray-400">Compare prices from trusted ticket partners</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {affiliatePartners.map((partner) => (
                    <a
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br ${partner.color} hover:scale-105 transition-transform shadow-lg`}
                    >
                        <span className="font-bold text-white text-sm">{partner.name}</span>
                        <span className="text-white/80 text-xs mt-1">Buy Now →</span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export function BuyNowButtonsCompact({ eventName }: BuyNowButtonsProps) {
    return (
        <div className="py-4">
            <div className="flex flex-wrap justify-center gap-2">
                {affiliatePartners.map((partner) => (
                    <a
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg bg-gradient-to-br ${partner.color} hover:scale-105 transition-transform text-white text-sm font-medium`}
                    >
                        {partner.name} - Buy Now
                    </a>
                ))}
            </div>
        </div>
    );
}
