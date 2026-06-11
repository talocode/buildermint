import type { OpportunityIdea, SkillProfileInput } from "@/lib/ai/provider";

export type OpportunityScoreBreakdown = {
  skillFit: number;
  audienceFit: number;
  painIntensity: number;
  willingnessToPay: number;
  buildDifficulty: number;
  distributionDifficulty: number;
  confidence: number;
  overall: number;
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function scoreOpportunity(
  profile: SkillProfileInput,
  idea: OpportunityIdea,
): OpportunityScoreBreakdown {
  const skillOverlap = profile.skills.filter((skill) =>
    `${idea.title} ${idea.whyThisFitsUser} ${idea.proposedMicroSaas}`
      .toLowerCase()
      .includes(skill.toLowerCase()),
  ).length;

  const audienceOverlap = profile.audiences.filter((audience) =>
    idea.targetAudience.toLowerCase().includes(audience.toLowerCase()),
  ).length;

  const skillFit = clamp(45 + skillOverlap * 12);
  const audienceFit = clamp(40 + audienceOverlap * 15);
  const painIntensity = clamp(
    50 +
      (idea.painfulProblem.length > 80 ? 15 : 5) +
      (idea.demandSignal.length > 60 ? 10 : 0),
  );
  const willingnessToPay = clamp(
    35 +
      (idea.pricingIdea.includes("$") ? 20 : 0) +
      (profile.monetizationPreference ? 10 : 0),
  );
  const buildDifficulty = clamp(idea.difficultyScore);
  const distributionDifficulty = clamp(
    100 - idea.confidenceScore + (idea.targetAudience.length > 30 ? 10 : 0),
  );
  const confidence = clamp(idea.confidenceScore);

  const overall = clamp(
    skillFit * 0.2 +
      audienceFit * 0.15 +
      painIntensity * 0.15 +
      willingnessToPay * 0.1 +
      (100 - buildDifficulty) * 0.15 +
      (100 - distributionDifficulty) * 0.1 +
      confidence * 0.15,
  );

  return {
    skillFit,
    audienceFit,
    painIntensity,
    willingnessToPay,
    buildDifficulty,
    distributionDifficulty,
    confidence,
    overall,
  };
}