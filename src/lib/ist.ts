/**
 * Indian Standard Time (IST) utilities — UTC+5:30.
 * All match times on this site are shown in IST for Indian fans.
 */
import { venueTimeToUtc, VENUE_TIMEZONES } from "@/lib/timezones";

const IST_TIMEZONE = "Asia/Kolkata";

/**
 * Converts a UTC Date to IST formatted string.
 * Output format: "12:30 PM IST"
 */
export function utcToIST(utcDate: Date): string {
  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(utcDate);

  // Normalise to "12:30 PM IST" (en-IN sometimes outputs "12:30 pm")
  return time.replace(/\s?(am|pm)/i, (m) => " " + m.trim().toUpperCase()) + " IST";
}

/**
 * Converts venue-local match time to IST string.
 * Returns null if the venue timezone is unknown.
 *
 * @param dateStr  "YYYY-MM-DD"
 * @param timeStr  "HH:MM" venue local time
 * @param venueName  Exact venue name from matches.ts
 */
export function matchTimeToIST(
  dateStr: string,
  timeStr: string,
  venueName: string
): string | null {
  const ianaTimezone = VENUE_TIMEZONES[venueName];
  if (!ianaTimezone) return null;
  try {
    const utc = venueTimeToUtc(dateStr, timeStr, ianaTimezone);
    return utcToIST(utc);
  } catch {
    return null;
  }
}

/**
 * Returns full IST date+time for a match.
 * Output: "Thu, Jun 11 · 08:30 PM IST"
 */
export function matchFullIST(
  dateStr: string,
  timeStr: string,
  venueName: string
): string | null {
  const ianaTimezone = VENUE_TIMEZONES[venueName];
  if (!ianaTimezone) return null;
  try {
    const utc = venueTimeToUtc(dateStr, timeStr, ianaTimezone);
    const datePart = new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIMEZONE,
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(utc);
    return `${datePart} · ${utcToIST(utc)}`;
  } catch {
    return null;
  }
}
