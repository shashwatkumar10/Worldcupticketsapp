// Price formatting utilities

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'MXN';

const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'CA$',
    AUD: 'A$',
    MXN: 'MX$',
};

/**
 * Format price with currency symbol
 * Example: formatPrice(299, 'USD') -> "$299"
 */
export function formatPrice(amount: number, currency: CurrencyCode = 'USD'): string {
    const symbol = currencySymbols[currency] || '$';

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format price range
 * Example: formatPriceRange(199, 599) -> "$199 - $599"
 */
export function formatPriceRange(min: number, max: number, currency: CurrencyCode = 'USD'): string {
    return `${formatPrice(min, currency)} - ${formatPrice(max, currency)}`;
}

/**
 * Parse price string to number
 * Example: parsePrice("$299") -> 299
 */
export function parsePrice(priceString: string): number {
    return parseInt(priceString.replace(/[^0-9]/g, ''), 10) || 0;
}

/**
 * Get price label based on availability
 */
export function getPriceLabel(price: string | undefined, availability: string | undefined): string {
    if (!price) return 'View Tickets';
    if (availability === 'sold_out') return 'Sold Out';
    if (availability === 'limited') return `From ${price} (Limited)`;
    return `From ${price}`;
}
