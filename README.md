# BuilderMint

BuilderMint helps builders turn their skills into validated micro-SaaS ideas, MVP plans, and launch assets.

Positioning: **turn your skills into validated software opportunities** — not get-rich-quick hype.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Supabase Auth + Postgres
- Drizzle ORM
- Vercel AI SDK with xAI/Grok provider first
- Provider abstraction with mock fallback for local development

## MVP flow

1. Land on homepage
2. Sign in (or use dev fallback)
3. Create a skill profile
4. Generate opportunity ideas
5. Open an opportunity
6. Generate MVP build plan
7. Generate launch plan
8. Review saved ideas and plans in the dashboard

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Live Supabase + xAI setup

See [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) for step-by-step instructions to enable:

- real Supabase Auth (magic links)
- Postgres persistence via Drizzle (`npm run db:push`)
- live xAI/Grok generation

Mock/dev fallback remains when env vars are missing.

### Environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | For production auth | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For production auth | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Never expose to client |
| `DATABASE_URL` | For persistent Postgres | Falls back to in-memory store in dev |
| `XAI_API_KEY` | For live AI | Uses mock provider when missing |
| `AI_PROVIDER` | Optional | Defaults to `xai` |

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run db:generate
npm run db:push
```

## Architecture

- UI pages under `src/app`
- API routes under `src/app/api`
- Domain services under `src/lib/buildermint`
- Prompt templates under `src/lib/prompts`
- AI providers under `src/lib/ai`

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Talocode

BuilderMint is part of the Talocode product family.