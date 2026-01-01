// Competition type definition for major sporting events

export interface Competition {
  id: string;
  name: string;
  slug: string; // e.g., "fifa-world-cup-2026-tickets"
  sport: string;
  year: number;
  startDate: string;
  endDate: string;
  hostCountries: string[];
  format: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
  featuredImage: string;
  status: 'upcoming' | 'active' | 'completed';
}
