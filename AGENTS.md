# AGENTS.md — DevJob

Drop-in operating instructions for this repo. Read this file before every task.

**Working code only. Finish the job. Plausibility is not correctness.**

---

## 0. Non-negotiables

These rules override everything else when in conflict:

1. **No flattery, no filler.** Skip openers like "Great question", "Excellent idea". Start with the answer or the action.
2. **Disagree when you disagree.** If the premise is wrong, say so before doing the work.
3. **Never fabricate.** Not file paths, not API names, not test results. If you don't know, read the file, run the command, or say so.
4. **Stop when confused.** Two plausible interpretations → ask. Do not pick silently.
5. **Touch only what you must.** Every changed line must trace directly to the request. No drive-by cleanups.

---

## 1. Before writing code

- State your plan in one or two sentences before editing. For anything non-trivial, produce a numbered list of steps with a verification check for each.
- Read the files you will touch. Read the files that call the files you will touch.
- Read `DESIGN.md` before touching any UI component, page, or style. It is the source of truth for visual decisions.
- Match existing patterns in the codebase. If the project uses pattern X, use pattern X.
- Surface assumptions out loud. Do not bury them in the implementation.

---

## 2. Writing code: simplicity first

- No features beyond what was asked.
- No abstractions for single-use code. No hooks, configurability, or flexibility that were not requested.
- If the solution runs 200 lines and could be 50, rewrite it before showing it.
- Bias toward deleting code over adding code.

The test: would a senior engineer call this overcomplicated? If yes, simplify.

---

## 3. Surgical changes

- Do not refactor adjacent code that works.
- Do not delete pre-existing dead code unless asked. If you notice it, mention it in the summary.
- Do clean up orphans your own changes create (unused imports, variables, functions).
- Match project style exactly: indentation, quotes, naming, file layout.

---

## 4. Code standards

- **Never typecast. Never use `as`.** If TypeScript can't infer the type, fix the type definition — don't paper over it with a cast.
- All async functions must handle errors explicitly. No unhandled promise rejections.
- No `any`. If you find yourself typing `any`, stop and fix the types properly.
- API responses must be validated against a Zod schema at the boundary. Do not trust raw JSON anywhere past the service layer.
- Env variables are accessed only through `src/config/env.ts`. Never read `process.env` directly in features.

---

## 5. Goal-driven execution

Rewrite vague asks into verifiable goals before starting:

- "Add validation" → "Write tests for invalid inputs, then make them pass."
- "Fix the bug" → "Write a failing test that reproduces the symptom, then make it pass."
- "Refactor X" → "Ensure the existing test suite passes before and after, no public API changes."

For every task: state success criteria → write verification → run it → read the output → report honestly.

---

## 6. Tool use and verification

- Run the code. If a test suite exists, run it. If a linter exists, run it.
- Never report "done" based on a plausible-looking diff alone.
- For UI changes, verify visually: screenshot before, screenshot after, describe what changed.
- When debugging, fix root causes, not symptoms. Suppressing the error is not fixing it.

---

## 7. Communication style

- Direct, not diplomatic. "This won't scale because X" beats "have you considered X".
- Concise by default. Two or three short paragraphs unless depth is requested.
- When a question has a clear answer, give it.

---

## 8. When to ask, when to proceed

**Ask before proceeding when:**
- The request has two plausible interpretations and the choice materially affects output.
- The change touches auth, payments, database migrations, or anything versioned.
- The user's stated goal and the literal request appear to conflict.

**Proceed without asking when:**
- The task is trivial and reversible.
- The ambiguity resolves by reading the code.

---

## 9. Project context

### Stack

- **Language:** TypeScript 5.x (strict mode, no `any`, no `as`)
- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend:** Node.js + Express, Prisma ORM
- **Database:** PostgreSQL
- **Auth:** JWT (access + refresh tokens), stored in httpOnly cookies
- **Email:** Nodemailer / Resend
- **Testing:** Vitest (unit), Playwright (e2e)
- **Package manager:** pnpm

### Commands

```bash
pnpm install          # install deps
pnpm dev              # run frontend + backend concurrently
pnpm build            # production build
pnpm test             # run all unit tests
pnpm test src/...     # run single test file
pnpm test:e2e         # run Playwright suite
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm db:migrate       # apply pending Prisma migrations
pnpm db:seed          # seed development database
```

Prefer single-file test runs during iteration. Full suite for final verification only.

### Repository layout

```
devjob/
├── apps/
│   ├── web/                        # Next.js frontend
│   │   ├── app/                    # App Router pages and layouts
│   │   │   ├── (auth)/             # Login, register — unauthenticated routes
│   │   │   ├── (seeker)/           # Seeker-facing pages
│   │   │   │   ├── jobs/           # Catalog + job detail
│   │   │   │   └── profile/        # Seeker profile and applications
│   │   │   ├── (employer)/         # Employer-facing pages
│   │   │   │   ├── dashboard/      # Analytics and overview
│   │   │   │   └── vacancies/      # CRUD for job postings
│   │   │   └── company/[slug]/     # Public company pages
│   │   ├── components/
│   │   │   ├── ui/                 # Primitive components (Button, Input, Badge…)
│   │   │   ├── jobs/               # Job-domain components (JobCard, FilterPanel…)
│   │   │   ├── employer/           # Employer-domain components
│   │   │   └── shared/             # Layout, Nav, Footer, etc.
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # API client, utils, formatters
│   │   └── types/                  # Frontend-only TypeScript types
│   │
│   └── api/                        # Express backend
│       ├── src/
│       │   ├── config/
│       │   │   └── env.ts          # Single env access point — nowhere else reads process.env
│       │   ├── modules/            # Feature modules (jobs, auth, companies, applications)
│       │   │   └── jobs/
│       │   │       ├── jobs.router.ts
│       │   │       ├── jobs.service.ts
│       │   │       ├── jobs.schema.ts   # Zod schemas — validate at the boundary
│       │   │       └── jobs.test.ts
│       │   ├── middleware/         # Auth, error handler, rate limiter
│       │   ├── prisma/
│       │   │   ├── schema.prisma
│       │   │   └── seed.ts
│       │   └── server.ts
│       └── package.json
│
├── packages/
│   └── shared/                     # Types and Zod schemas shared between apps
│       ├── src/
│       │   ├── schemas/            # Canonical Zod schemas (Job, User, Application…)
│       │   └── types/              # Inferred TypeScript types from schemas
│       └── package.json
│
├── AGENTS.md                       # This file
├── DESIGN.md                       # Visual and UX source of truth — read before touching UI
├── .env.example
└── pnpm-workspace.yaml
```

### Do not modify

- `apps/api/src/prisma/migrations/` — generated by Prisma, never hand-edit
- `packages/shared/src/types/` — generated from Zod schemas via `pnpm generate:types`, never hand-edit
- `apps/web/.next/` — build output

### Conventions

- **Naming:** `kebab-case` for files and folders, `PascalCase` for components and classes, `camelCase` for everything else.
- **Imports:** Absolute imports using `@/` alias inside each app. Cross-app imports only through `packages/shared`.
- **API schemas:** Defined in `packages/shared/src/schemas/`. Both apps import from there. A schema must exist before a feature is wired up.
- **Error handling:** Backend throws typed `AppError` instances (see `middleware/error.ts`). Frontend catches errors from the API client, never from raw `fetch`.
- **Auth guards:** Route protection lives in Next.js middleware (`apps/web/middleware.ts`). Do not add auth checks inside individual page components.
- **Roles:** Two roles — `SEEKER` and `EMPLOYER`. Checked server-side in every protected API route via the auth middleware. Never trust role data from the frontend.

### Forbidden

- `as SomeType` — fix the types instead.
- `any` — add proper types or use `unknown` and narrow.
- Reading `process.env` outside `apps/api/src/config/env.ts`.
- Direct Prisma calls from route handlers — all DB access goes through the service layer.
- Committing with `TODO` or `FIXME` without a linked issue number.
- Mutations in GET handlers.

---

## 10. DESIGN.md — how to use it

`DESIGN.md` lives at the repo root and is the single source of truth for all visual and UX decisions.

**Read it before you:**
- Create or modify any component in `components/`
- Add or change a page layout
- Pick a color, font size, spacing value, or animation
- Add a new UI pattern (modal, drawer, toast, skeleton…)

**What it contains:**
- Color tokens and their semantic meaning
- Typography scale
- Spacing and layout grid rules
- Component-level design decisions (which variants exist, when to use each)
- Motion and animation guidelines
- Responsive breakpoint conventions

**Rules:**
- If the design decision is in `DESIGN.md`, follow it. Do not improvise.
- If you need something not covered in `DESIGN.md`, add it there first, then implement it. Do not implement undocumented design patterns.
- If you disagree with a decision in `DESIGN.md`, say so in the PR description. Do not silently deviate.
