import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Opportunity } from "@/lib/db/schema";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{opportunity.title}</CardTitle>
          <Badge>Confidence {opportunity.confidenceScore}</Badge>
        </div>
        <CardDescription>{opportunity.proposedMicroSaas}</CardDescription>
      </CardHeader>
      <p className="mb-4 text-sm text-slate-300">{opportunity.painfulProblem}</p>
      <Link href={`/dashboard/opportunities/${opportunity.id}`} className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
        View opportunity →
      </Link>
    </Card>
  );
}