import Link from 'next/link';
import competitions from '@/data/competitions.json';
import fixtures from '@/data/fixtures.json';
import { formatDate, getDaysUntil, formatDateRange } from '@/lib/utils/dateFormat';
import type { Competition } from '@/types/competition';
import type { Fixture } from '@/types/fixture';

// World Cup 2026 countdown date
const WORLD_CUP_2026_START = new Date('2026-06-11T00:00:00');

function getCountdown() {
  const now = new Date();
  const diff = WORLD_CUP_2026_START.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function HomePage() {
  const countdown = getCountdown();
  const featuredCompetitions = (competitions as Competition[]).slice(0, 6);
  const upcomingFixtures = (fixtures as Fixture[]).slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="hero py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
              <span className="animate-pulse w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-sm text-purple-300">Tickets On Sale Now</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6">
              Your Gateway to World Championship Tickets
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Compare prices from trusted resellers for FIFA World Cup 2026, Olympics 2028,
              Rugby World Cup, and 20+ major sporting events worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/fifa-world-cup-2026-tickets" className="btn-gold text-lg px-8 py-4">
                🏆 FIFA World Cup 2026 Tickets
              </Link>
              <Link href="/summer-olympics-2028-tickets" className="btn-outline px-8 py-4">
                🥇 Olympics 2028 Tickets
              </Link>
            </div>

            {/* Countdown Timer */}
            <div className="mb-12">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                FIFA World Cup 2026 Kicks Off In
              </p>
              <div className="flex justify-center gap-3 md:gap-4">
                <div className="countdown-item">
                  <div className="countdown-value">{countdown.days}</div>
                  <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{countdown.hours}</div>
                  <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{countdown.minutes}</div>
                  <div className="countdown-label">Mins</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{countdown.seconds}</div>
                  <div className="countdown-label">Secs</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="stat-badge">
                <div className="stat-value">5+</div>
                <div className="stat-label">Ticket Partners</div>
              </div>
              <div className="stat-badge">
                <div className="stat-value">20+</div>
                <div className="stat-label">Championships</div>
              </div>
              <div className="stat-badge">
                <div className="stat-value">100+</div>
                <div className="stat-label">Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Featured Championships
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse tickets for the world's biggest sporting events from 2025 to 2030
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompetitions.map((comp) => (
              <Link key={comp.id} href={`/${comp.slug}`}>
                <div className="competition-card h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs text-purple-400 uppercase tracking-wider">
                        {comp.sport}
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-1">
                        {comp.name}
                      </h3>
                    </div>
                    <span className="text-2xl">
                      {comp.sport === 'football' && '⚽'}
                      {comp.sport === 'multi-sport' && '🥇'}
                      {comp.sport === 'rugby' && '🏉'}
                      {comp.sport === 'cricket' && '🏏'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{formatDateRange(comp.startDate, comp.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{comp.hostCountries.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🎯</span>
                      <span>{comp.format}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className={`text-xs px-2 py-1 rounded-full ${comp.status === 'upcoming'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-500/10 text-gray-400'
                      }`}>
                      {comp.status === 'upcoming' ? 'On Sale' : comp.status}
                    </span>
                    <span className="text-purple-400 text-sm font-medium">
                      View Tickets →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/events" className="btn-outline">
              View All Championships
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Fixtures */}
      <section className="py-16 bg-gradient-to-b from-transparent to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              🔥 Hot Matches
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don't miss these highly anticipated fixtures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingFixtures.map((fixture) => (
              <Link key={fixture.id} href={`/${fixture.slug}`}>
                <div className="fixture-card">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-purple-400 uppercase tracking-wider">
                      {fixture.competitionName} • {fixture.round}
                    </span>
                    <span className="price-tag">
                      From {fixture.affiliateLinks[0]?.price || 'TBD'}
                    </span>
                  </div>

                  <div className="team-vs mb-4">
                    <div className="team-info flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-2xl">
                        {fixture.team1Name === 'United States' ? '🇺🇸' :
                          fixture.team1Name === 'Brazil' ? '🇧🇷' :
                            fixture.team1Name === 'England' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' :
                              fixture.team1Name === 'Germany' ? '🇩🇪' :
                                fixture.team1Name === 'Mexico' ? '🇲🇽' :
                                  fixture.team1Name === 'TBD' ? '🏆' : '⚽'}
                      </div>
                      <span className="font-semibold text-white text-sm mt-2">
                        {fixture.team1Name}
                      </span>
                    </div>

                    <div className="vs-badge">VS</div>

                    <div className="team-info flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 flex items-center justify-center text-2xl">
                        {fixture.team2Name === 'Mexico' ? '🇲🇽' :
                          fixture.team2Name === 'Argentina' ? '🇦🇷' :
                            fixture.team2Name === 'France' ? '🇫🇷' :
                              fixture.team2Name === 'Spain' ? '🇪🇸' :
                                fixture.team2Name === 'Canada' ? '🇨🇦' :
                                  fixture.team2Name === 'TBD' ? '🏆' : '⚽'}
                      </div>
                      <span className="font-semibold text-white text-sm mt-2">
                        {fixture.team2Name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{formatDate(fixture.matchDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{fixture.venueName}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-purple-400 text-sm font-medium">
                      Compare Prices from 5 Sellers →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get the best tickets at the best prices in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Find Your Event</h3>
              <p className="text-gray-400">
                Browse our comprehensive catalog of world championship events
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Compare Prices</h3>
              <p className="text-gray-400">
                See prices from 5+ trusted resellers side by side
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎫</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Buy Tickets</h3>
              <p className="text-gray-400">
                Choose the best deal and purchase directly from the verified reseller
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 bg-gradient-to-b from-purple-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Trusted Ticket Partners
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We compare prices from the world's leading ticket resellers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['StubHub', 'Viagogo', 'HelloTickets', 'FootballTicketsNet', 'Ticombo'].map((partner) => (
              <div key={partner} className="partner-badge justify-center">
                <span className="text-gray-300 font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Never Miss a Ticket Drop
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Get notified about new events, price drops, and exclusive deals for World Cup 2026 and other major championships
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <button className="btn-primary px-8">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
