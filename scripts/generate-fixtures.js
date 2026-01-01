// Script to generate all 72 World Cup 2026 group stage fixtures
const fs = require('fs');

// Venue mapping
const venues = {
    'Mexico City': { name: 'Estadio Azteca', country: 'Mexico' },
    'Guadalajara': { name: 'Estadio Akron', country: 'Mexico' },
    'Monterrey': { name: 'Estadio BBVA', country: 'Mexico' },
    'Toronto': { name: 'BMO Field', country: 'Canada' },
    'Vancouver': { name: 'BC Place', country: 'Canada' },
    'Los Angeles': { name: 'SoFi Stadium', country: 'United States' },
    'Boston': { name: 'Gillette Stadium', country: 'United States' },
    'NY/NJ': { name: 'MetLife Stadium', country: 'United States' },
    'San Francisco': { name: 'Levi\'s Stadium', country: 'United States' },
    'Philadelphia': { name: 'Lincoln Financial Field', country: 'United States' },
    'Houston': { name: 'NRG Stadium', country: 'United States' },
    'Dallas': { name: 'AT&T Stadium', country: 'United States' },
    'Miami': { name: 'Hard Rock Stadium', country: 'United States' },
    'Atlanta': { name: 'Mercedes-Benz Stadium', country: 'United States' },
    'Seattle': { name: 'Lumen Field', country: 'United States' },
    'Kansas City': { name: 'Arrowhead Stadium', country: 'United States' }
};

// Match schedule from official FIFA data
const schedule = [
    { num: 1, date: '2026-06-11', group: 'A', team1: 'Mexico', team2: 'South Africa', city: 'Mexico City' },
    { num: 2, date: '2026-06-11', group: 'A', team1: 'South Korea', team2: 'Playoff D', city: 'Guadalajara' },
    { num: 3, date: '2026-06-12', group: 'B', team1: 'Canada', team2: 'Playoff A', city: 'Toronto' },
    { num: 4, date: '2026-06-12', group: 'D', team1: 'USA', team2: 'Paraguay', city: 'Los Angeles' },
    { num: 5, date: '2026-06-13', group: 'C', team1: 'Haiti', team2: 'Scotland', city: 'Boston' },
    { num: 6, date: '2026-06-13', group: 'D', team1: 'Australia', team2: 'Playoff C', city: 'Vancouver' },
    { num: 7, date: '2026-06-13', group: 'C', team1: 'Brazil', team2: 'Morocco', city: 'NY/NJ' },
    { num: 8, date: '2026-06-13', group: 'B', team1: 'Qatar', team2: 'Switzerland', city: 'San Francisco' },
    { num: 9, date: '2026-06-14', group: 'E', team1: 'Ivory Coast', team2: 'Ecuador', city: 'Philadelphia' },
    { num: 10, date: '2026-06-14', group: 'E', team1: 'Germany', team2: 'Curaçao', city: 'Houston' },
    { num: 11, date: '2026-06-14', group: 'F', team1: 'Netherlands', team2: 'Japan', city: 'Dallas' },
    { num: 12, date: '2026-06-14', group: 'F', team1: 'Playoff B', team2: 'Tunisia', city: 'Monterrey' },
    { num: 13, date: '2026-06-15', group: 'H', team1: 'Saudi Arabia', team2: 'Uruguay', city: 'Miami' },
    { num: 14, date: '2026-06-15', group: 'H', team1: 'Spain', team2: 'Cape Verde', city: 'Atlanta' },
    { num: 15, date: '2026-06-15', group: 'G', team1: 'Iran', team2: 'New Zealand', city: 'Los Angeles' },
    { num: 16, date: '2026-06-15', group: 'G', team1: 'Belgium', team2: 'Egypt', city: 'Seattle' },
    { num: 17, date: '2026-06-16', group: 'I', team1: 'France', team2: 'Senegal', city: 'NY/NJ' },
    { num: 18, date: '2026-06-16', group: 'I', team1: 'Playoff 2', team2: 'Norway', city: 'Boston' },
    { num: 19, date: '2026-06-16', group: 'J', team1: 'Argentina', team2: 'Algeria', city: 'Kansas City' },
    { num: 20, date: '2026-06-16', group: 'J', team1: 'Austria', team2: 'Jordan', city: 'San Francisco' },
    { num: 21, date: '2026-06-17', group: 'L', team1: 'Ghana', team2: 'Panama', city: 'Toronto' },
    { num: 22, date: '2026-06-17', group: 'L', team1: 'England', team2: 'Croatia', city: 'Dallas' },
    { num: 23, date: '2026-06-17', group: 'K', team1: 'Portugal', team2: 'Playoff 1', city: 'Houston' },
    { num: 24, date: '2026-06-17', group: 'K', team1: 'Uzbekistan', team2: 'Colombia', city: 'Mexico City' },
    { num: 25, date: '2026-06-18', group: 'A', team1: 'Playoff D', team2: 'South Africa', city: 'Atlanta' },
    { num: 26, date: '2026-06-18', group: 'B', team1: 'Switzerland', team2: 'Playoff A', city: 'Los Angeles' },
    { num: 27, date: '2026-06-18', group: 'B', team1: 'Canada', team2: 'Qatar', city: 'Vancouver' },
    { num: 28, date: '2026-06-18', group: 'A', team1: 'Mexico', team2: 'South Korea', city: 'Guadalajara' },
    { num: 29, date: '2026-06-19', group: 'C', team1: 'Brazil', team2: 'Haiti', city: 'Philadelphia' },
    { num: 30, date: '2026-06-19', group: 'C', team1: 'Scotland', team2: 'Morocco', city: 'Boston' },
    { num: 31, date: '2026-06-19', group: 'D', team1: 'Playoff C', team2: 'Paraguay', city: 'San Francisco' },
    { num: 32, date: '2026-06-19', group: 'D', team1: 'USA', team2: 'Australia', city: 'Seattle' },
    { num: 33, date: '2026-06-20', group: 'E', team1: 'Germany', team2: 'Ivory Coast', city: 'Toronto' },
    { num: 34, date: '2026-06-20', group: 'E', team1: 'Ecuador', team2: 'Curaçao', city: 'Kansas City' },
    { num: 35, date: '2026-06-20', group: 'F', team1: 'Netherlands', team2: 'Playoff B', city: 'Houston' },
    { num: 36, date: '2026-06-20', group: 'F', team1: 'Tunisia', team2: 'Japan', city: 'Monterrey' },
    { num: 37, date: '2026-06-21', group: 'H', team1: 'Uruguay', team2: 'Cape Verde', city: 'Miami' },
    { num: 38, date: '2026-06-21', group: 'H', team1: 'Spain', team2: 'Saudi Arabia', city: 'Atlanta' },
    { num: 39, date: '2026-06-21', group: 'G', team1: 'Belgium', team2: 'Iran', city: 'Los Angeles' },
    { num: 40, date: '2026-06-21', group: 'G', team1: 'New Zealand', team2: 'Egypt', city: 'Vancouver' },
    { num: 41, date: '2026-06-22', group: 'I', team1: 'Norway', team2: 'Senegal', city: 'NY/NJ' },
    { num: 42, date: '2026-06-22', group: 'I', team1: 'France', team2: 'Playoff 2', city: 'Philadelphia' },
    { num: 43, date: '2026-06-22', group: 'J', team1: 'Argentina', team2: 'Austria', city: 'Dallas' },
    { num: 44, date: '2026-06-22', group: 'J', team1: 'Jordan', team2: 'Algeria', city: 'San Francisco' },
    { num: 45, date: '2026-06-23', group: 'L', team1: 'England', team2: 'Ghana', city: 'Boston' },
    { num: 46, date: '2026-06-23', group: 'L', team1: 'Panama', team2: 'Croatia', city: 'Toronto' },
    { num: 47, date: '2026-06-23', group: 'K', team1: 'Portugal', team2: 'Uzbekistan', city: 'Houston' },
    { num: 48, date: '2026-06-23', group: 'K', team1: 'Colombia', team2: 'Playoff 1', city: 'Guadalajara' },
    { num: 49, date: '2026-06-24', group: 'C', team1: 'Scotland', team2: 'Brazil', city: 'Miami' },
    { num: 50, date: '2026-06-24', group: 'C', team1: 'Morocco', team2: 'Haiti', city: 'Atlanta' },
    { num: 51, date: '2026-06-24', group: 'B', team1: 'Switzerland', team2: 'Canada', city: 'Vancouver' },
    { num: 52, date: '2026-06-24', group: 'B', team1: 'Playoff A', team2: 'Qatar', city: 'Seattle' },
    { num: 53, date: '2026-06-24', group: 'A', team1: 'Mexico', team2: 'Playoff D', city: 'Mexico City' },
    { num: 54, date: '2026-06-24', group: 'A', team1: 'South Africa', team2: 'South Korea', city: 'Monterrey' },
    { num: 55, date: '2026-06-25', group: 'E', team1: 'Curaçao', team2: 'Ivory Coast', city: 'Philadelphia' },
    { num: 56, date: '2026-06-25', group: 'E', team1: 'Ecuador', team2: 'Germany', city: 'NY/NJ' },
    { num: 57, date: '2026-06-25', group: 'F', team1: 'Japan', team2: 'Playoff B', city: 'Dallas' },
    { num: 58, date: '2026-06-25', group: 'F', team1: 'Tunisia', team2: 'Netherlands', city: 'Kansas City' },
    { num: 59, date: '2026-06-25', group: 'D', team1: 'USA', team2: 'Playoff C', city: 'Los Angeles' },
    { num: 60, date: '2026-06-25', group: 'D', team1: 'Paraguay', team2: 'Australia', city: 'San Francisco' },
    { num: 61, date: '2026-06-26', group: 'I', team1: 'Norway', team2: 'France', city: 'Boston' },
    { num: 62, date: '2026-06-26', group: 'I', team1: 'Senegal', team2: 'Playoff 2', city: 'Toronto' },
    { num: 63, date: '2026-06-26', group: 'G', team1: 'Egypt', team2: 'Iran', city: 'Seattle' },
    { num: 64, date: '2026-06-26', group: 'G', team1: 'New Zealand', team2: 'Belgium', city: 'Vancouver' },
    { num: 65, date: '2026-06-26', group: 'H', team1: 'Uruguay', team2: 'Spain', city: 'Houston' },
    { num: 66, date: '2026-06-26', group: 'H', team1: 'Cape Verde', team2: 'Saudi Arabia', city: 'Guadalajara' },
    { num: 67, date: '2026-06-27', group: 'L', team1: 'Panama', team2: 'England', city: 'NY/NJ' },
    { num: 68, date: '2026-06-27', group: 'L', team1: 'Croatia', team2: 'Ghana', city: 'Philadelphia' },
    { num: 69, date: '2026-06-27', group: 'J', team1: 'Algeria', team2: 'Austria', city: 'Kansas City' },
    { num: 70, date: '2026-06-27', group: 'J', team1: 'Jordan', team2: 'Argentina', city: 'Dallas' },
    { num: 71, date: '2026-06-27', group: 'K', team1: 'Colombia', team2: 'Portugal', city: 'Miami' },
    { num: 72, date: '2026-06-27', group: 'K', team1: 'Playoff 1', team2: 'Uzbekistan', city: 'Atlanta' }
];

// Price tiers based on team popularity
const priceTiers = {
    high: ['Argentina', 'Brazil', 'France', 'England', 'Germany', 'Spain', 'Portugal', 'Netherlands', 'Belgium'],
    medium: ['USA', 'Mexico', 'Italy', 'Croatia', 'Uruguay', 'Colombia', 'Japan', 'Morocco', 'South Korea', 'Switzerland', 'Canada', 'Australia'],
    low: []
};

function getBasePrice(team1, team2) {
    if (priceTiers.high.includes(team1) && priceTiers.high.includes(team2)) return 450;
    if (priceTiers.high.includes(team1) || priceTiers.high.includes(team2)) return 325;
    if (priceTiers.medium.includes(team1) || priceTiers.medium.includes(team2)) return 225;
    return 165;
}

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Generate fixtures
const fixtures = schedule.map(match => {
    const venue = venues[match.city];
    const basePrice = getBasePrice(match.team1, match.team2);
    const team1Display = match.team1.includes('Playoff') ? 'TBD' : match.team1;
    const team2Display = match.team2.includes('Playoff') ? 'TBD' : match.team2;

    return {
        id: `wc2026-m${match.num}`,
        competitionId: 'fifa-world-cup-2026',
        competitionName: 'FIFA World Cup 2026',
        team1Name: match.team1.includes('Playoff') ? match.team1 : match.team1,
        team2Name: match.team2.includes('Playoff') ? match.team2 : match.team2,
        venueName: venue.name,
        city: match.city === 'NY/NJ' ? 'East Rutherford' : match.city,
        country: venue.country,
        matchDate: match.date,
        matchTime: '18:00',
        round: 'Group Stage',
        group: 'Group ' + match.group,
        slug: `${slugify(match.team1)}-vs-${slugify(match.team2)}-world-cup-2026-tickets`,
        metaTitle: `${match.team1} vs ${match.team2} World Cup 2026 Tickets`,
        metaDescription: `Buy tickets for ${match.team1} vs ${match.team2} at ${venue.name}, ${match.city} - FIFA World Cup 2026 ${match.group}.`,
        h1Title: `${team1Display} vs ${team2Display} FIFA World Cup 2026 Tickets`,
        affiliateLinks: [
            { provider: 'stubhub', url: 'https://stubhub.com', price: `From $${basePrice}`, availability: 'available' },
            { provider: 'viagogo', url: 'https://viagogo.com', price: `From $${Math.round(basePrice * 0.95)}`, availability: 'available' },
            { provider: 'hellotickets', url: 'https://hellotickets.com', price: `From $${Math.round(basePrice * 1.1)}`, availability: 'available' },
            { provider: 'footballticketsnet', url: 'https://footballticketsnet.com', price: `From $${Math.round(basePrice * 0.85)}`, availability: 'available' },
            { provider: 'ticombo', url: 'https://ticombo.com', price: `From $${Math.round(basePrice * 0.98)}`, availability: 'available' }
        ]
    };
});

// Add knockout stage fixtures
const knockoutFixtures = [
    { id: 'wc2026-r32-1', round: 'Round of 32', date: '2026-06-28', venue: 'MetLife Stadium', city: 'East Rutherford', team1: 'Winner 1A', team2: 'Runner-up 2B', basePrice: 395 },
    { id: 'wc2026-r16-1', round: 'Round of 16', date: '2026-07-04', venue: 'AT&T Stadium', city: 'Dallas', team1: 'Winner R32-1', team2: 'Winner R32-2', basePrice: 495 },
    { id: 'wc2026-qf-1', round: 'Quarter-Final', date: '2026-07-11', venue: 'SoFi Stadium', city: 'Los Angeles', team1: 'QF Team 1', team2: 'QF Team 2', basePrice: 695 },
    { id: 'wc2026-sf-1', round: 'Semi-Final', date: '2026-07-15', venue: 'AT&T Stadium', city: 'Dallas', team1: 'SF Team 1', team2: 'SF Team 2', basePrice: 895 },
    { id: 'wc2026-sf-2', round: 'Semi-Final', date: '2026-07-16', venue: 'SoFi Stadium', city: 'Los Angeles', team1: 'SF Team 3', team2: 'SF Team 4', basePrice: 895 },
    { id: 'wc2026-3rd', round: 'Third-Place Match', date: '2026-07-18', venue: 'Hard Rock Stadium', city: 'Miami', team1: '3rd Place Team 1', team2: '3rd Place Team 2', basePrice: 325 },
    { id: 'wc2026-final', round: 'Final', date: '2026-07-19', venue: 'MetLife Stadium', city: 'East Rutherford', team1: 'Finalist 1', team2: 'Finalist 2', basePrice: 1995 }
];

knockoutFixtures.forEach(ko => {
    fixtures.push({
        id: ko.id,
        competitionId: 'fifa-world-cup-2026',
        competitionName: 'FIFA World Cup 2026',
        team1Name: ko.team1,
        team2Name: ko.team2,
        venueName: ko.venue,
        city: ko.city,
        country: 'United States',
        matchDate: ko.date,
        matchTime: '18:00',
        round: ko.round,
        group: null,
        slug: `${slugify(ko.round)}-${slugify(ko.city)}-world-cup-2026-tickets`,
        metaTitle: `${ko.round} - FIFA World Cup 2026 Tickets`,
        metaDescription: `Buy tickets for the FIFA World Cup 2026 ${ko.round} at ${ko.venue}, ${ko.city}.`,
        h1Title: `FIFA World Cup 2026 ${ko.round} Tickets`,
        affiliateLinks: [
            { provider: 'stubhub', url: 'https://stubhub.com', price: `From $${ko.basePrice}`, availability: ko.round === 'Final' ? 'limited' : 'available' },
            { provider: 'viagogo', url: 'https://viagogo.com', price: `From $${Math.round(ko.basePrice * 0.95)}`, availability: 'available' },
            { provider: 'hellotickets', url: 'https://hellotickets.com', price: `From $${Math.round(ko.basePrice * 1.1)}`, availability: 'available' },
            { provider: 'footballticketsnet', url: 'https://footballticketsnet.com', price: `From $${Math.round(ko.basePrice * 0.85)}`, availability: 'available' },
            { provider: 'ticombo', url: 'https://ticombo.com', price: `From $${Math.round(ko.basePrice * 0.98)}`, availability: ko.round === 'Final' ? 'limited' : 'available' }
        ]
    });
});

// Write to file
fs.writeFileSync('data/fixtures.json', JSON.stringify(fixtures, null, 2));
console.log(`Generated ${fixtures.length} fixtures (${schedule.length} group stage + ${knockoutFixtures.length} knockout)`);
