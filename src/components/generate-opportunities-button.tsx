"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoadingButton } from "@/components/loading-button";

export function GenerateOpportunitiesButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/opportunities/generate", { method: "POST" });
    const payload = await response.json();
    setLoading(false);

    if (!payload.ok) {
      setMessage(payload.error ?? "Failed to generate opportunities.");
      return;
    }

    router.refresh();
    setMessage(`Generated ${payload.data.opportunities.length} opportunities.`);
  }

  return (
    <div className="flex items-center gap-3">
      <LoadingButton onClick={onClick} loading={loading}>
        Generate opportunities
      </LoadingButton>
      {message ? <p className="text-sm text-slate-400">{message}</p> : null}
    </div>
  );
}