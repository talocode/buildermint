import { getAIProvider } from "@/lib/ai/provider";
import { isSupabaseConfigured, shouldUseDevAuthFallback } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";

export type RuntimeStatus = {
  supabase: {
    configured: boolean;
    devFallback: boolean;
  };
  database: {
    configured: boolean;
    mode: "postgres" | "memory";
  };
  ai: {
    provider: "mock" | "xai";
    model: string | null;
    fallbackAvailable: boolean;
  };
};

export function getRuntimeStatus(): RuntimeStatus {
  const provider = getAIProvider();
  const usingXai = provider.name === "xai";

  return {
    supabase: {
      configured: isSupabaseConfigured(),
      devFallback: shouldUseDevAuthFallback(),
    },
    database: {
      configured: isDatabaseConfigured(),
      mode: isDatabaseConfigured() ? "postgres" : "memory",
    },
    ai: {
      provider: usingXai ? "xai" : "mock",
      model: usingXai ? process.env.XAI_MODEL ?? "grok-2-1212" : null,
      fallbackAvailable: true,
    },
  };
}

export function selectAIProviderName(): "mock" | "xai" {
  const provider = process.env.AI_PROVIDER ?? "xai";
  const hasXaiKey = Boolean(process.env.XAI_API_KEY);
  return provider === "xai" && hasXaiKey ? "xai" : "mock";
}