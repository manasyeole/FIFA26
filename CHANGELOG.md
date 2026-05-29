# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] — 2026-05-30

### Added
- `src/data/countries.ts` — All 48 FIFA 2026 nations with star players, managers, ISO codes, neon colors
- `src/lib/timezones.ts` — Venue-to-IANA timezone map + DST-aware UTC conversion using Intl API
- `src/hooks/useLocalTime.ts` — Hydration-safe hook converting venue match time to user's browser timezone
- `src/components/features/countries/CountryCard.tsx` — Enhanced card with flag (flagcdn.com), group/conf badges, star player avatar (initials), manager info, hover animations
- `src/components/features/countries/AllCountriesGrid.tsx` — Filterable grid (group A–L + search) showing all 48 nations
- `src/components/features/countries/index.ts` — Barrel export
- `docs/features/ui-enhancing.md` — Feature documentation

### Changed
- `src/components/ui/MatchCard.tsx` — Adds "your time" local timezone row (cyan, `useLocalTime` hook)
- `src/app/page.tsx` — Adds `<AllCountriesGrid />` section between Featured Matches and Final Teaser
- `next.config.ts` — Adds `flagcdn.com` to allowed image remote patterns

---

## [1.1.0] — 2026-05-30

### Added
- Organization-level project structure: `types/`, `lib/`, `hooks/`, `constants/`, `components/features/`, `components/providers/`
- `src/types/index.ts` — centralized TypeScript types for the entire project
- `src/lib/cn.ts` — lightweight className merge utility
- `src/lib/utils.ts` — shared pure utilities (`formatMatchDate`, `getTimeUntil`, `STAGE_COLORS`, `COUNTRY_FLAG`, `padZero`, `truncate`)
- `src/hooks/useCountdown.ts` — extracted countdown logic from `CountdownTimer` into a reusable hook
- `src/constants/config.ts` — site-wide configuration constants (`SITE_CONFIG`, `HOST_COUNTRIES`)
- `src/constants/routes.ts` — centralized route definitions and `NAV_ITEMS`
- `src/components/ui/index.ts` — barrel export for UI components
- `src/components/layout/index.ts` — barrel export for layout components
- `src/components/providers/index.tsx` — root providers wrapper (placeholder for Phase 2 auth/Supabase)
- `src/app/not-found.tsx` — custom 404 page
- `src/app/error.tsx` — root error boundary
- `src/app/loading.tsx` — global loading state
- `.prettierrc.json` — Prettier configuration
- `.prettierignore` — Prettier ignore rules
- `.env.example` — documented environment variable template
- `commitlint.config.cjs` — conventional commit enforcement
- `.github/workflows/ci.yml` — GitHub Actions CI (type-check + lint + build)
- `.github/PULL_REQUEST_TEMPLATE.md` — standardized PR template
- `.github/ISSUE_TEMPLATE/bug_report.yml` — bug report template
- `.github/ISSUE_TEMPLATE/feature_request.yml` — feature request template
- `.github/CODEOWNERS` — code ownership definitions
- `README.md` — comprehensive project documentation with badges
- `CONTRIBUTING.md` — development workflow and code standards
- Dev dependencies: `prettier`, `husky`, `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`

### Changed
- `package.json` — added `engines`, `description`, `lint:fix`, `format`, `format:check`, `type-check`, `validate` scripts; `lint-staged` config
- `tsconfig.json` — added `forceConsistentCasingInFileNames`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`; expanded path aliases
- `eslint.config.mjs` — added strict TypeScript rules (`no-explicit-any`, `consistent-type-imports`), React rules, `no-console` warning
- `next.config.ts` — added image remote patterns (Supabase, Cloudinary), security headers, production console removal
- `CountdownTimer.tsx` — refactored to use `useCountdown` hook; imports `padZero` from `lib/utils`; uses `SITE_CONFIG` for kickoff date
- `MatchCard.tsx` — imports `Match` type from `@/types`; uses `STAGE_COLORS` and `COUNTRY_FLAG` from `@/lib/utils`
- `Header.tsx` — uses `NAV_ITEMS` from `@/constants/routes` and `SITE_CONFIG` from `@/constants/config`
- `matches.ts` — imports types from `@/types`; re-exports `formatMatchDate` from `@/lib/utils`

---

## [1.0.0] — 2026-05-30

### Added
- Next.js 16 project with TypeScript, Tailwind CSS v4, App Router
- Dark neon cyberpunk design system — custom CSS with `@theme`, keyframes, utility classes
- Homepage with hero section, live countdown timer, stats grid, host countries, featured matches
- Full schedule page with all 104 FIFA 2026 matches, group/stage filter, search
- Fan gallery with masonry grid, tag filter, lightbox, and like toggle
- Header with fixed navigation, mobile hamburger menu, active route highlight
- Footer with nav links, disclaimer, external links
- `src/data/matches.ts` — all 104 match records with venues, dates, teams, stages
- Orbitron + Inter Google Fonts
- Framer Motion and Lucide React dependencies
- Vercel deployment configuration
