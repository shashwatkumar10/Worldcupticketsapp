// Venue type definition

export interface Venue {
    id: string;
    name: string;
    city: string;
    country: string;
    capacity: number;
    competitionIds: string[];
    slug: string;
    hostCity: string;
    specialMatch: string | null;
    openingYear: number;
    description: string;
}
