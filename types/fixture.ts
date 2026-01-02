// Fixture type definition for matches/events

export type AffiliateProvider = 'stubhub' | 'viagogo' | 'hellotickets' | 'footballticketsnet' | 'ticombo';

export interface AffiliateLink {
    provider: AffiliateProvider;
    url: string;
    price?: string;
    currency?: string;
    availability?: 'available' | 'limited' | 'sold_out';
}

export interface Fixture {
    id: string;
    competitionId: string;
    competitionName: string;
    team1Id: string;
    team2Id: string;
    team1Name: string;
    team2Name: string;
    team1Flag: string;
    team2Flag: string;
    slug: string; // e.g., "brazil-vs-argentina-world-cup-2026-tickets"
    venueId: string;
    venueName: string;
    city: string;
    country: string;
    matchDate: string;
    matchTime: string;
    round: string; // e.g., "Group Stage", "Quarter Final", "Final"
    group?: string; // e.g., "Group A"
    metaTitle: string;
    metaDescription: string;
    h1Title: string;
    status: 'scheduled' | 'live' | 'completed';
    affiliateLinks: AffiliateLink[];
    articleContent?: string;
}
