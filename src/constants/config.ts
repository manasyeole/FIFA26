/**
 * Site-wide configuration constants.
 * These values are static and do not depend on environment variables.
 * For env-dependent config, read from process.env directly.
 */

export const SITE_CONFIG = {
  name:        "FIFA 2026 Fan Hub",
  description: "The ultimate fan destination for the 2026 FIFA World Cup.",
  url:         process.env.NEXT_PUBLIC_APP_URL ?? "https://fifa26.vercel.app",
  repo:        "https://github.com/manasyeole/FIFA26",
  officialUrl: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026",

  tournament: {
    name:       "FIFA World Cup 2026",
    teams:      48,
    matches:    104,
    groups:     12,
    countries:  3,
    hostCities: 16,
    kickoff:    "2026-06-11T21:00:00-06:00", // Mexico City, opening match
    final:      "2026-07-19T18:00:00-04:00", // MetLife Stadium, New York
  },
} as const;

export const HOST_COUNTRIES = [
  { flag: "🇺🇸", name: "United States", matches: 78, venues: 11, color: "#00ff88" },
  { flag: "🇨🇦", name: "Canada",         matches: 10, venues: 2,  color: "#ff3366" },
  { flag: "🇲🇽", name: "Mexico",          matches: 10, venues: 3,  color: "#ffd700" },
] as const;
