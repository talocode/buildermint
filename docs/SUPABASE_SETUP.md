# Supabase + xAI Setup Guide

This guide wires BuilderMint from mock/dev mode to live Supabase persistence and xAI/Grok generation.

## 1. Create a Supabase project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Wait for the database to finish provisioning

## 2. Copy environment variables

From **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL` → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon public key
- `SUPABASE_SERVICE_ROLE_KEY` → service role key (server only, never expose to client)

From **Project Settings → Database → Connection string** (URI):

- `DATABASE_URL` → Postgres connection string (use the pooled or direct URI for Drizzle)

Create `.env.local` from the template:

```bash
cp .env.example .env.local
```

Fill in all values. **Do not commit `.env.local`.**

## 3. Configure xAI

Set:

```env
AI_PROVIDER=xai
XAI_API_KEY=your_xai_api_key
XAI_MODEL=grok-2-1212
```

Without `XAI_API_KEY`, BuilderMint keeps the mock provider fallback.

## 4. Push database schema

```bash
npm run db:push
```

Confirm these tables exist in Supabase:

- `skill_profiles`
- `opportunities`
- `build_plans`
- `launch_plans`
- `saved_research_signals`

## 5. Configure Supabase Auth redirect URLs

In **Authentication → URL Configuration**, add:

- Site URL: `http://localhost:3000` (or your production URL)
- Redirect URLs:
  - `http://localhost:3000/auth/callback`
  - your production callback URL

## 6. Run the app

```bash
npm run dev
```

## 7. Verify live mode

1. Open `/login` and request a magic link
2. Complete sign-in via email
3. Open `/dashboard/settings`
4. Confirm:
   - Supabase configured: **yes**
   - Database configured: **yes**
   - AI provider: **xai** (when `XAI_API_KEY` is set)

## Behavior changes in live mode

| Feature | Mock/dev | Live |
|---------|----------|------|
| Auth | Dev user fallback | Supabase session required |
| Database | In-memory store | Postgres via Drizzle |
| AI | Mock provider | xAI/Grok when key is set |
| Dashboard | Open without login | Redirects to `/login` |
| API routes | Dev user when unauthenticated | 401 Unauthorized |

## Security rules

- `SUPABASE_SERVICE_ROLE_KEY` is server-only
- Never use `NEXT_PUBLIC_*` for secrets
- API routes return sanitized errors (no raw provider stack traces)
- Mock provider fallback remains when `XAI_API_KEY` is missing