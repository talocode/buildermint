import { describe, expect, it } from "vitest";

import { scoreOpportunity } from "./scoring";

describe("scoreOpportunity", () => {
  it("returns bounded scores and an overall value", () => {
    const scores = scoreOpportunity(
      {
        skills: ["Next.js", "Supabase"],
        domainExperience: ["B2B SaaS"],
        tools: ["TypeScript"],
        audiences: ["indie builders"],
        preferredProductTypes: ["workflow tools"],
        monetizationPreference: "subscription",
      },
      {
        title: "Builder workflow tracker",
        targetAudience: "indie builders",
        painfulProblem: "Builders lose context between research and launch.",
        demandSignal: "Forum posts about fragmented builder workflows.",
        proposedMicroSaas: "A workspace for validated micro-SaaS opportunities.",
        whyThisFitsUser: "Matches your Next.js and B2B SaaS background.",
        pricingIdea: "$19/mo",
        difficultyScore: 40,
        confidenceScore: 72,
        mvpScope: "Profile, opportunities, plans",
        assumptions: ["Builders want validation"],
        validationSteps: ["Interview 5 builders"],
      },
    );

    expect(scores.overall).toBeGreaterThan(0);
    expect(scores.overall).toBeLessThanOrEqual(100);
    expect(scores.skillFit).toBeLessThanOrEqual(100);
  });
});