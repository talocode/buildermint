# BuilderMint Architecture

## Layers

```
UI (src/app, src/components)
  → API routes (src/app/api)
    → Domain services (src/lib/buildermint)
      → AI provider abstraction (src/lib/ai)
      → Drizzle schema / Postgres or dev memory store
```

## Gateway rules

- UI must never call model providers directly
- API routes authenticate, validate input, call domain services, return clean JSON
- Provider errors must not be exposed raw to the client
- `SUPABASE_SERVICE_ROLE_KEY` is server-only
- Only public Supabase URL/anon key may use `NEXT_PUBLIC_*`

## AI provider abstraction

- `lib/ai/provider.ts` — interface + factory
- `lib/ai/xai-provider.ts` — xAI/Grok via Vercel AI SDK
- `lib/ai/mock-provider.ts` — deterministic dev output when `XAI_API_KEY` is missing

Prompt templates live in `lib/prompts/`.

## Database schema

Drizzle tables:

- `skill_profiles`
- `opportunities`
- `build_plans`
- `launch_plans`
- `saved_research_signals`

When `DATABASE_URL` is missing, development uses an in-memory store with the same service API.

## API routes

- `POST /api/profile`
- `GET /api/profile`
- `POST /api/opportunities/generate`
- `GET /api/opportunities`
- `GET /api/opportunities/[id]`
- `POST /api/opportunities/[id]/build-plan`
- `POST /api/opportunities/[id]/launch-plan`
- `GET /api/plans/[id]`

## Must-never rules

- Do not depend on chat history as durable product memory
- Do not inject all generated content blindly into UI without structure
- Do not store secrets in client-visible env vars
- Do not promise guaranteed revenue
- Do not expose provider stack traces to users
- Every generated idea must include assumptions and validation steps
- Every generated plan must include uncertainty and what to test first