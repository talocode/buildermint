import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRuntimeStatus } from "@/lib/runtime-status";

function StatusBadge({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <Badge className={enabled ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>
      {label}: {enabled ? "yes" : "no"}
    </Badge>
  );
}

export default function SettingsPage() {
  const status = getRuntimeStatus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
        <p className="mt-2 text-slate-400">Runtime configuration for BuilderMint providers and persistence.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <StatusBadge enabled={status.supabase.configured} label="Supabase configured" />
        <StatusBadge enabled={status.database.configured} label="Database configured" />
        <StatusBadge enabled={status.ai.provider === "xai"} label="Live xAI active" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supabase Auth</CardTitle>
          <CardDescription>
            {status.supabase.configured
              ? "Supabase auth is active. Dashboard and API routes require a signed-in user."
              : "Supabase is not configured. Development auth fallback is active."}
          </CardDescription>
        </CardHeader>
        <p className="text-sm text-slate-300">
          Dev fallback: {status.supabase.devFallback ? "enabled" : "disabled"}
        </p>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database</CardTitle>
          <CardDescription>
            Mode: {status.database.mode}
            {status.database.configured ? " (DATABASE_URL set)" : " (in-memory dev store)"}
          </CardDescription>
        </CardHeader>
        <p className="text-sm text-slate-300">
          Run <code className="text-emerald-300">npm run db:push</code> after setting <code className="text-emerald-300">DATABASE_URL</code>.
        </p>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI provider</CardTitle>
          <CardDescription>
            Active provider: {status.ai.provider}
            {status.ai.model ? ` · model: ${status.ai.model}` : ""}
          </CardDescription>
        </CardHeader>
        <p className="text-sm text-slate-300">
          Set <code className="text-emerald-300">AI_PROVIDER=xai</code> and <code className="text-emerald-300">XAI_API_KEY</code> for live Grok generation.
          Mock fallback preserved: {status.ai.fallbackAvailable ? "yes" : "no"}.
        </p>
      </Card>
    </div>
  );
}