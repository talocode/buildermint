export type OpportunityIdea = {
  title: string;
  targetAudience: string;
  painfulProblem: string;
  demandSignal: string;
  proposedMicroSaas: string;
  whyThisFitsUser: string;
  pricingIdea: string;
  difficultyScore: number;
  confidenceScore: number;
  mvpScope: string;
  assumptions: string[];
  validationSteps: string[];
};

export type BuildPlanOutput = {
  featureList: string[];
  techStack: Record<string, string>;
  dataModel: Record<string, unknown>[];
  apiRoutes: string[];
  uiPages: string[];
  implementationPrompts: string[];
  validationChecklist: string[];
  uncertaintyNotes: string[];
  testFirst: string[];
};

export type LaunchPlanOutput = {
  landingPageCopy: Record<string, string>;
  xLaunchPost: string;
  customerOutreachMessages: string[];
  waitlistCta: string;
  pricingTest: string;
  successMetrics: string[];
  uncertaintyNotes: string[];
  testFirst: string[];
};

export type SkillProfileInput = {
  skills: string[];
  domainExperience: string[];
  tools: string[];
  audiences: string[];
  preferredProductTypes: string[];
  weeklyTimeBudget?: number | null;
  moneyBudget?: number | null;
  monetizationPreference?: string | null;
};

export interface AIProvider {
  readonly name: string;
  generateOpportunities(profile: SkillProfileInput): Promise<OpportunityIdea[]>;
  generateBuildPlan(
    profile: SkillProfileInput,
    opportunity: OpportunityIdea,
  ): Promise<BuildPlanOutput>;
  generateLaunchPlan(
    profile: SkillProfileInput,
    opportunity: OpportunityIdea,
  ): Promise<LaunchPlanOutput>;
}

import { MockProvider } from "./mock-provider";
import { XAIProvider } from "./xai-provider";

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER ?? "xai";
  const hasXaiKey = Boolean(process.env.XAI_API_KEY);

  if (provider === "xai" && hasXaiKey) {
    return new XAIProvider();
  }

  return new MockProvider();
}

export function getActiveAIModel(): string | null {
  const provider = getAIProvider();
  if (provider.name !== "xai") {
    return null;
  }
  return process.env.XAI_MODEL ?? "grok-2-1212";
}