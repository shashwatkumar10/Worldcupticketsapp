// Date formatting utilities

import { format, parseISO, formatDistanceToNow, differenceInDays } from 'date-fns';

/**
 * Format a date for display (e.g., "June 11, 2026")
 */
export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'MMMM d, yyyy');
}

/**
 * Format a short date (e.g., "Jun 11")
 */
export function formatShortDate(date: string | Date): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'MMM d');
}

/**
 * Format date and time (e.g., "June 11, 2026 at 8:00 PM")
 */
export function formatDateTime(date: string | Date): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, "MMMM d, yyyy 'at' h:mm a");
}

/**
 * Format time only (e.g., "8:00 PM")
 */
export function formatTime(time: string): string {
    // Handle HH:mm format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

/**
 * Get relative time (e.g., "in 5 days", "2 months ago")
 */
export function getRelativeTime(date: string | Date): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Get days until event
 */
export function getDaysUntil(date: string | Date): number {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return differenceInDays(d, new Date());
}

/**
 * Format date range (e.g., "June 11 - July 19, 2026")
 */
export function formatDateRange(startDate: string | Date, endDate: string | Date): string {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;

    if (format(start, 'yyyy') === format(end, 'yyyy')) {
        return `${format(start, 'MMMM d')} - ${format(end, 'MMMM d, yyyy')}`;
    }
    return `${format(start, 'MMMM d, yyyy')} - ${format(end, 'MMMM d, yyyy')}`;
}
