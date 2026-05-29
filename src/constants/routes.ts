/**
 * Centralised route definitions.
 * Use these instead of hard-coding href strings in components.
 * Prevents typos and makes refactoring routes a single-file change.
 */

export const ROUTES = {
  home:     "/",
  schedule: "/schedule",
  gallery:  "/gallery",
  // Phase 2+
  admin:    "/admin",
  match:    (id: number | string) => `/match/${id}`,
} as const;

export const NAV_ITEMS = [
  { label: "Home",     href: ROUTES.home },
  { label: "Schedule", href: ROUTES.schedule },
  { label: "Gallery",  href: ROUTES.gallery },
] as const;
