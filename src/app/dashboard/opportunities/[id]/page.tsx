import { notFound } from "next/navigation";

import { OpportunityActions } from "@/components/opportunity-actions";
import { OpportunityScore } from "@/components/opportunity-score";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { opportunityService } from "@/lib/buildermint/opportunity-service";
import { profileService } from "@/lib/buildermint/profile-service";
import { scoreOpportunity } from "@/lib/buildermint/scoring";
import { getCurrentUser } from "@/lib/auth";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { id } = await params;
  const opportunity = await opportunityService.getById(user.id, id);
  if (!opportunity) notFound();

  const profile = await profileService.getByUserId(user.id);
  const scores = profile
    ? scoreOpportunity(
        {
          skills: profile.skills,
          domainExperience: profile.domainExperience,
          tools: profile.tools,
          audiences: profile.audiences,
          preferredProductTypes: profile.preferredProductTypes,
          weeklyTimeBudget: profile.weeklyTimeBudget,
          moneyBudget: profile.moneyBudget,
          monetizationPreference: profile.monetizationPreference,
        },
        {
          title: opportunity.title,
          targetAudience: opportunity.targetAudience,
          painfulProblem: opportunity.painfulProblem,
          demandSignal: opportunity.demandSignal,
          proposedMicroSaas: opportunity.proposedMicroSaas,
          whyThisFitsUser: opportunity.whyThisFitsUser,
          pricingIdea: opportunity.pricingIdea,
          difficultyScore: opportunity.difficultyScore,
          confidenceScore: opportunity.confidenceScore,
          mvpScope: opportunity.mvpScope,
          assumptions: opportunity.assumptions,
          validationSteps: opportunity.validationSteps,
        },
      )
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">{opportunity.title}</h1>
        <p className="mt-2 text-slate-400">{opportunity.proposedMicroSaas}</p>
      </div>

      {scores ? <OpportunityScore scores={scores} /> : null}

      <OpportunityActions opportunityId={opportunity.id} />

      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard title="Target audience" body={opportunity.targetAudience} />
        <InfoCard title="Painful problem" body={opportunity.painfulProblem} />
        <InfoCard title="Demand signal" body={opportunity.demandSignal} />
        <InfoCard title="Why this fits you" body={opportunity.whyThisFitsUser} />
        <InfoCard title="Pricing idea" body={opportunity.pricingIdea} />
        <InfoCard title="MVP scope" body={opportunity.mvpScope} />
      </div>

      <ListCard title="Assumptions" items={opportunity.assumptions} />
      <ListCard title="Validation steps" items={opportunity.validationSteps} />
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{body}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}