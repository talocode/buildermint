import { xai } from "@ai-sdk/xai";
import { generateObject } from "ai";
import { z } from "zod";

import {
  buildPlanPrompt,
  launchPlanPrompt,
  opportunitiesPrompt,
} from "@/lib/prompts";

import { wrapAIError } from "./errors";

import type {
  AIProvider,
  BuildPlanOutput,
  LaunchPlanOutput,
  OpportunityIdea,
  SkillProfileInput,
} from "./provider";

const opportunitySchema = z.object({
  ideas: z.array(
    z.object({
      title: z.string(),
      targetAudience: z.string(),
      painfulProblem: z.string(),
      demandSignal: z.string(),
      proposedMicroSaas: z.string(),
      whyThisFitsUser: z.string(),
      pricingIdea: z.string(),
      difficultyScore: z.number().min(1).max(100),
      confidenceScore: z.number().min(1).max(100),
      mvpScope: z.string(),
      assumptions: z.array(z.string()).min(1),
      validationSteps: z.array(z.string()).min(1),
    }),
  ),
});

const buildPlanSchema = z.object({
  featureList: z.array(z.string()),
  techStack: z.record(z.string()),
  dataModel: z.array(z.record(z.unknown())),
  apiRoutes: z.array(z.string()),
  uiPages: z.array(z.string()),
  implementationPrompts: z.array(z.string()),
  validationChecklist: z.array(z.string()),
  uncertaintyNotes: z.array(z.string()),
  testFirst: z.array(z.string()),
});

const launchPlanSchema = z.object({
  landingPageCopy: z.record(z.string()),
  xLaunchPost: z.string(),
  customerOutreachMessages: z.array(z.string()),
  waitlistCta: z.string(),
  pricingTest: z.string(),
  successMetrics: z.array(z.string()),
  uncertaintyNotes: z.array(z.string()),
  testFirst: z.array(z.string()),
});

export class XAIProvider implements AIProvider {
  readonly name = "xai";

  private model() {
    return xai(process.env.XAI_MODEL ?? "grok-2-1212");
  }

  async generateOpportunities(profile: SkillProfileInput): Promise<OpportunityIdea[]> {
    try {
      const { object } = await generateObject({
        model: this.model(),
        schema: opportunitySchema,
        prompt: opportunitiesPrompt(profile),
      });

      return object.ideas;
    } catch (error) {
      throw wrapAIError(error);
    }
  }

  async generateBuildPlan(
    profile: SkillProfileInput,
    opportunity: OpportunityIdea,
  ): Promise<BuildPlanOutput> {
    try {
      const { object } = await generateObject({
        model: this.model(),
        schema: buildPlanSchema,
        prompt: buildPlanPrompt(profile, opportunity),
      });

      return object;
    } catch (error) {
      throw wrapAIError(error);
    }
  }

  async generateLaunchPlan(
    profile: SkillProfileInput,
    opportunity: OpportunityIdea,
  ): Promise<LaunchPlanOutput> {
    try {
      const { object } = await generateObject({
        model: this.model(),
        schema: launchPlanSchema,
        prompt: launchPlanPrompt(profile, opportunity),
      });

      return object;
    } catch (error) {
      throw wrapAIError(error);
    }
  }
}