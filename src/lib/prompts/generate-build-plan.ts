import type { OpportunityIdea, SkillProfileInput } from "@/lib/ai/provider";

export function buildPlanPrompt(profile: SkillProfileInput, opportunity: OpportunityIdea) {
  return `Create an MVP build plan for this validated micro-SaaS opportunity.

Rules:
- Include uncertainty notes and what to test first.
- Do not assume unlimited budget or team size.
- Keep the plan practical for a solo builder.
- No guaranteed revenue language.

Builder profile:
${JSON.stringify(profile, null, 2)}

Opportunity:
${JSON.stringify(opportunity, null, 2)}

Return JSON with:
featureList, techStack, dataModel, apiRoutes, uiPages, implementationPrompts, validationChecklist, uncertaintyNotes, testFirst.`;
}