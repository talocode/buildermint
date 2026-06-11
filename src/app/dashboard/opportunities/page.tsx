import { EmptyState } from "@/components/empty-state";
import { GenerateOpportunitiesButton } from "@/components/generate-opportunities-button";
import { OpportunityCard } from "@/components/opportunity-card";
import { Button } from "@/components/ui/button";
import { opportunityService } from "@/lib/buildermint/opportunity-service";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function OpportunitiesPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const opportunities = await opportunityService.list(user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">Opportunities</h1>
          <p className="mt-2 text-slate-400">
            Validated micro-SaaS ideas with demand signals, assumptions, and validation steps.
          </p>
        </div>
        <GenerateOpportunitiesButton />
      </div>

      {opportunities.length === 0 ? (
        <EmptyState
          title="No opportunities yet"
          description="Save your skill profile first, then generate five validated ideas."
          action={
            <Button asChild>
              <Link href="/dashboard/profile">Go to profile</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </div>
  );
}