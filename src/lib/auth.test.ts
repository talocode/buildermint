import { afterEach, describe, expect, it, vi } from "vitest";

import { isSupabaseConfigured, shouldUseDevAuthFallback } from "./auth";

describe("auth policy", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("enables dev fallback only without Supabase in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");

    expect(isSupabaseConfigured()).toBe(false);
    expect(shouldUseDevAuthFallback()).toBe(true);
  });

  it("disables dev fallback when Supabase env exists", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-key");

    expect(isSupabaseConfigured()).toBe(true);
    expect(shouldUseDevAuthFallback()).toBe(false);
  });
});