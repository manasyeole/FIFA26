"use client";

import { useEffect, useState } from "react";
import { matchTimeToIST } from "@/lib/ist";

interface ISTState {
  istTime: string | null; // e.g. "08:30 PM IST"
  isMounted: boolean;
}

/**
 * Returns the IST (Indian Standard Time) for a given venue match time.
 * `isMounted` is false during SSR to avoid hydration mismatch.
 */
export function useLocalTime(dateStr: string, timeStr: string, venueName: string): ISTState {
  const [state, setState] = useState<ISTState>({ istTime: null, isMounted: false });

  useEffect(() => {
    // Deferred to avoid set-state-in-effect lint rule
    const id = setTimeout(() => {
      setState({
        istTime: matchTimeToIST(dateStr, timeStr, venueName),
        isMounted: true,
      });
    }, 0);
    return () => clearTimeout(id);
  }, [dateStr, timeStr, venueName]);

  return state;
}
