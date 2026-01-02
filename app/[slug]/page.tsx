import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import competitions from '@/data/competitions.json';
import teams from '@/data/teams.json';
import fixtures from '@/data/fixtures.json';
import venues from '@/data/venues.json';
import { formatDate, formatDateRange, formatTime } from '@/lib/utils/dateFormat';
import type { Competition } from '@/types/competition';
import type { Team } from '@/types/team';
import type { Fixture } from '@/types/fixture';
import type { Venue } from '@/types/venue';
import { BuyNowButtons, BuyNowButtonsCompact } from '@/components/tickets/BuyNowButtons';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Partner logos and branding for fixtures
const partnerInfo: Record<string, { color: string; logo: string }> = {
    stubhub: { color: 'from-purple-600 to-purple-800', logo: '🎫' },
    viagogo: { color: 'from-green-600 to-green-800', logo: '🎟️' },
    hellotickets: { color: 'from-orange-500 to-orange-700', logo: '🎪' },
    footballticketsnet: { color: 'from-blue-600 to-blue-800', logo: '⚽' },
    ticombo: { color: 'from-red-500 to-red-700', logo: '🏟️' },
};

// Generate static params for all pages
export async function generateStaticParams() {
    const competitionSlugs = (competitions as Competition[]).map((comp) => ({
        slug: comp.slug,
    }));

    const fixtureSlugs = (fixtures as Fixture[]).map((fixture) => ({
        slug: fixture.slug,
    }));

    return [...competitionSlugs, ...fixtureSlugs];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const competition = (competitions as Competition[]).find(c => c.slug === slug);
    if (competition) {
        return {
            title: competition.metaTitle,
            description: competition.metaDescription,
            openGraph: { title: competition.metaTitle, description: competition.metaDescription },
        };
    }

    const fixture = (fixtures as Fixture[]).find(f => f.slug === slug);
    if (fixture) {
        return {
            title: fixture.metaTitle,
            description: fixture.metaDescription,
            openGraph: { title: fixture.metaTitle, description: fixture.metaDescription },
        };
    }

    return { title: 'Page Not Found' };
}

export default async function DynamicPage({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const competition = (competitions as Competition[]).find(c => c.slug === slug);
    if (competition) {
        return <CompetitionPage competition={competition} />;
    }

    const fixture = (fixtures as Fixture[]).find(f => f.slug === slug);
    if (fixture) {
        return <FixturePage fixture={fixture} />;
    }

    notFound();
}

// Competition Page Component with SEO Article
function CompetitionPage({ competition }: { competition: Competition }) {
    const competitionTeams = (teams as Team[]).filter(t =>
        t.competitionIds.includes(competition.id)
    );

    const competitionFixtures = (fixtures as Fixture[]).filter(f =>
        f.competitionId === competition.id
    );

    const competitionVenues = (venues as Venue[]).filter(v =>
        v.competitionIds.includes(competition.id)
    );

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SportsEvent',
                        name: competition.name,
                        startDate: competition.startDate,
                        endDate: competition.endDate,
                        location: { '@type': 'Place', name: competition.hostCountries.join(', ') },
                    }),
                }}
            />

            {/* Hero Section */}
            <section className="hero py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="mb-6 text-sm">
                        <ol className="flex items-center gap-2 text-gray-400">
                            <li><Link href="/" className="hover:text-white">Home</Link></li>
                            <li>/</li>
                            <li><span className="text-purple-400">{competition.name}</span></li>
                        </ol>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                                <span className="text-sm text-purple-300 capitalize">{competition.sport}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6">
                                {competition.h1Title}
                            </h1>

                            <p className="text-gray-400 text-lg mb-8 max-w-2xl">
                                {competition.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="glass-card p-4 text-center">
                                    <div className="text-2xl mb-1">📅</div>
                                    <div className="text-sm text-gray-400">Dates</div>
                                    <div className="text-white font-medium text-sm">{formatDateRange(competition.startDate, competition.endDate)}</div>
                                </div>
                                <div className="glass-card p-4 text-center">
                                    <div className="text-2xl mb-1">📍</div>
                                    <div className="text-sm text-gray-400">Location</div>
                                    <div className="text-white font-medium text-sm">{competition.hostCountries.join(', ')}</div>
                                </div>
                                <div className="glass-card p-4 text-center">
                                    <div className="text-2xl mb-1">🎯</div>
                                    <div className="text-sm text-gray-400">Format</div>
                                    <div className="text-white font-medium text-sm">{competition.format}</div>
                                </div>
                                <div className="glass-card p-4 text-center">
                                    <div className="text-2xl mb-1">🏟️</div>
                                    <div className="text-sm text-gray-400">Venues</div>
                                    <div className="text-white font-medium text-sm">{competitionVenues.length} Stadiums</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 w-full lg:w-80">
                            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-400">Status</span>
                                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-400">On Sale</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-400">Teams</span>
                                    <span className="text-white">{competitionTeams.length}+</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-400">Fixtures</span>
                                    <span className="text-white">{competitionFixtures.length}+</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-400">Venues</span>
                                    <span className="text-white">{competitionVenues.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOP BUY NOW BUTTONS */}
            <section className="bg-gradient-to-b from-purple-950/30 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BuyNowButtons eventName={competition.name} />
                </div>
            </section>

            {/* Teams Section */}
            <section id="teams" className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-8">Participating Teams</h2>
                    {competitionTeams.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {competitionTeams.map((team) => (
                                <div key={team.id} className="glass-card p-4 text-center">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-3 text-2xl">
                                        {team.countryCode === 'BR' ? '🇧🇷' :
                                            team.countryCode === 'AR' ? '🇦🇷' :
                                                team.countryCode === 'US' ? '🇺🇸' :
                                                    team.countryCode === 'MX' ? '🇲🇽' :
                                                        team.countryCode === 'GB-ENG' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' :
                                                            team.countryCode === 'FR' ? '🇫🇷' :
                                                                team.countryCode === 'DE' ? '🇩🇪' :
                                                                    team.countryCode === 'ES' ? '🇪🇸' :
                                                                        team.countryCode === 'PT' ? '🇵🇹' :
                                                                            team.countryCode === 'NL' ? '🇳🇱' :
                                                                                team.countryCode === 'IT' ? '🇮🇹' :
                                                                                    team.countryCode === 'BE' ? '🇧🇪' :
                                                                                        team.countryCode === 'JP' ? '🇯🇵' :
                                                                                            team.countryCode === 'MA' ? '🇲🇦' :
                                                                                                team.countryCode === 'AU' ? '🇦🇺' :
                                                                                                    team.countryCode === 'CA' ? '🇨🇦' : '⚽'}
                                    </div>
                                    <h3 className="font-medium text-white text-sm">{team.name}</h3>
                                    <p className="text-xs text-gray-400">{team.confederation}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center">
                            <p className="text-gray-400">Team information will be available after qualification is complete.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Fixtures Section */}
            <section id="fixtures" className="py-16 bg-gradient-to-b from-transparent to-purple-950/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-8">Upcoming Matches</h2>
                    {competitionFixtures.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {competitionFixtures.map((fixture) => (
                                <Link key={fixture.id} href={`/${fixture.slug}`}>
                                    <div className="fixture-card">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs text-purple-400 uppercase tracking-wider">
                                                {fixture.round} {fixture.group && `• ${fixture.group}`}
                                            </span>
                                            <span className="price-tag">From {fixture.affiliateLinks[0]?.price || 'TBD'}</span>
                                        </div>
                                        <div className="team-vs mb-4">
                                            <div className="team-info flex-1">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-2xl">⚽</div>
                                                <span className="font-semibold text-white text-sm mt-2">{fixture.team1Name}</span>
                                            </div>
                                            <div className="vs-badge">VS</div>
                                            <div className="team-info flex-1">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 flex items-center justify-center text-2xl">⚽</div>
                                                <span className="font-semibold text-white text-sm mt-2">{fixture.team2Name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-400">
                                            <span>📅 {formatDate(fixture.matchDate)}</span>
                                            <span>📍 {fixture.venueName}</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <span className="text-purple-400 text-sm font-medium">Compare Prices →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center">
                            <p className="text-gray-400">Match schedule will be announced soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* MIDDLE BUY NOW BUTTONS */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BuyNowButtons eventName={competition.name} />
                </div>
            </section>

            {/* SEO Article Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article className="prose prose-invert prose-lg max-w-none">
                        {competition.id === 'fifa-world-cup-2026' && <WorldCup2026Article />}
                        {competition.id !== 'fifa-world-cup-2026' && <GenericCompetitionArticle competition={competition} />}
                    </article>
                </div>
            </section>

            {/* Venues Section */}
            <section id="venues" className="py-16 bg-gradient-to-b from-purple-950/20 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-8">Host Venues</h2>
                    {competitionVenues.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {competitionVenues.map((venue) => (
                                <div key={venue.id} className="glass-card p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">🏟️</div>
                                        <div>
                                            <h3 className="font-semibold text-white">{venue.name}</h3>
                                            <p className="text-sm text-gray-400">{venue.city}, {venue.country}</p>
                                            <p className="text-sm text-purple-400 mt-1">Capacity: {venue.capacity.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center">
                            <p className="text-gray-400">Venue information coming soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* BOTTOM BUY NOW BUTTONS */}
            <section className="py-8 bg-gradient-to-b from-transparent to-purple-950/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BuyNowButtons eventName={competition.name} />
                </div>
            </section>
        </>
    );
}

// Fixture Page Component
function FixturePage({ fixture }: { fixture: Fixture }) {
    const sortedLinks = [...fixture.affiliateLinks].sort((a, b) => {
        const priceA = parseInt(a.price?.replace(/[^0-9]/g, '') || '999999');
        const priceB = parseInt(b.price?.replace(/[^0-9]/g, '') || '999999');
        return priceA - priceB;
    });
    const lowestPrice = sortedLinks[0]?.price || 'TBD';

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SportsEvent',
                        name: `${fixture.team1Name} vs ${fixture.team2Name}`,
                        startDate: fixture.matchDate,
                        location: { '@type': 'Place', name: fixture.venueName },
                    }),
                }}
            />

            {/* Hero Section */}
            <section className="hero py-12 md:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="mb-6 text-sm">
                        <ol className="flex items-center gap-2 text-gray-400 flex-wrap">
                            <li><Link href="/" className="hover:text-white">Home</Link></li>
                            <li>/</li>
                            <li><Link href={`/fifa-world-cup-2026-tickets`} className="hover:text-white">{fixture.competitionName}</Link></li>
                            <li>/</li>
                            <li className="text-purple-400">{fixture.team1Name} vs {fixture.team2Name}</li>
                        </ol>
                    </nav>

                    <div className="glass-card p-6 md:p-10 text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                            <span className="text-sm text-purple-300">{fixture.competitionName}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-sm text-gray-400">{fixture.round}</span>
                        </div>

                        <div className="flex items-center justify-center gap-6 md:gap-12 mb-8">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-green-500/20">
                                    <span className="text-4xl md:text-5xl">
                                        {fixture.team1Name === 'United States' ? '🇺🇸' :
                                            fixture.team1Name === 'Brazil' ? '🇧🇷' :
                                                fixture.team1Name === 'England' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' :
                                                    fixture.team1Name === 'Germany' ? '🇩🇪' :
                                                        fixture.team1Name === 'Mexico' ? '🇲🇽' :
                                                            fixture.team1Name === 'Argentina' ? '🇦🇷' :
                                                                fixture.team1Name === 'France' ? '🇫🇷' :
                                                                    fixture.team1Name === 'Spain' ? '🇪🇸' :
                                                                        fixture.team1Name === 'TBD' ? '🏆' : '⚽'}
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-white">{fixture.team1Name}</h2>
                            </div>
                            <div className="vs-badge text-xl px-6 py-3 animate-pulse-glow">VS</div>
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/20">
                                    <span className="text-4xl md:text-5xl">
                                        {fixture.team2Name === 'Mexico' ? '🇲🇽' :
                                            fixture.team2Name === 'Argentina' ? '🇦🇷' :
                                                fixture.team2Name === 'France' ? '🇫🇷' :
                                                    fixture.team2Name === 'Spain' ? '🇪🇸' :
                                                        fixture.team2Name === 'Canada' ? '🇨🇦' :
                                                            fixture.team2Name === 'Brazil' ? '🇧🇷' :
                                                                fixture.team2Name === 'TBD' ? '🏆' : '⚽'}
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-white">{fixture.team2Name}</h2>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-gray-400">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">📅</span>
                                <span>{formatDate(fixture.matchDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">⏰</span>
                                <span>{formatTime(fixture.matchTime)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">🏟️</span>
                                <span>{fixture.venueName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">📍</span>
                                <span>{fixture.city}</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl text-center mb-4">{fixture.h1Title}</h1>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto">
                        Compare ticket prices from {fixture.affiliateLinks.length} verified resellers. Prices start from {lowestPrice}.
                    </p>
                </div>
            </section>

            {/* TOP BUY NOW BUTTONS */}
            <section className="bg-gradient-to-b from-purple-950/30 to-transparent">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BuyNowButtons eventName={`${fixture.team1Name} vs ${fixture.team2Name}`} />
                </div>
            </section>

            {/* Price Comparison Section */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Compare Ticket Prices</h2>
                        <span className="text-sm text-gray-400">{sortedLinks.length} sellers available</span>
                    </div>

                    <div className="glass-card p-4 mb-6 border-green-500/30 bg-green-500/5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">💰</span>
                                <div>
                                    <p className="text-sm text-green-400 font-medium">Best Price Available</p>
                                    <p className="text-white font-bold text-xl">{lowestPrice}</p>
                                </div>
                            </div>
                            <a href={sortedLinks[0]?.url} target="_blank" rel="noopener noreferrer" className="btn-gold">
                                Buy Now
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {sortedLinks.map((link, index) => (
                            <a key={link.provider} href={link.url} target="_blank" rel="noopener noreferrer"
                                className={`block partner-badge ${index === 0 ? 'border-green-500/30' : ''}`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partnerInfo[link.provider]?.color || 'from-gray-600 to-gray-800'} flex items-center justify-center text-xl`}>
                                            {partnerInfo[link.provider]?.logo || '🎫'}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white capitalize">{link.provider}</h3>
                                            <p className="text-sm text-gray-400">
                                                {link.availability === 'available' && '✓ Tickets Available'}
                                                {link.availability === 'limited' && '⚠️ Limited Availability'}
                                                {link.availability === 'sold_out' && '✗ Sold Out'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-white">{link.price || 'View Price'}</p>
                                            {index === 0 && <p className="text-xs text-green-400">Lowest Price</p>}
                                        </div>
                                        <div className="hidden sm:flex w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 items-center justify-center">→</div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* MIDDLE BUY NOW BUTTONS */}
            <section className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BuyNowButtonsCompact eventName={`${fixture.team1Name} vs ${fixture.team2Name}`} />
                </div>
            </section>

            {/* SEO Article */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article className="prose prose-invert prose-lg max-w-none">
                        {fixture.articleContent ? (
                            <div dangerouslySetInnerHTML={{ __html: fixture.articleContent }} />
                        ) : (
                            <>
                                {fixture.slug.includes('usa-vs-mexico') && <USAMexicoArticle />}
                                {fixture.slug.includes('brazil-vs-argentina') && <BrazilArgentinaArticle />}
                                {!fixture.slug.includes('usa-vs-mexico') && !fixture.slug.includes('brazil-vs-argentina') && (
                                    <GenericFixtureArticle fixture={fixture} />
                                )}
                            </>
                        )}
                    </article>
                </div>
            </section>

            {/* Match Details */}
            <section className="py-12 bg-gradient-to-b from-transparent to-purple-950/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-8">Match Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">🏟️</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Venue</h3>
                                    <p className="text-white font-medium">{fixture.venueName}</p>
                                    <p className="text-gray-400 text-sm">{fixture.city}, {fixture.country}</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-2xl flex-shrink-0">📅</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Date & Time</h3>
                                    <p className="text-white font-medium">{formatDate(fixture.matchDate)}</p>
                                    <p className="text-gray-400 text-sm">Kick-off: {formatTime(fixture.matchTime)} (Local Time)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM BUY NOW BUTTONS */}
            <section className="py-8 bg-gradient-to-b from-purple-950/20 to-transparent">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BuyNowButtons eventName={`${fixture.team1Name} vs ${fixture.team2Name}`} />
                </div>
            </section>

            {/* Related Matches CTA */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Explore More Matches</h2>
                    <p className="text-gray-400 mb-8">Find tickets for other {fixture.competitionName} matches</p>
                    <Link href={`/fifa-world-cup-2026-tickets`} className="btn-primary">
                        View All {fixture.competitionName} Matches
                    </Link>
                </div>
            </section>
        </>
    );
}

// ==================== SEO ARTICLES ====================

// FIFA World Cup 2026 - 800+ words article
function WorldCup2026Article() {
    return (
        <div className="text-gray-300">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Everything You Need to Know About FIFA World Cup 2026 Tickets</h2>

            <p className="mb-4">
                The FIFA World Cup 2026 represents a historic milestone in football history as it becomes the first tournament to be jointly hosted by three nations: the United States, Canada, and Mexico. This expanded 48-team format promises to deliver the most exciting and accessible World Cup ever, with 104 matches played across 16 world-class venues throughout North America.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Tournament Format and Schedule</h3>

            <p className="mb-4">
                The World Cup 2026 will run from June 11 to July 19, 2026, spanning nearly six weeks of non-stop football action. With 48 teams competing for the ultimate prize in world football, fans will witness an unprecedented 104 matches. The tournament will begin with a group stage featuring 12 groups of four teams each, followed by a knockout phase that culminates in the grand final at MetLife Stadium in New Jersey.
            </p>

            <p className="mb-4">
                This expanded format means more opportunities for fans to secure tickets to see their favorite teams in action. Whether you're supporting a traditional powerhouse like Brazil, Argentina, or Germany, or cheering on emerging footballing nations, the 2026 World Cup offers unparalleled access to world-class football.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Host Cities and World-Class Venues</h3>

            <p className="mb-4">
                The tournament will utilize 16 spectacular stadiums across three countries. In the United States, iconic venues include MetLife Stadium (New York/New Jersey), SoFi Stadium (Los Angeles), AT&T Stadium (Dallas), Hard Rock Stadium (Miami), and Mercedes-Benz Stadium (Atlanta). These state-of-the-art facilities offer modern amenities, excellent sightlines, and capacities exceeding 70,000 spectators.
            </p>

            <p className="mb-4">
                Canada will host matches at BC Place in Vancouver and BMO Field in Toronto, bringing World Cup football to enthusiastic Canadian fans. Meanwhile, Mexico contributes the legendary Estadio Azteca in Mexico City, a venue steeped in World Cup history as the only stadium to have hosted two previous finals, along with Estadio Akron in Guadalajara and Estadio BBVA in Monterrey.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Qualified Teams and Key Matches</h3>

            <p className="mb-4">
                With 48 slots available, the World Cup 2026 will feature an unprecedented number of qualified nations. UEFA leads with 16 spots, followed by CAF (Africa) with 9 slots, AFC (Asia) with 8, CONCACAF (North/Central America) with 6, CONMEBOL (South America) with 6, and OFC (Oceania) with 1, plus 2 playoff spots.
            </p>

            <p className="mb-4">
                The host nations—USA, Mexico, and Canada—automatically qualify as co-hosts, ensuring passionate home crowds for their matches. Traditional favorites like Brazil (5-time champions), Germany (4-time champions), Argentina (3-time champions and reigning World Cup holders), and France (2-time champions) are expected to qualify and challenge for the trophy.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">How to Buy World Cup 2026 Tickets</h3>

            <p className="mb-4">
                Securing tickets for the FIFA World Cup 2026 requires planning and awareness of multiple purchasing channels. Official FIFA ticket sales will occur through FIFA's official portal, with various sales phases including random selection draws and first-come-first-served windows. However, high demand means many fans will need to explore secondary market options.
            </p>

            <p className="mb-4">
                Trusted ticket resale platforms like StubHub, Viagogo, HelloTickets, FootballTicketsNet, and Ticombo offer verified tickets with buyer protection guarantees. These platforms aggregate available tickets from verified sellers worldwide, allowing fans to compare prices and find the best deals for their preferred matches.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Ticket Categories and Pricing</h3>

            <p className="mb-4">
                World Cup tickets are typically offered in multiple categories, ranging from standard seats to premium hospitality packages. Group stage matches generally command lower prices than knockout rounds, while semi-finals and the final represent premium pricing tiers. Prices vary significantly based on seat location, match importance, and whether the host nation is playing.
            </p>

            <p className="mb-4">
                Early planning is essential for securing the best value. Prices tend to increase as the tournament approaches, particularly for high-demand matches featuring popular teams. Comparing prices across multiple platforms ensures you find competitive rates for your desired fixtures.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Travel and Accommodation Tips</h3>

            <p className="mb-4">
                Planning your World Cup 2026 experience should extend beyond ticket purchases. Consider booking accommodation early, especially near major venues, as hotels fill quickly during the tournament. Many cities will offer enhanced public transportation services to stadiums, making it convenient to travel to match day venues.
            </p>

            <p className="mb-4">
                For international visitors, ensure your passport is valid and research visa requirements for entry to the United States, Canada, or Mexico. The tournament's multi-nation format offers unique opportunities to experience diverse cultures, cuisines, and attractions across North America while following your team's journey through the competition.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Why This World Cup Is Special</h3>

            <p className="mb-4">
                The FIFA World Cup 2026 marks the centenary of the inaugural World Cup held in Uruguay in 1930. FIFA has planned special commemorative matches in South American venues to honor this historic milestone. Combined with the expanded 48-team format and the first-ever tri-nation hosting arrangement, this tournament promises to be a landmark event in football history.
            </p>

            <p className="mb-4">
                Don't miss your chance to witness football history. Browse available tickets above and secure your seats for the biggest sporting event on the planet. Whether you're planning to attend multiple matches or focusing on a single must-see fixture, the FIFA World Cup 2026 offers unforgettable experiences for football fans worldwide.
            </p>
        </div>
    );
}

// USA vs Mexico Fixture Article - 800+ words
function USAMexicoArticle() {
    return (
        <div className="text-gray-300">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">USA vs Mexico World Cup 2026: The Ultimate CONCACAF Showdown</h2>

            <p className="mb-4">
                When the United States and Mexico face off at the FIFA World Cup 2026, it will be more than just a football match—it will be a historic clash between two co-host nations and fierce regional rivals. This fixture represents one of the most anticipated encounters in CONCACAF history, taking place on home soil for both nations during the biggest sporting event on the planet.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">The Dos a Cero Rivalry: A History of Intensity</h3>

            <p className="mb-4">
                The USA-Mexico rivalry, often referred to as the "Dos a Cero" rivalry after multiple 2-0 American victories in World Cup qualifiers, represents one of the most intense competitions in international football. Dating back decades, these matches have featured dramatic goals, controversial moments, and passionate fan bases creating electric atmospheres.
            </p>

            <p className="mb-4">
                Both nations have qualified for this tournament as automatic co-hosts, ensuring their presence at the World Cup 2026. This unprecedented situation—two fierce rivals hosting the same tournament—adds extra significance to any potential meeting between the USMNT and El Tri.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">MetLife Stadium: The Perfect Stage</h3>

            <p className="mb-4">
                This historic encounter takes place at MetLife Stadium in East Rutherford, New Jersey, one of the premier venues hosting World Cup 2026 matches. With a capacity exceeding 82,000 spectators, MetLife Stadium will provide a cauldron of atmosphere for this derby match. Located in the New York metropolitan area, the venue is easily accessible for fans traveling from across the United States and beyond.
            </p>

            <p className="mb-4">
                The stadium's state-of-the-art facilities, excellent sightlines, and modern amenities ensure an exceptional match day experience. MetLife Stadium has hosted numerous high-profile events, including multiple Gold Cup finals and international friendlies, preparing it well for the magnitude of this World Cup fixture.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Current Squad Analysis: USA</h3>

            <p className="mb-4">
                The United States Men's National Team enters World Cup 2026 with one of its most talented generations ever. Stars like Christian Pulisic, Weston McKennie, and Tyler Adams have established themselves at top European clubs, bringing valuable experience and quality to the squad. Younger talents like Gio Reyna and Yunus Musah add depth and creativity to an exciting American attack.
            </p>

            <p className="mb-4">
                Playing on home soil provides the USMNT with a significant advantage. The passionate American fan base will create hostile conditions for opponents while lifting their team. The USA has historically performed well in home tournaments, making them genuine contenders for deep runs in this competition.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Current Squad Analysis: Mexico</h3>

            <p className="mb-4">
                El Tri arrives at World Cup 2026 looking to break their historical "quinto partido" curse—the fifth match barrier that has prevented Mexico from advancing past the round of 16 since 1986. With talented players competing in top European leagues and Liga MX, Mexico possesses the quality to challenge any opponent.
            </p>

            <p className="mb-4">
                Mexican football is renowned for technical ability, tactical discipline, and passionate support. With matches on home soil at venues like Estadio Azteca, Mexico will enjoy tremendous home advantage, while their devoted traveling fans will ensure significant support at all tournament venues.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">What Makes This Match Unmissable</h3>

            <p className="mb-4">
                Beyond the rivalry aspect, this fixture represents everything special about World Cup football. Two nations with rich footballing histories competing for glory while fans from both sides create unforgettable atmospheres. The cultural significance extends beyond the pitch, representing the shared history and friendly competition between neighboring nations.
            </p>

            <p className="mb-4">
                Ticket demand for USA vs Mexico matches consistently ranks among the highest in North American football. This World Cup edition, with its historic co-hosting arrangement, promises even greater intensity and demand. Securing tickets early through trusted resellers ensures you don't miss this once-in-a-lifetime opportunity.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Getting to the Match</h3>

            <p className="mb-4">
                MetLife Stadium offers excellent transportation options for match day. The stadium is accessible via NJ Transit trains and buses, with dedicated services running to and from major New York and New Jersey transportation hubs. For those driving, the stadium features extensive parking facilities, though arriving early is recommended given the expected attendance.
            </p>

            <p className="mb-4">
                The surrounding area offers numerous dining and entertainment options, perfect for pre-match celebrations or post-game gatherings. Hotels and accommodations throughout the New York metropolitan area provide convenient bases for attending multiple matches throughout the tournament.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Secure Your Tickets Today</h3>

            <p className="mb-4">
                Don't miss your chance to witness one of the most significant matches in CONCACAF footballing history. The USA vs Mexico World Cup 2026 fixture promises drama, passion, and world-class football in a peerless atmosphere. Compare prices from our trusted ticket partners above and secure your place in history. This is more than a football match—it's a defining moment in the beautiful game.
            </p>
        </div>
    );
}

// Brazil vs Argentina Article - 800+ words
function BrazilArgentinaArticle() {
    return (
        <div className="text-gray-300">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Brazil vs Argentina World Cup 2026: The Greatest Rivalry in Football</h2>

            <p className="mb-4">
                When Brazil and Argentina meet at the FIFA World Cup 2026, the world will stop to witness the greatest rivalry in football history. This clash between South American giants transcends sport, representing decades of cultural competition, footballing excellence, and legendary players. The Superclásico de las Américas at the World Cup is simply unmissable.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">A Rivalry for the Ages</h3>

            <p className="mb-4">
                Brazil and Argentina have contested over 100 matches throughout their storied history, producing iconic moments that define international football. From Pelé to Maradona, Ronaldo to Messi, this rivalry has featured the greatest players ever to grace the beautiful game. Each encounter adds another chapter to this unparalleled sporting saga.
            </p>

            <p className="mb-4">
                The footballing philosophies of both nations—Brazil's jogo bonito (beautiful game) versus Argentina's garra charrúa (fighting spirit)—create tactical battles as compelling as the individual brilliance on display. When these two football cultures collide, magic happens on the pitch.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">AT&T Stadium: A Coliseum for Giants</h3>

            <p className="mb-4">
                This epic encounter takes place at AT&T Stadium in Arlington, Texas, one of the most spectacular sporting venues in the world. With a retractable roof, the world's largest column-free interior, and capacity for over 80,000 fans, this stadium provides a fitting stage for football's greatest rivalry.
            </p>

            <p className="mb-4">
                The state-of-the-art video board spanning 60 yards ensures no moment is missed, while the stadium's location in the Dallas-Fort Worth metroplex makes it accessible for fans traveling from across the globe. AT&T Stadium has hosted major American football events, making it well-prepared for World Cup atmospheres.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Brazil's Quest for a Sixth Star</h3>

            <p className="mb-4">
                Brazil enters World Cup 2026 seeking their sixth title, which would further cement their status as football's most successful nation. The Seleção Brasileira remains the only country to have won the World Cup five times, and a new generation of talent is eager to add another star above the famous yellow jersey's crest.
            </p>

            <p className="mb-4">
                Brazilian football continues to produce world-class talent at an extraordinary rate. From dynamic attackers to creative midfielders, Brazil's squad combines technical excellence with the flair and expression that has made their football style beloved worldwide. Every match featuring Brazil promises entertainment and goals.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Argentina: Defending Champions</h3>

            <p className="mb-4">
                Argentina arrives at World Cup 2026 as reigning champions, having claimed their third title at Qatar 2022 in dramatic fashion. Led by Lionel Messi, considered by many the greatest player in history, the Albiceleste will defend their crown with the same passion and determination that characterizes Argentine football.
            </p>

            <p className="mb-4">
                The triumphant 2022 campaign united a nation and crowned Messi's legendary career. While the team's composition may evolve for 2026, the winning mentality and tactical discipline instilled by that success will carry forward. Argentina enters as favorites alongside traditional powerhouses seeking to reclaim football's ultimate prize.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Historical World Cup Encounters</h3>

            <p className="mb-4">
                Brazil and Argentina have produced memorable World Cup moments throughout history. The 1990 round of 16 clash, with Maradona's brilliant individual effort creating the winning goal, remains etched in football memory. Their meetings have often come at crucial tournament stages, adding drama to an already intense rivalry.
            </p>

            <p className="mb-4">
                These matches attract global audiences that rival World Cup finals in viewership. The combination of historical significance, current team quality, and the passionate fan bases of both nations creates an atmosphere unmatched in international football.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Fan Experience and Atmosphere</h3>

            <p className="mb-4">
                Attending a Brazil vs Argentina match means experiencing football fandom at its most passionate. Brazilian supporters bring their famous samba rhythms and yellow seas of color, while Argentine fans create walls of sound with their iconic chants and unwavering support that continues regardless of scoreline.
            </p>

            <p className="mb-4">
                The atmosphere inside the stadium will be electric, with both sets of supporters attempting to inspire their teams to victory. This is football tribalism at its finest—passionate, colorful, and unforgettable. For neutral spectators, there is no better match to experience World Cup atmospheres at their peak.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Secure Your Place in History</h3>

            <p className="mb-4">
                Don't miss the opportunity to witness football's greatest rivalry on the World Cup stage. Brazil vs Argentina at World Cup 2026 represents a once-in-a-generation opportunity to see footballing giants collide. Compare prices from trusted ticket partners above and secure your seats for this historic encounter. Football doesn't get bigger than this.
            </p>
        </div>
    );
}

// Generic competition article
function GenericCompetitionArticle({ competition }: { competition: Competition }) {
    return (
        <div className="text-gray-300">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Complete Guide to {competition.name} Tickets</h2>

            <p className="mb-4">
                The {competition.name} represents one of the premier sporting events on the global calendar. Taking place in {competition.hostCountries.join(', ')} from {competition.startDate} to {competition.endDate}, this tournament brings together the world's best teams and athletes competing for ultimate glory.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Tournament Overview</h3>

            <p className="mb-4">
                With a format featuring {competition.format}, fans can expect an action-packed competition showcasing the highest level of {competition.sport}. The tournament attracts millions of spectators worldwide, both attending in person and watching broadcasts in every corner of the globe.
            </p>

            <p className="mb-4">
                This edition promises to deliver memorable moments, dramatic matches, and sporting excellence that defines world championship competition. Whether you're a dedicated fan or experiencing this sport for the first time, the atmosphere and quality on display create unforgettable experiences.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">How to Get Tickets</h3>

            <p className="mb-4">
                Securing tickets for major championships requires planning ahead. Official ticket sales typically occur months before the event, with various purchasing windows and methods. For high-demand events, secondary market platforms offer additional opportunities to secure seats when official channels sell out.
            </p>

            <p className="mb-4">
                Compare prices from multiple ticket resellers to find the best deals for your preferred matches and seating categories. Prices vary based on fixture importance, seat location, and proximity to the event date. Early purchasing often provides better selection and competitive pricing.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Planning Your Visit</h3>

            <p className="mb-4">
                When planning to attend {competition.name}, consider accommodation, transportation, and local attractions in your chosen host city. Many fans combine sporting attendance with tourism, exploring the culture and sights of {competition.hostCountries.join(' and ')}.
            </p>

            <p className="mb-4">
                Match day experiences extend beyond the action on the field. Fan zones, pre-match entertainment, and the general festival atmosphere surrounding major championships create full-day events that justify travel from around the world. Browse available tickets above to begin planning your championship experience.
            </p>
        </div>
    );
}

// Generic fixture article
function GenericFixtureArticle({ fixture }: { fixture: Fixture }) {
    return (
        <div className="text-gray-300">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Complete Guide to {fixture.team1Name} vs {fixture.team2Name} Tickets</h2>

            <p className="mb-4">
                The match between {fixture.team1Name} and {fixture.team2Name} at the {fixture.competitionName} promises to be an exciting encounter. Taking place at {fixture.venueName} in {fixture.city}, this {fixture.round} fixture offers fans the opportunity to witness high-quality international football.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Match Preview</h3>

            <p className="mb-4">
                Both teams arrive at this fixture with championship aspirations. Historical encounters between these nations have produced memorable moments, and this latest meeting continues that tradition. The stakes of {fixture.round} competition add extra intensity to the proceedings.
            </p>

            <p className="mb-4">
                {fixture.venueName} provides an excellent setting for this encounter. With world-class facilities and passionate crowds expected, the atmosphere will be worthy of the occasion. Fans attending will witness unforgettable sporting moments.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Ticket Information</h3>

            <p className="mb-4">
                Compare ticket prices from our trusted reseller partners to find the best deals for this fixture. Prices vary based on seat location and availability, with premium positions commanding higher prices. Early booking ensures better selection and competitive rates.
            </p>

            <p className="mb-4">
                Don't miss this exciting {fixture.competitionName} fixture. Browse available tickets above and secure your place to witness {fixture.team1Name} vs {fixture.team2Name} live at {fixture.venueName}.
            </p>
        </div>
    );
}

export const revalidate = 3600;
