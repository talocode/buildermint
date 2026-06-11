"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoadingButton } from "@/components/loading-button";

export function OpportunityActions({ opportunityId }: { opportunityId: string }) {
  const router = useRouter();
  const [buildLoading, setBuildLoading] = useState(false);
  const [launchLoading, setLaunchLoading] = useState(false);
  const [buildPlanId, setBuildPlanId] = useState<string | null>(null);
  const [launchPlanId, setLaunchPlanId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function generateBuildPlan() {
    setBuildLoading(true);
    setMessage(null);
    const response = await fetch(`/api/opportunities/${opportunityId}/build-plan`, { method: "POST" });
    const payload = await response.json();
    setBuildLoading(false);
    if (!payload.ok) {
      setMessage(payload.error ?? "Failed to generate build plan.");
      return;
    }
    setBuildPlanId(payload.data.plan.id);
    router.refresh();
  }

  async function generateLaunchPlan() {
    setLaunchLoading(true);
    setMessage(null);
    const response = await fetch(`/api/opportunities/${opportunityId}/launch-plan`, { method: "POST" });
    const payload = await response.json();
    setLaunchLoading(false);
    if (!payload.ok) {
      setMessage(payload.error ?? "Failed to generate launch plan.");
      return;
    }
    setLaunchPlanId(payload.data.plan.id);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <LoadingButton onClick={generateBuildPlan} loading={buildLoading}>
        Generate MVP build plan
      </LoadingButton>
      <LoadingButton onClick={generateLaunchPlan} loading={launchLoading} variant="secondary">
        Generate launch plan
      </LoadingButton>
      {buildPlanId ? (
        <Link href={`/dashboard/plans/${buildPlanId}`} className="text-sm text-emerald-400">
          View build plan →
        </Link>
      ) : null}
      {launchPlanId ? (
        <Link href={`/dashboard/plans/${launchPlanId}?type=launch`} className="text-sm text-emerald-400">
          View launch plan →
        </Link>
      ) : null}
      {message ? <p className="w-full text-sm text-slate-400">{message}</p> : null}
    </div>
  );
}