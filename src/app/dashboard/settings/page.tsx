import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAIProvider } from "@/lib/ai/provider";
import { isDatabaseConfigured } from "@/lib/db";
import { isSupabaseConfigured } from "@/lib/auth";

export default function SettingsPage() {
  const provider = getAIProvider();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
        <p className="mt-2 text-slate-400">Environment and provider configuration for BuilderMint.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI provider</CardTitle>
          <CardDescription>Active provider: {provider.name}</CardDescription>
        </CardHeader>
        <p className="text-sm text-slate-300">
          Set <code className="text-emerald-300">AI_PROVIDER=xai</code> and <code className="text-emerald-300">XAI_API_KEY</code> for live generation. Without a key, development uses the mock provider.
        </p>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supabase</CardTitle>
          <CardDescription>{isSupabaseConfigured() ? "Configured" : "Not configured — dev auth fallback active"}</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database</CardTitle>
          <CardDescription>{isDatabaseConfigured() ? "DATABASE_URL configured" : "Using in-memory dev store"}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}