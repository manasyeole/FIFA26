/**
 * Central type definitions for FIFA 2026 Fan Hub.
 * All shared types live here. Feature-specific types stay co-located
 * with their feature unless shared across 2+ features.
 */

// ─── Match & Schedule ───────────────────────────────────────────────────────

export type Stage =
  | "Group Stage"
  | "Round of 32"
  | "Round of 16"
  | "Quarterfinal"
  | "Semifinal"
  | "Third Place"
  | "Final";

export type HostCountry = "USA" | "Canada" | "Mexico";

export interface Match {
  id: number;
  matchNumber: number;
  group?: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  city: string;
  country: HostCountry;
  date: string; // ISO date string: "YYYY-MM-DD"
  time: string; // "HH:MM" local time
  stage: Stage;
  homeFlag?: string;
  awayFlag?: string;
}

export interface Venue {
  stadium: string;
  city: string;
  country: HostCountry;
}

// ─── Fan Content ────────────────────────────────────────────────────────────

export type FanPostStatus = "pending" | "approved" | "rejected";

export interface FanPost {
  id: number;
  title: string;
  description: string;
  author: string;
  tag: string;
  tagColor: string;
  emoji: string;
  gradient: string;
  likes: number;
  status?: FanPostStatus;
  imageUrl?: string;
  createdAt?: string;
}

// ─── UI / Component ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface StatCard {
  value: string;
  label: string;
  color: string;
}

// ─── API Response ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}
