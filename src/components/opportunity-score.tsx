import { Badge } from "@/components/ui/badge";
import type { OpportunityScoreBreakdown } from "@/lib/buildermint/scoring";

export function OpportunityScore({ scores }: { scores: OpportunityScoreBreakdown }) {
  const items = [
    ["Overall", scores.overall],
    ["Skill fit", scores.skillFit],
    ["Audience fit", scores.audienceFit],
    ["Pain intensity", scores.painIntensity],
    ["Willingness to pay", scores.willingnessToPay],
    ["Build difficulty", scores.buildDifficulty],
    ["Distribution", scores.distributionDifficulty],
    ["Confidence", scores.confidence],
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(([label, value]) => (
        <Badge key={label} className={label === "Overall" ? "border-emerald-500/40 text-emerald-300" : undefined}>
          {label}: {value}
        </Badge>
      ))}
    </div>
  );
}