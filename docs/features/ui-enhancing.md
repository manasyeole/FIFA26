# Feature: UI Enhancing — Country Cards & Local Match Times

**Branch:** `feature/ui-enhancing`  
**Status:** Complete

---

## What It Does

### 1. Enhanced Country Cards
All 48 FIFA 2026 participating nations now have rich cards showing:
- **National flag** (full-width image via flagcdn.com)
- **Group badge** (A–L) and **confederation badge** (UEFA, CONMEBOL, etc.)
- **Star player** — name, position, club, shirt number, initials avatar
- **Manager** — name and nationality
- **Hover animations** — card lifts, border brightens, flag scales up

### 2. All 48 Nations Grid
A new `AllCountriesGrid` section on the homepage allows fans to:
- Browse all 48 nations at a glance
- Filter by group (A through L)
- Search by country name or player name

### 3. Match Times in Your Local Timezone
Every match card now shows **two times**:
- Venue local time (existing — grey)
- **Your browser's local time** (new — cyan `your time` label)

Uses the browser's `Intl` API — zero libraries, fully client-side, DST-aware.

---

## Files Changed

| File | Change | Why |
|------|--------|-----|
| `src/data/countries.ts` | **New** | All 48 nations — star players, managers, ISO codes, neon colors |
| `src/lib/timezones.ts` | **New** | Venue→IANA timezone map + DST-aware UTC conversion helpers |
| `src/hooks/useLocalTime.ts` | **New** | React hook wrapping timezone conversion, hydration-safe |
| `src/components/features/countries/CountryCard.tsx` | **New** | Enhanced country card with flag, player avatar, hover FX |
| `src/components/features/countries/AllCountriesGrid.tsx` | **New** | Filterable grid of all 48 nations |
| `src/components/features/countries/index.ts` | **New** | Barrel export |
| `src/components/ui/MatchCard.tsx` | **Modified** | Adds local time row using `useLocalTime` hook |
| `src/app/page.tsx` | **Modified** | Adds `<AllCountriesGrid />` section between Featured Matches and Final Teaser |
| `next.config.ts` | **Modified** | Adds `flagcdn.com` to image remote patterns |
| `docs/features/ui-enhancing.md` | **New** | This file |
| `CHANGELOG.md` | **Modified** | Version bump |

---

## Data Sources

| Data | Source | Auth Required |
|------|--------|---------------|
| Country flags | [flagcdn.com](https://flagcdn.com) `w160/{iso}.png` | No — free, MIT |
| Star players & managers | Compiled from confirmed 2026 squads | N/A (static data) |
| Timezone conversion | Browser `Intl` API | No |

---

## Architecture

```
page.tsx
  └── AllCountriesGrid           (client component — filtering state)
        └── CountryCard × 48     (per-country, reads from data/countries.ts)

MatchCard (existing)
  └── useLocalTime               (hook)
        └── lib/timezones.ts     (VENUE_TIMEZONES map + Intl conversion)
```

---

## Known Limitations

- **Player photos** are CSS initials avatars (Phase 2 will replace with real photos via Cloudinary)
- Squad data accurate as of May 2026; last-minute injuries may not be reflected
- `flagcdn.com` images load from external CDN — not cached locally (acceptable for Phase 1)
- `useLocalTime` returns `null` during SSR to prevent hydration mismatch — shows only on client

---

## How to Test

```bash
cd web && npm run dev
```

1. Open [http://localhost:3000](http://localhost:3000)
2. Scroll to **"All 48 Nations"** section
3. Click group filter buttons A–L — grid filters correctly
4. Type in search box — filters by country or player name
5. Hover a card — lift + glow + flag scale animation
6. Open Schedule page — match cards now show `your time` row in cyan
7. Verify on mobile — 2-column grid, cards fully readable
