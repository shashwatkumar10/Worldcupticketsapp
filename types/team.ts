// Team type definition

export interface Team {
    id: string;
    name: string;
    countryCode: string; // ISO 3166-1 alpha-2
    confederation: string; // e.g., "CONMEBOL", "UEFA"
    fifaRanking: number;
    competitionIds: string[];
    slug: string; // e.g., "brazil-world-cup-2026-tickets"
    qualificationStatus: string; // "Host", "Qualified"
    previousWorldCups: number;
}
