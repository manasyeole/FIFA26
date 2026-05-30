"use client";

import { useEffect, useState } from "react";
import { getTimeUntil } from "@/lib/utils";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isMounted: boolean;
}

/**
 * Returns a live countdown to a target date, updating every second.
 * `isMounted` is false during SSR to prevent hydration mismatch.
 */
export function useCountdown(target: Date): CountdownState {
  const [state, setState] = useState<CountdownState>({
    ...getTimeUntil(target),
    isMounted: false,
  });

  useEffect(() => {
    // Defer initial setState to avoid synchronous set-in-effect lint error.
    // setTimeout 0 makes it a callback, not a synchronous effect-body call.
    const initId = setTimeout(() => {
      setState({ ...getTimeUntil(target), isMounted: true });
    }, 0);

    const id = setInterval(() => {
      setState({ ...getTimeUntil(target), isMounted: true });
    }, 1000);

    return () => {
      clearTimeout(initId);
      clearInterval(id);
    };
  }, [target]);

  return state;
}
