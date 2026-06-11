import { notFound } from "next/navigation";

import { BuildPlanView } from "@/components/build-plan-view";
import { LaunchPlanView } from "@/components/launch-plan-view";
import { buildPlanService } from "@/lib/buildermint/build-plan-service";
import { launchPlanService } from "@/lib/buildermint/launch-plan-service";
import { getCurrentUser } from "@/lib/auth";

export default async function PlanPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { id } = await params;
  const { type } = await searchParams;

  if (type === "launch") {
    const plan = await launchPlanService.getById(user.id, id);
    if (!plan) notFound();
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-white">Launch plan</h1>
        <LaunchPlanView plan={plan} />
      </div>
    );
  }

  const plan = await buildPlanService.getById(user.id, id);
  if (!plan) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">MVP build plan</h1>
      <BuildPlanView plan={plan} />
    </div>
  );
}