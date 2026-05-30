export const ROUTES = {
  home: "/",
  schedule: "/schedule",
  gallery: "/gallery",
  standings: "/standings",
  teams: "/teams",
  team: (name: string) => `/teams/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"))}`,
  admin: "/admin",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: ROUTES.home },
  { label: "Schedule", href: ROUTES.schedule },
  { label: "Standings", href: ROUTES.standings },
  { label: "Teams", href: ROUTES.teams },
  { label: "Gallery", href: ROUTES.gallery },
] as const;
