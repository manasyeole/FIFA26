# FIFA 2026 Fan Hub

> The ultimate fan destination for the 2026 FIFA World Cup — full match schedule, fan gallery, and community features.

[![CI](https://github.com/manasyeole/FIFA26/actions/workflows/ci.yml/badge.svg)](https://github.com/manasyeole/FIFA26/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

FIFA 2026 Fan Hub is a fan-made website covering the 2026 FIFA World Cup hosted across the USA, Canada, and Mexico. It features all 104 match schedules with filtering, a fan art gallery, live countdown to kickoff, and a dark neon cyberpunk aesthetic.

**Not affiliated with FIFA. Fan project only.**

---

## Features

| Feature | Status | Phase |
|---|---|---|
| Full 104-match schedule with filters | Live | 1 |
| Dark neon cyberpunk UI | Live | 1 |
| Live countdown timer | Live | 1 |
| Fan art gallery with lightbox | Live | 1 |
| Admin dashboard for content | Planned | 2 |
| Fan submission form | Planned | 2 |
| Live match scores | Planned | 3 |
| Bracket prediction game | Planned | 3 |
| User accounts & community | Planned | 3 |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + Custom CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Hosting | Vercel |
| Database | Supabase (Phase 2) |
| Storage | Supabase Storage → Cloudinary (Phase 2) |

---

## Repository Structure

```
FIFA26/
├── web/                        # Next.js application
│   ├── src/
│   │   ├── app/                # Pages (App Router)
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── schedule/       # Schedule page
│   │   │   ├── gallery/        # Fan gallery page
│   │   │   ├── not-found.tsx   # 404 page
│   │   │   ├── error.tsx       # Error boundary
│   │   │   └── loading.tsx     # Loading state
│   │   ├── components/
│   │   │   ├── ui/             # Reusable primitives (MatchCard, CountdownTimer)
│   │   │   ├── layout/         # Header, Footer
│   │   │   ├── features/       # Feature-specific components
│   │   │   └── providers/      # Context providers wrapper
│   │   ├── hooks/              # Custom React hooks (useCountdown)
│   │   ├── lib/                # Pure utilities (cn, utils)
│   │   ├── types/              # Shared TypeScript types
│   │   ├── constants/          # App config, routes
│   │   └── data/               # Static match data (104 matches)
│   ├── .env.example            # Environment variable template
│   ├── .prettierrc.json        # Prettier config
│   └── package.json
├── docs/                       # Architecture documentation
│   └── ARCHITECTURE_DECISION.md
├── .github/
│   ├── workflows/ci.yml        # CI pipeline
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── CONTRIBUTING.md
└── CHANGELOG.md
```

---

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/manasyeole/FIFA26.git
cd FIFA26/web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local — leave Supabase/Cloudinary keys blank for Phase 1

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run type-check` | Run TypeScript type checking |
| `npm run validate` | Run type-check + lint + format check |

---

## Environment Variables

Copy `web/.env.example` to `web/.env.local`. Only `NEXT_PUBLIC_APP_URL` is required for Phase 1.

See `.env.example` for all variables with documentation.

---

## Deployment

This project deploys automatically to Vercel on every push to `main`.

**Manual deploy:**
1. Fork/clone the repo
2. Import to [vercel.com](https://vercel.com) — set root directory to `web`
3. Add environment variables from `.env.example`
4. Deploy

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow, branch naming, and commit message conventions.

---

## License

MIT — see [LICENSE](LICENSE). This is a fan project. All FIFA trademarks belong to FIFA.
