import { eq } from "drizzle-orm";

import { getAIProvider } from "@/lib/ai/provider";
import { getDb } from "@/lib/db";
import { memoryStore } from "@/lib/db/memory-store";
import { buildPlans, type BuildPlan } from "@/lib/db/schema";

import { opportunityService } from "./opportunity-service";
import { profileService } from "./profile-service";

function now() {
  return new Date();
}

export const buildPlanService = {
  async generate(userId: string, opportunityId: string) {
    const opportunity = await opportunityService.getById(userId, opportunityId);
    if (!opportunity) {
      throw new Error("Opportunity not found.");
    }

    const profile = await profileService.getByUserId(userId);
    if (!profile) {
      throw new Error("Skill profile not found.");
    }

    const provider = getAIProvider();
    const output = await provider.generateBuildPlan(
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
    );

    const record: BuildPlan = {
      id: crypto.randomUUID(),
      userId,
      opportunityId,
      featureList: output.featureList,
      techStack: output.techStack,
      dataModel: output.dataModel,
      apiRoutes: output.apiRoutes,
      uiPages: output.uiPages,
      implementationPrompts: output.implementationPrompts,
      validationChecklist: output.validationChecklist,
      createdAt: now(),
      updatedAt: now(),
    };

    const db = getDb();
    if (db) {
      const [created] = await db.insert(buildPlans).values(record).returning();
      return { ...created, uncertaintyNotes: output.uncertaintyNotes, testFirst: output.testFirst };
    }

    memoryStore.buildPlans.set(record.id, record);
    return { ...record, uncertaintyNotes: output.uncertaintyNotes, testFirst: output.testFirst };
  },

  async getById(userId: string, id: string) {
    const db = getDb();
    if (db) {
      const [record] = await db
        .select()
        .from(buildPlans)
        .where(eq(buildPlans.id, id))
        .limit(1);
      if (!record || record.userId !== userId) return null;
      return record;
    }

    const record = memoryStore.buildPlans.get(id);
    if (!record || record.userId !== userId) return null;
    return record;
  },
};