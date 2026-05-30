/**
 * Venue-to-timezone mapping and match time conversion utilities.
 * All conversions use the native Intl API — zero dependencies.
 */

/** Maps venue name (as stored in matches.ts) to IANA timezone string. */
export const VENUE_TIMEZONES: Record<string, string> = {
  "MetLife Stadium": "America/New_York",
  "SoFi Stadium": "America/Los_Angeles",
  "AT&T Stadium": "America/Chicago",
  "Levi's Stadium": "America/Los_Angeles",
  "Lumen Field": "America/Los_Angeles",
  "Hard Rock Stadium": "America/New_York",
  "Mercedes-Benz Stadium": "America/New_York",
  "NRG Stadium": "America/Chicago",
  "Arrowhead Stadium": "America/Chicago",
  "Lincoln Financial": "America/New_York",
  "Gillette Stadium": "America/New_York",
  "BC Place": "America/Vancouver",
  "BMO Field": "America/Toronto",
  "Estadio Azteca": "America/Mexico_City",
  "Estadio Akron": "America/Mexico_City",
  "Estadio BBVA": "America/Monterrey",
};

/**
 * Returns the IANA timezone offset in minutes for a given timezone on a given date.
 * Positive = east of UTC (e.g. IST = +330), negative = west (e.g. EDT = -240).
 * Uses toLocaleString trick for DST-awareness without any library.
 */
function getOffsetMinutes(ianaTimezone: string, refDate: Date): number {
  const utcStr = refDate.toLocaleString("en-US", { timeZone: "UTC" });
  const tzStr = refDate.toLocaleString("en-US", { timeZone: ianaTimezone });
  const utcDate = new Date(utcStr);
  const tzDate = new Date(tzStr);
  return (tzDate.getTime() - utcDate.getTime()) / 60_000;
}

/**
 * Converts a venue-local match time to a UTC Date object.
 * @param dateStr   ISO date "YYYY-MM-DD"
 * @param timeStr   "HH:MM" venue local time
 * @param ianaTimezone  e.g. "America/Chicago"
 */
export function venueTimeToUtc(dateStr: string, timeStr: string, ianaTimezone: string): Date {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const [h, mi] = timeStr.split(":").map(Number);

  // Start with the time treated as UTC (we'll correct below)
  const tempUtc = new Date(Date.UTC(y, mo - 1, d, h, mi, 0));

  // Get venue offset at that approximate moment
  const offsetMinutes = getOffsetMinutes(ianaTimezone, tempUtc);

  // Subtract venue offset to get true UTC epoch
  return new Date(tempUtc.getTime() - offsetMinutes * 60_000);
}

/**
 * Formats a UTC Date in the user's browser timezone.
 * Returns e.g. "02:30 IST" or "20:00 EDT"
 */
export function formatInUserTimezone(utcDate: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    hour12: false,
  }).format(utcDate);
}

/**
 * One-shot helper: given venue date/time/timezone, return a formatted
 * user-local time string.
 */
export function convertMatchTime(
  dateStr: string,
  timeStr: string,
  venueName: string
): string | null {
  const ianaTimezone = VENUE_TIMEZONES[venueName];
  if (!ianaTimezone) return null;
  try {
    const utcDate = venueTimeToUtc(dateStr, timeStr, ianaTimezone);
    return formatInUserTimezone(utcDate);
  } catch {
    return null;
  }
}
