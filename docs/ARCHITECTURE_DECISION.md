# FIFA 2026 Website — Architecture Decision Record (ADR)
**Document Version:** 1.0  
**Author:** Architecture Review  
**Date:** 2026-05-30  
**Project:** FIFA 2026 Fan Website — Schedules, Fan Gallery, Community

---

## Table of Contents

1. [Project Context & Requirements](#1-project-context--requirements)
2. [Architecture Overview](#2-architecture-overview)
3. [Layer-by-Layer Technology Comparisons](#3-layer-by-layer-technology-comparisons)
   - 3.1 Frontend Frameworks
   - 3.2 CSS & Styling Systems
   - 3.3 Animation Libraries
   - 3.4 Backend / API Layer
   - 3.5 Databases
   - 3.6 Authentication
   - 3.7 File & Image Storage
   - 3.8 Hosting & Deployment
   - 3.9 CMS (Content Management)
   - 3.10 Sports Data APIs
4. [Final Stack Decision](#4-final-stack-decision)
5. [Phase-wise Rollout Plan](#5-phase-wise-rollout-plan)
6. [Cost Analysis](#6-cost-analysis)
7. [Architecture Diagrams](#7-architecture-diagrams)
8. [Risk Register](#8-risk-register)

---

## 1. Project Context & Requirements

### What We Are Building

| Feature | Phase | Priority |
|---|---|---|
| FIFA 2026 full match schedule (104 games) | 1 | Critical |
| Dark neon cyberpunk UI | 1 | Critical |
| Fan art / crazy edit gallery | 1 | High |
| Admin dashboard for content upload | 2 | High |
| Fan submission form | 2 | Medium |
| Live match scores | 3 | Medium |
| Bracket prediction game | 3 | Medium |
| User accounts & community | 3 | Low |

### Non-Functional Requirements

| Requirement | Target |
|---|---|
| Page Load Speed | < 2 seconds globally |
| Mobile Responsive | 100% |
| SEO (Google indexability) | Required for schedule pages |
| Uptime | 99.9%+ |
| Initial Budget | $0 |
| Scalability | Handle viral traffic spikes |
| Developer (you) Experience | Minimal maintenance |

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                           │
│              Chrome / Safari / Firefox / Mobile                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS Request
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CDN / EDGE NETWORK                            │
│     Vercel Edge — 100+ PoPs globally (London, Mumbai, NYC...)   │
│     Static assets cached at edge — serves in < 50ms            │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Cache miss → Origin
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS APPLICATION                          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  Static Pages │  │  SSR Pages   │  │    API Routes         │ │
│  │  /schedule   │  │  /gallery    │  │  /api/fan-content     │ │
│  │  /about      │  │  /match/:id  │  │  /api/upload          │ │
│  │  /           │  │              │  │  /api/admin           │ │
│  └──────────────┘  └──────────────┘  └──────────────┬────────┘ │
└─────────────────────────────────────────────────────┬───────────┘
                                                      │
                           ┌──────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SUPABASE                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  PostgreSQL  │  │   Storage    │  │     Auth (Phase 3)    │ │
│  │  fan_posts   │  │  Fan images  │  │   User accounts       │ │
│  │  matches     │  │  Videos      │  │   Admin roles         │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Layer-by-Layer Technology Comparisons

---

### 3.1 Frontend Frameworks

The frontend framework is the most important decision — everything is built on top of it.

| Criteria | Next.js 14 | Nuxt.js 3 | Remix | Astro | SvelteKit | Plain React |
|---|---|---|---|---|---|---|
| **Language** | React/TSX | Vue/TSX | React/TSX | Any | Svelte | React/JSX |
| **Rendering** | SSG+SSR+ISR | SSG+SSR | SSR-first | SSG+Islands | SSG+SSR | CSR only |
| **SEO** | Excellent | Excellent | Excellent | Excellent | Good | Poor |
| **Performance** | 95/100 | 93/100 | 92/100 | 99/100 | 96/100 | 70/100 |
| **Learning Curve** | Medium | Medium | Medium-High | Low | Medium | Low |
| **Ecosystem Size** | Massive | Large | Growing | Medium | Medium | Massive |
| **Full-Stack** | Yes (API Routes) | Yes (Nitro) | Yes (Loaders) | Partial | Yes | No |
| **Image Optimization** | Built-in | Built-in | Manual | Built-in | Manual | Manual |
| **TypeScript** | Native | Native | Native | Native | Native | Add-on |
| **Deployment** | Vercel (native) | Any | Any | Any | Vercel/Cloudflare | Any |
| **Free Tier Host** | Vercel | Netlify | Fly.io | Netlify/Cloudflare | Vercel | GitHub Pages |
| **Animation Support** | All libraries | All libraries | All libraries | Limited | All libraries | All libraries |
| **Community** | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| **Job Market** | #1 | #3 | #4 | #5 | #6 | #2 |

**Deep Dive: Why Next.js Wins for This Project**

```
Next.js Rendering Strategy per Page:

/schedule          → Static Site Generation (SSG)
                     Schedule is fixed data → pre-build at deploy time
                     Served from CDN in < 50ms worldwide

/gallery           → Incremental Static Regeneration (ISR)
                     Revalidate every 60s → new fan content appears
                     without full redeploy

/match/[id]        → SSG with dynamic params
                     All 104 match pages pre-generated

/api/*             → Serverless Functions
                     Runs on Vercel Edge, auto-scales to 0
```

**Astro consideration:** Astro would give slightly better performance (zero JS by default), but the lack of mature React ecosystem and complex animation support makes it second choice for a visually heavy site.

**DECISION: Next.js 14 with App Router**

---

### 3.2 CSS & Styling Systems

| Criteria | Tailwind CSS | CSS Modules | Styled Components | Sass/SCSS | Emotion | Vanilla CSS |
|---|---|---|---|---|---|---|
| **Approach** | Utility-first | Scoped CSS | CSS-in-JS | Preprocessor | CSS-in-JS | Global CSS |
| **Bundle Size** | Tiny (purged) | Small | Medium | Medium | Medium | Varies |
| **Dev Speed** | Very Fast | Medium | Medium | Medium | Medium | Slow |
| **Custom Themes** | Excellent | Manual | Good | Excellent | Good | Manual |
| **Dark Mode** | 1 line (`dark:`) | Manual | Manual | Manual | Manual | Manual |
| **Responsive** | Built-in (`md:`) | Manual | Manual | Manual | Manual | Manual |
| **Animation** | Basic only | Full | Full | Full | Full | Full |
| **Glassmorphism** | Easy | Easy | Easy | Easy | Easy | Easy |
| **Neon Effects** | Easy | Medium | Medium | Easy | Medium | Medium |
| **Performance** | Best | Excellent | Good (runtime) | Excellent | Good (runtime) | Excellent |
| **TypeScript** | No types needed | Good | Excellent | N/A | Excellent | N/A |
| **Learning** | Easy | Easy | Medium | Easy | Medium | Easy |

**The Neon/Cyberpunk requirement changes this calculation:**

```css
/* Tailwind approach — write directly in JSX */
<div className="
  bg-black/90 
  border border-green-400/30 
  shadow-[0_0_30px_rgba(0,255,136,0.3)]
  hover:shadow-[0_0_60px_rgba(0,255,136,0.6)]
  backdrop-blur-md
  transition-all duration-300
">

/* Custom CSS needed for complex glows — handled in globals.css */
.neon-card {
  box-shadow: 
    0 0 10px #00ff88,
    0 0 20px #00ff88,
    0 0 40px #00ff88,
    inset 0 0 10px rgba(0,255,136,0.1);
}
```

**DECISION: Tailwind CSS + custom global CSS for advanced neon effects**

---

### 3.3 Animation Libraries

Animations are critical for the cyberpunk feel. This section matters a lot for this project.

| Criteria | Framer Motion | GSAP | CSS Animations | AOS | Three.js | Lottie | React Spring |
|---|---|---|---|---|---|---|---|
| **Primary Use** | React components | Any | Browsers | Scroll | 3D/WebGL | JSON anim | Physics |
| **Learning Curve** | Low | Medium | Low | Very Low | Very High | Low | Medium |
| **Performance** | GPU (60fps) | GPU (60fps) | GPU (60fps) | JS-based | GPU | Varies | GPU |
| **Bundle Size** | 47KB | 67KB (free) | 0KB | 7KB | 600KB+ | Varies | 26KB |
| **React Native** | No | No | No | No | No | Yes | Yes |
| **Page Transitions** | Excellent | Good | Poor | No | No | No | Good |
| **Scroll Animations** | Good | Excellent | Limited | Great | No | No | Limited |
| **Hover Effects** | Excellent | Excellent | Good | No | No | No | Good |
| **Stagger Animations** | Built-in | Built-in | Manual | Limited | No | Yes | Yes |
| **Layout Animations** | Unique feature | No | No | No | No | No | Limited |
| **Free** | Yes | Free tier | Yes | Yes | Yes | Free tier | Yes |

**What each handles for FIFA 2026 site:**

```
Framer Motion handles:
├── Page enter/exit transitions (match card reveals)
├── Match card hover lift + glow
├── Schedule filter animations
├── Gallery image expand/collapse
└── Staggered list reveals (team groups appearing one by one)

CSS Animations handle:
├── Continuous neon glow pulse
├── Background particle effects
├── Gradient shifts
└── Loading spinners

GSAP (if needed in Phase 2+):
└── Complex timeline animations (hero sequence, score reveals)
```

**DECISION: Framer Motion (primary) + CSS Animations (glow effects)**  
GSAP added only if Phase 2 requires complex sequencing.

---

### 3.4 Backend / API Layer

| Criteria | Next.js API Routes | Express.js | Fastify | NestJS | Hono | Separate Backend |
|---|---|---|---|---|---|---|
| **Setup** | Zero (built-in) | Separate server | Separate server | Separate server | Edge-native | Full separate project |
| **Deployment** | Vercel (free) | Railway/Render | Railway/Render | Railway/Render | Cloudflare Workers | Separate hosting cost |
| **Serverless** | Native | No | No | No | Native | Depends |
| **Auto-Scale** | Yes (Vercel) | Manual | Manual | Manual | Yes | Depends |
| **Cold Start** | ~200ms | ~500ms | ~300ms | ~800ms | ~50ms | Depends |
| **TypeScript** | Native | Add-on | Native | Native | Native | Depends |
| **WebSockets** | Limited | Full | Full | Full | Limited | Full |
| **Background Jobs** | Limited | Full | Full | Full | Limited | Full |
| **Complexity** | Very Low | Low | Low | High | Very Low | High |
| **Free Tier** | Vercel (100k req/mo) | Render (slow cold) | Same | Same | CF Workers (100k/day) | Varies |

**Architecture consideration for this project:**

```
Phase 1-2: Next.js API Routes are sufficient
├── /api/fan-posts     GET  → fetch approved fan content from Supabase
├── /api/fan-posts     POST → submit new fan content
├── /api/admin/upload  POST → admin uploads image to Supabase Storage
└── /api/admin/approve PUT  → admin approves fan submission

Phase 3 (Live Scores): May need a separate lightweight service
└── A Node.js cron job on Railway (free tier) to poll sports API
    and push updates to Supabase Realtime
```

**Why NOT a separate backend for Phase 1-2:**
- Zero additional cost
- Zero additional deployment complexity
- Zero additional maintenance
- Vercel cold starts are acceptable for non-real-time features

**DECISION: Next.js API Routes for Phase 1-2, evaluate Hono/separate service at Phase 3**

---

### 3.5 Databases

| Criteria | Supabase | Firebase Firestore | PlanetScale | MongoDB Atlas | Neon (Postgres) | Turso (SQLite) | Airtable |
|---|---|---|---|---|---|---|---|
| **Type** | PostgreSQL | NoSQL | MySQL (serverless) | NoSQL | PostgreSQL | SQLite edge | Spreadsheet-DB |
| **Free Tier** | 500MB + 1GB storage | 1GB + 10GB transfer | 5GB + 1B reads | 512MB | 0.5GB | 9GB (SQLite) | 1,000 records |
| **Real-time** | Yes (Websockets) | Yes (native) | No | Change Streams | No | No | No |
| **Auth Built-in** | Yes | Yes | No | No | No | No | No |
| **Storage Built-in** | Yes (1GB) | Yes (5GB) | No | No | No | No | No |
| **SQL Support** | Full SQL | No | Full SQL | No (MQL) | Full SQL | SQL | No |
| **Edge/Serverless** | Good | Excellent | Excellent | Good | Excellent | Excellent | Poor |
| **Scalability** | Excellent | Excellent | Excellent | Excellent | Excellent | Good | Poor |
| **Migrations** | Yes | Manual | Yes | Manual | Yes | Yes | No |
| **Dashboard UI** | Beautiful | Good | Good | Good | Minimal | Minimal | Excellent |
| **Vendor Lock-in** | Low (Postgres) | HIGH | Low (MySQL) | Medium | Very Low | Low | HIGH |
| **Open Source** | Yes | No | No | Partial | Yes | Yes | No |
| **Self-host Option** | Yes | No | No | No | No | Yes | No |

**Data model for this project:**

```sql
-- Supabase PostgreSQL Schema

-- Fan submitted content
CREATE TABLE fan_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  image_url   TEXT NOT NULL,
  author_name TEXT,
  status      TEXT DEFAULT 'pending', -- pending | approved | rejected
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Match schedule (seeded from static data)
CREATE TABLE matches (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_number INT UNIQUE,
  group_name  TEXT,       -- 'A', 'B', ... or 'R16', 'QF', 'SF', 'F'
  team_home   TEXT,
  team_away   TEXT,
  venue       TEXT,
  city        TEXT,
  country     TEXT,       -- USA, Canada, Mexico
  match_date  TIMESTAMPTZ,
  stage       TEXT        -- 'Group', 'Round of 32', 'Final' etc.
);

-- Row Level Security — only approved posts are public
ALTER TABLE fan_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads approved" ON fan_posts
  FOR SELECT USING (status = 'approved');
```

**Why Supabase wins hard for this project:**
1. Single service replaces DB + Storage + Auth + Realtime
2. Postgres = real SQL, no vendor lock-in, can self-host if needed
3. The dashboard is a free CMS for managing fan content
4. Real-time will power live score updates in Phase 3

**DECISION: Supabase**

---

### 3.6 Authentication (Phase 3 Feature)

Not needed at launch, but planned for Phase 3 community features.

| Criteria | Supabase Auth | Clerk | NextAuth.js | Auth0 | Firebase Auth |
|---|---|---|---|---|---|
| **Free Tier** | 50,000 MAU | 10,000 MAU | Unlimited (self) | 7,500 MAU | 10,000 MAU/month |
| **Social Login** | Yes (GitHub, Google, etc.) | Yes | Yes | Yes | Yes |
| **Magic Links** | Yes | Yes | Plugin | Plugin | No |
| **Setup Time** | 30 min | 15 min | 1-2 hours | 2+ hours | 45 min |
| **Built-in UI** | Basic | Beautiful | No (DIY) | Good | No (DIY) |
| **Next.js Integration** | Official SDK | Official SDK | Native | SDK | SDK |
| **Complexity** | Low | Very Low | Medium | High | Medium |
| **Cost at Scale** | $25/mo (unlimited) | $25/mo (10k+) | Infrastructure cost | Expensive | Pay-per-use |
| **Vendor Lock-in** | Low | Medium | None | High | High |

**DECISION: Supabase Auth (since we're already using Supabase — single vendor)**

---

### 3.7 File & Image Storage

Fan images and edits are a core feature — this decision affects performance and cost.

| Criteria | Supabase Storage | Cloudinary | AWS S3 | Uploadthing | ImageKit | Bunny.net CDN |
|---|---|---|---|---|---|---|
| **Free Tier** | 1GB storage | 25GB storage + 25GB CDN | 5GB (12 months) | 2GB storage | 20GB storage + 20GB CDN | No free tier |
| **Image Transforms** | Basic resize | Extensive (crop, filter, AI) | Manual (Lambda) | Basic | Extensive | Basic |
| **CDN Included** | Yes (Supabase CDN) | Yes (global) | No (add CloudFront) | Yes | Yes | Yes (native CDN) |
| **Direct Upload** | Yes | Yes (signed) | Yes (signed) | Yes | Yes | Yes |
| **Video Support** | Yes | Yes (paid) | Yes | No | No | Yes |
| **Next.js Integration** | Official SDK | next-cloudinary | AWS SDK | Official SDK | SDK | Manual |
| **Lazy Loading** | Manual | Automatic | Manual | Manual | Automatic | Manual |
| **WebP Conversion** | No | Automatic | No | No | Automatic | No |
| **Setup Complexity** | Very Low | Low | Medium | Low | Low | Medium |

**For fan art images — the key question is transformation:**

```
Supabase Storage approach:
User uploads → Supabase stores → You serve raw image
Limitation: No auto-resize, no format conversion
Best for: Phase 1 (simple, fast to build)

Cloudinary approach:
User uploads → Cloudinary stores → On-the-fly transforms
/image/upload/w_800,h_600,c_fill,f_webp/fan_art_001.jpg
Best for: Phase 2+ (better performance, auto WebP, thumbnails)
```

**DECISION: Supabase Storage for Phase 1 (zero extra service), Cloudinary added at Phase 2**

---

### 3.8 Hosting & Deployment

| Criteria | Vercel | Netlify | Cloudflare Pages | Railway | Render | AWS Amplify | GitHub Pages |
|---|---|---|---|---|---|---|---|
| **Free Tier** | Excellent | Good | Excellent | $5 credit/mo | 750hrs/mo | Limited | Static only |
| **Next.js Support** | Native (made by team) | Good | Good | Good | Good | Good | No |
| **Edge Network** | 100+ PoPs | Durable Functions | 300+ PoPs | Limited | Limited | CloudFront | GitHub CDN |
| **Deploy Trigger** | Git push | Git push | Git push | Git push | Git push | Git push | Git push |
| **Preview URLs** | Yes (per PR) | Yes | Yes | Yes | Yes | Yes | No |
| **Custom Domain** | Free SSL | Free SSL | Free SSL | Free SSL | Free SSL | Free SSL | Free SSL |
| **Serverless Fns** | Yes (Edge+Node) | Yes | Yes (Workers) | No (containers) | No | Yes | No |
| **Cold Starts** | ~200ms | ~300ms | ~50ms (edge) | None (always on) | ~500ms | ~300ms | N/A |
| **Build Time** | Fast | Fast | Fast | Fast | Slow (free) | Medium | Medium |
| **Analytics** | Built-in | Built-in | Built-in | No | No | No | No |
| **Bandwidth Limit** | 100GB/mo free | 100GB/mo free | Unlimited | By compute | 100GB/mo | 15GB/mo | 100GB/mo |

**The Vercel + Next.js combination is unbeatable for this stack:**

```
Deploy Workflow:
1. git push origin main
2. Vercel auto-detects Next.js
3. Runs next build (SSG pre-renders all 104 match pages)
4. Deploys to global edge in ~90 seconds
5. yoursite.vercel.app is live

Preview Deploys (killer feature):
Every branch / PR gets its own URL:
feature-gallery.yoursite.vercel.app
Test before merging — zero risk to live site
```

**Cloudflare Pages** is the only real competitor — faster edge (50ms vs 200ms cold start), but Next.js integration requires workarounds. Not worth it for this project.

**DECISION: Vercel**

---

### 3.9 CMS (Content Management System)

For managing fan content, match details, and site copy without touching code.

| Criteria | Supabase Dashboard | Sanity.io | Contentful | Strapi (self-host) | Directus | Payload CMS |
|---|---|---|---|---|---|---|
| **Free Tier** | Unlimited (DB dashboard) | 3 users, 2 datasets | 3 users, 25k records | Self-hosted (free) | Self-hosted (free) | Self-hosted (free) |
| **Setup Time** | 0 min (already there) | 30 min | 45 min | 2+ hours | 2+ hours | 3+ hours |
| **Hosting Needed** | No (Supabase hosts) | No (Sanity hosts) | No (Contentful hosts) | Yes | Yes | Yes |
| **Image Handling** | Supabase Storage | Sanity CDN | Contentful CDN | Local/cloud | Local/cloud | Local/cloud |
| **Custom UI** | Basic table view | Rich editor | Rich editor | Full admin | Full admin | Full admin |
| **API** | REST + GraphQL | GROQ + REST | REST + GraphQL | REST + GraphQL | REST + GraphQL | REST + GraphQL |
| **Real-time** | Yes | No | No | No | Yes | No |
| **Learning Curve** | Very Low | Low | Low | Medium | Medium | High |
| **Next.js Integration** | Supabase SDK | Next.js plugin | Official SDK | REST calls | REST calls | Official SDK |
| **Cost at Scale** | Included in Supabase | ~$99/mo | ~$300/mo | Server cost | Server cost | Server cost |

**For Phase 1-2:** The Supabase table dashboard IS your CMS.

```
How you manage fan content without a CMS:
1. Open supabase.com → your project → Table Editor
2. See all fan_posts with status = 'pending'
3. Click a row, change status to 'approved'
4. Row Level Security auto-shows it on site
No code. No extra service. No cost.
```

**DECISION: Supabase Dashboard as CMS for Phase 1-2, evaluate Sanity at Phase 3 for richer content**

---

### 3.10 Sports Data APIs

FIFA 2026 schedule data source — critical decision.

| API | Free Tier | Data Coverage | Reliability | Latency | Docs Quality |
|---|---|---|---|---|---|
| **Static JSON (self)** | Unlimited | Manual | 100% | 0ms (CDN) | N/A |
| **football-data.org** | 10 req/min, major leagues | FIFA WC included | High | ~300ms | Good |
| **API-Football (RapidAPI)** | 100 req/day | Comprehensive | Excellent | ~200ms | Excellent |
| **TheSportsDB** | Free tier, limited | Good | Medium | ~400ms | Medium |
| **ESPN API (unofficial)** | No official API | Excellent | Medium | ~200ms | Poor (no docs) |
| **Allsports API** | 100 req/day | Good | Good | ~300ms | Good |

**Phase 1 — Static JSON approach (recommended):**

```json
// /data/matches.json — pre-seeded with full FIFA 2026 schedule
{
  "matches": [
    {
      "id": 1,
      "matchNumber": 1,
      "group": "A",
      "homeTeam": "Mexico",
      "awayTeam": "TBD",
      "venue": "Estadio Azteca",
      "city": "Mexico City",
      "country": "Mexico",
      "date": "2026-06-11T20:00:00-06:00",
      "stage": "Group Stage"
    }
    // ... 103 more matches
  ]
}
```

Why static JSON first:
- Zero API cost, zero rate limit issues
- The schedule is fixed and publicly known
- Zero external dependency = 100% uptime
- Can be updated manually if schedule changes

**Phase 3 — Live Score API:**  
API-Football via RapidAPI — 100 free req/day is enough for match day polling (1 req per match, ~8 matches max per day in group stage).

**DECISION: Static JSON for Phase 1-2, API-Football for live scores in Phase 3**

---

## 4. Final Stack Decision

```
┌─────────────────────────────────────────────────────────────────┐
│                    FINAL TECHNOLOGY STACK                       │
├─────────────────┬───────────────────────────────────────────────┤
│ Frontend        │ Next.js 14 (App Router) + TypeScript          │
│ Styling         │ Tailwind CSS + Custom CSS (neon effects)       │
│ Animations      │ Framer Motion + CSS Animations                │
│ Backend         │ Next.js API Routes (serverless)               │
│ Database        │ Supabase (PostgreSQL)                         │
│ File Storage    │ Supabase Storage → Cloudinary (Phase 2)       │
│ Authentication  │ Supabase Auth (Phase 3)                       │
│ CMS             │ Supabase Dashboard → Sanity (Phase 3)         │
│ Hosting         │ Vercel                                        │
│ Schedule Data   │ Static JSON → API-Football (Phase 3)          │
│ Domain          │ .vercel.app → Custom domain (anytime)         │
│ Analytics       │ Vercel Analytics (free, built-in)             │
└─────────────────┴───────────────────────────────────────────────┘
```

### Why This Stack is Optimal

**1. Zero Operational Burden**  
No servers to manage. Vercel and Supabase are fully managed. Deploy with git push. Sleep at night.

**2. Free Until You're Big**  
This stack costs $0 until you hit 500,000+ visitors/month or 50,000 registered users. Both are "you've gone viral" numbers.

**3. Progressive Complexity**  
Phase 1 uses 20% of the stack's capability. Phase 3 uses 90%. You don't pay (in money or complexity) for features you haven't built yet.

**4. No Vendor Lock-in Trap**  
- Next.js → Standard React, runs anywhere
- PostgreSQL → Standard SQL, self-hostable
- Vercel → Can move to Cloudflare/Railway with config change
- Supabase → Open source, self-hostable

**5. Ecosystem Maturity**  
Every tool here has 5+ years of production use, millions of projects, and active communities. You won't hit an undocumented edge case with no Stack Overflow answer.

---

## 5. Phase-wise Rollout Plan

```
PHASE 1 — LAUNCH (Weeks 1-2)
═══════════════════════════════════════
Goal: Live site with core features

Week 1:
├── Project scaffolding (Next.js + Tailwind + TypeScript)
├── Design system: colors, fonts, neon components
├── Homepage: hero, countdown timer, team grid
└── Deploy to Vercel

Week 2:
├── Schedule page: all 104 matches with filtering
├── Match card components with neon styling
├── Fan gallery: grid layout with lightbox
├── Supabase: seed fan_posts + matches tables
└── Mobile responsive audit + launch

Deliverables: Live URL, all 104 matches, gallery, neon UI
───────────────────────────────────────────────────────────

PHASE 2 — CONTENT MANAGEMENT (Weeks 3-4)
═══════════════════════════════════════
Goal: You can manage the site without code

Week 3:
├── Fan submission form (name + image upload)
├── Supabase Storage integration
├── Admin API routes (approve/reject submissions)
└── Email notification on new submission (Resend free tier)

Week 4:
├── Match detail pages (/match/[id])
├── Group standings table
├── Venue showcase pages
└── Cloudinary integration for image optimization

Deliverables: Self-service content management, match deep-dives
───────────────────────────────────────────────────────────

PHASE 3 — COMMUNITY (Month 2+)
═══════════════════════════════════════
Goal: Users engage, not just consume

├── User accounts (Supabase Auth + Google login)
├── Live score integration (API-Football polling)
├── Bracket prediction game
├── Fan voting / reactions on gallery posts
├── Real-time score updates (Supabase Realtime)
└── Custom domain migration

Deliverables: Community platform, live match tracking
```

---

## 6. Cost Analysis

### Phase 1-2: $0/month

| Service | Free Tier | Your Usage (estimated) | Cost |
|---|---|---|---|
| Vercel | 100GB bandwidth, 100k serverless invocations | ~5GB bandwidth, ~10k invocations | $0 |
| Supabase | 500MB DB, 1GB storage, 2GB transfer | ~50MB DB, ~200MB storage | $0 |
| Domain | vercel.app subdomain | yoursite.vercel.app | $0 |

### Phase 3 with Growth: ~$25-50/month

| Service | Plan | Cost |
|---|---|---|
| Vercel Pro | 1TB bandwidth, analytics | $20/mo |
| Supabase Pro | 8GB DB, 100GB storage | $25/mo |
| Custom domain | .com annually | ~$1/mo |
| API-Football | Basic paid (if needed) | $10/mo |
| **Total** | | **~$56/mo** |

### If You Go Viral (1M+ visitors): ~$100-200/month

Still dramatically cheaper than AWS/GCP/Azure equivalents which would run $500-2000/month for equivalent traffic.

---

## 7. Architecture Diagrams

### Request Flow — Schedule Page (SSG)

```
Browser → Vercel Edge CDN
              │
              │ (First request or cache miss)
              ▼
         Next.js Build
              │
              │ next build generates:
              │ /schedule → static HTML
              │ /match/1 ... /match/104 → 104 static pages
              ▼
         Served from CDN (~30ms globally)
         No database hit. No server compute.
         Page is pure HTML+CSS+JS bundle.
```

### Request Flow — Fan Gallery (ISR)

```
Browser → Vercel Edge
              │
              │ Page older than 60 seconds?
              ├── No → Serve cached version (~30ms)
              └── Yes → Background revalidate
                        ├── Call Supabase API
                        │   SELECT * FROM fan_posts WHERE status='approved'
                        ├── Re-render page with new data
                        └── Update CDN cache
                        User gets stale version instantly,
                        next user gets fresh version.
```

### Fan Content Upload Flow

```
You (Admin)
    │
    ▼
Supabase Dashboard → Upload image file
    │                  to Storage bucket
    │
    ▼
Storage returns public URL
    │
    ▼
Insert row in fan_posts:
{ image_url: url, status: 'approved', title: '...' }
    │
    ▼
Site revalidates on next ISR cycle (60 seconds)
Fan art appears on gallery — zero code touched.
```

---

## 8. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Vercel free tier bandwidth exceeded | Low | Medium | Site stays up, just slower. Upgrade to Pro ($20/mo) |
| Supabase free tier storage full | Low | Low | Compress images before upload. 1GB = ~2,000 fan images |
| FIFA schedule changes | Medium | Low | Update `/data/matches.json` and redeploy (2 min) |
| Sports API rate limit hit | Medium | Low | Phase 3 only. Cache API responses in Supabase |
| Viral traffic spike | Low | Low | Vercel auto-scales. CDN absorbs most traffic |
| Next.js breaking update | Low | Medium | Pin to Next.js 14.x. Major updates are deliberate choices |
| Supabase RLS misconfiguration | Medium | High | Admin routes protected by secret header. Tested before launch |
| Image copyright issues (fan art) | Medium | High | Submission form includes "I own rights to this content" checkbox |

---

## Summary Table

```
DECISION MATRIX — FIFA 2026 WEBSITE

Layer           Chosen          Runner-Up       Why Chosen Won
─────────────────────────────────────────────────────────────────
Frontend        Next.js 14      Astro           Full-stack + React ecosystem
Styling         Tailwind CSS    Sass/SCSS       Speed + dark mode built-in
Animations      Framer Motion   GSAP            React-native + simpler API
Backend         Next.js Routes  Hono            Zero extra config or cost
Database        Supabase        Firebase        SQL + open source + no lock-in
Storage         Supabase        Cloudinary      Single vendor Phase 1
Auth            Supabase Auth   Clerk           Already using Supabase
Hosting         Vercel          Cloudflare Pg.  Native Next.js support
CMS             Supabase UI     Sanity          Zero setup needed Phase 1
Data Source     Static JSON     API-Football    No rate limits, always available
─────────────────────────────────────────────────────────────────
TOTAL PHASE 1 COST:  $0/month
TOTAL SERVICES:      2 (Vercel + Supabase) — intentionally minimal
```

---

*This document should be reviewed and updated at each phase transition.*  
*Architecture decisions are reversible — this stack avoids vendor lock-in by design.*
