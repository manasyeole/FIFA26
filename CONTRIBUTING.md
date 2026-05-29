# Contributing to FIFA 2026 Fan Hub

Thank you for your interest in contributing. This document covers the development workflow,
code standards, and contribution process.

---

## Development Setup

```bash
git clone https://github.com/manasyeole/FIFA26.git
cd FIFA26/web
npm install
cp .env.example .env.local
npm run dev
```

---

## Workflow

### Branch Naming

```
feature/short-description       # New features
fix/short-description           # Bug fixes
docs/short-description          # Documentation
chore/short-description         # Maintenance (deps, config)
refactor/short-description      # Code refactoring
```

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

```
feat: add match detail page
fix: countdown timer hydration mismatch
docs: update env variable documentation
chore: upgrade framer-motion to v12
refactor: extract useCountdown hook
style: format schedule page with prettier
test: add unit tests for utils
```

**Rules:**
- Type must be one of: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `revert`
- Subject must be lowercase
- Subject max 100 characters
- No period at end of subject

### Pull Request Process

1. Branch off from `main`
2. Make focused, atomic commits
3. Run `npm run validate` before pushing — must pass
4. Fill in the PR template completely
5. Link related issues with `Closes #123`
6. Request review from a maintainer

---

## Code Standards

### TypeScript

- `strict: true` is enforced — no `any`
- Use `type` imports: `import type { Match } from "@/types"`
- All exported functions and interfaces must have clear names (no abbreviations)

### File Organization

| What | Where |
|---|---|
| Page files | `src/app/` |
| Shared types | `src/types/index.ts` |
| Pure utilities | `src/lib/utils.ts` |
| Custom hooks | `src/hooks/` |
| App constants | `src/constants/` |
| Static data | `src/data/` |
| Reusable UI | `src/components/ui/` |
| Feature components | `src/components/features/<feature-name>/` |

### Imports

Use path aliases — never relative paths that go up more than one level:

```ts
// Good
import type { Match } from "@/types";
import { ROUTES } from "@/constants/routes";
import { formatMatchDate } from "@/lib/utils";

// Bad
import type { Match } from "../../types";
```

### Client vs Server Components

- Default to Server Components (no `"use client"`)
- Only add `"use client"` when a component needs: `useState`, `useEffect`, event handlers, or browser-only APIs
- Keep `"use client"` components as small/leaf as possible

### Styling

- Use Tailwind utility classes for layout and spacing
- Use `style` prop for dynamic values (colors, shadows based on data)
- Define reusable effects in `globals.css` as named classes (`.btn-neon`, `.neon-badge`)
- Never use `!important`

---

## Running Checks

```bash
# All checks at once (run before pushing)
npm run validate

# Individual checks
npm run type-check     # TypeScript
npm run lint           # ESLint
npm run format:check   # Prettier
```

---

## Project Phases

This project is built in phases. Work should be scoped to the current phase
unless discussed in an issue first:

- **Phase 1** (current): Schedule, Gallery, core UI — ✅ complete
- **Phase 2**: Admin dashboard, Supabase integration, fan submissions
- **Phase 3**: User accounts, live scores, bracket predictions

---

## Questions?

Open an issue with the `question` label.
