"use client";

import { useEffect, useState } from "react";
import { convertMatchTime } from "@/lib/timezones";

interface LocalTimeState {
  localTime: string | null;  // e.g. "02:30 IST"
  isMounted: boolean;
}

/**
 * Converts a venue-local match time to the viewer's browser timezone.
 * Returns null during SSR to prevent hydration mismatch.
 *
 * @param dateStr   "YYYY-MM-DD"
 * @param timeStr   "HH:MM" (venue local)
 * @param venueName Venue name matching VENUE_TIMEZONES keys in lib/timezones.ts
 */
export function useLocalTime(
  dateStr: string,
  timeStr: string,
  venueName: string
): LocalTimeState {
  const [state, setState] = useState<LocalTimeState>({
    localTime: null,
    isMounted: false,
  });

  useEffect(() => {
    setState({
      localTime: convertMatchTime(dateStr, timeStr, venueName),
      isMounted: true,
    });
  }, [dateStr, timeStr, venueName]);

  return state;
}
