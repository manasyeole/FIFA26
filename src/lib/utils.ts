/**
 * General utility functions.
 * Keep functions pure and side-effect free.
 */

import type { Stage } from "@/types";

// ─── Date / Time ─────────────────────────────────────────────────────────────

/**
 * Formats an ISO date string to a human-readable short format.
 * e.g. "2026-06-11" → "Thu, Jun 11"
 */
export function formatMatchDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Formats an ISO date string to a long readable format.
 * e.g. "2026-06-11" → "Thursday, June 11, 2026"
 */
export function formatMatchDateLong(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Returns time remaining from now until a target date.
 */
export function getTimeUntil(target: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
} {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

// ─── Stage Helpers ────────────────────────────────────────────────────────────

export const STAGE_COLORS: Record<Stage, string> = {
  "Group Stage": "#00ff88",
  "Round of 32": "#00d4ff",
  "Round of 16": "#bf5fff",
  Quarterfinal: "#ff9900",
  Semifinal: "#ff3366",
  "Third Place": "#7070a0",
  Final: "#ffd700",
};

export const COUNTRY_FLAG: Record<string, string> = {
  USA: "🇺🇸",
  Canada: "🇨🇦",
  Mexico: "🇲🇽",
};

// ─── String Helpers ───────────────────────────────────────────────────────────

/**
 * Truncates a string and appends ellipsis if it exceeds maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Pads a number with leading zeros to a minimum length.
 */
export function padZero(n: number, length = 2): string {
  return String(n).padStart(length, "0");
}
