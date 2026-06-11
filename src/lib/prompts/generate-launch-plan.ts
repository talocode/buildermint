import type { OpportunityIdea, SkillProfileInput } from "@/lib/ai/provider";

export function launchPlanPrompt(profile: SkillProfileInput, opportunity: OpportunityIdea) {
  return `Create a launch plan for this micro-SaaS opportunity.

Rules:
- Focus on validation and learning, not hype.
- Include uncertainty notes and what to test first.
- No guaranteed revenue promises.
- Provide editable drafts, not auto-posting instructions.

Builder profile:
${JSON.stringify(profile, null, 2)}

Opportunity:
${JSON.stringify(opportunity, null, 2)}

Return JSON with:
landingPageCopy (headline, subheadline, cta, proof), xLaunchPost, customerOutreachMessages, waitlistCta, pricingTest, successMetrics, uncertaintyNotes, testFirst.`;
}