// URL slug utilities for SEO-friendly URLs with 'tickets' keyword

import slugifyLib from 'slugify';

/**
 * Convert a string to a URL-safe slug
 */
export function slugify(text: string): string {
    return slugifyLib(text, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    });
}

/**
 * Generate a competition slug with tickets suffix
 * Example: "FIFA World Cup 2026" -> "fifa-world-cup-2026-tickets"
 */
export function competitionSlug(name: string): string {
    return `${slugify(name)}-tickets`;
}

/**
 * Generate a team slug for a specific competition
 * Example: ("Brazil", "FIFA World Cup 2026") -> "brazil-world-cup-2026-tickets"
 */
export function teamSlug(teamName: string, competitionShortName: string): string {
    return `${slugify(teamName)}-${slugify(competitionShortName)}-tickets`;
}

/**
 * Generate a fixture slug
 * Example: ("Brazil", "Argentina", "World Cup 2026") -> "brazil-vs-argentina-world-cup-2026-tickets"
 */
export function fixtureSlug(team1: string, team2: string, competitionShortName: string): string {
    return `${slugify(team1)}-vs-${slugify(team2)}-${slugify(competitionShortName)}-tickets`;
}

/**
 * Generate a venue slug for a specific competition
 * Example: ("MetLife Stadium", "World Cup 2026") -> "metlife-stadium-world-cup-2026-tickets"
 */
export function venueSlug(venueName: string, competitionShortName: string): string {
    return `${slugify(venueName)}-${slugify(competitionShortName)}-tickets`;
}
