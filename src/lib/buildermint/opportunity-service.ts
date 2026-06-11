import { desc, eq } from "drizzle-orm";

import { getAIProvider } from "@/lib/ai/provider";
import { getDb } from "@/lib/db";
import { memoryStore } from "@/lib/db/memory-store";
import { opportunities, type Opportunity } from "@/lib/db/schema";

import { profileService } from "./profile-service";
import { scoreOpportunity } from "./scoring";

function now() {
  return new Date();
}

function toOpportunity(
  userId: string,
  skillProfileId: string,
  idea: Awaited<ReturnType<ReturnType<typeof getAIProvider>["generateOpportunities"]>>[number],
): Opportunity {
  const timestamp = now();
  return {
    id: crypto.randomUUID(),
    userId,
    skillProfileId,
    title: idea.title,
    targetAudience: idea.targetAudience,
    painfulProblem: idea.painfulProblem,
    demandSignal: idea.demandSignal,
    proposedMicroSaas: idea.proposedMicroSaas,
    whyThisFitsUser: idea.whyThisFitsUser,
    pricingIdea: idea.pricingIdea,
    difficultyScore: idea.difficultyScore,
    confidenceScore: idea.confidenceScore,
    mvpScope: idea.mvpScope,
    assumptions: idea.assumptions,
    validationSteps: idea.validationSteps,
    status: "generated",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export const opportunityService = {
  async generate(userId: string, skillProfileId?: string) {
    const profile = await profileService.getByUserId(userId);
    if (!profile) {
      throw new Error("Create a skill profile before generating opportunities.");
    }

    if (skillProfileId && skillProfileId !== profile.id) {
      throw new Error("Skill profile not found.");
    }

    const provider = getAIProvider();
    const ideas = await provider.generateOpportunities({
      skills: profile.skills,
      domainExperience: profile.domainExperience,
      tools: profile.tools,
      audiences: profile.audiences,
      preferredProductTypes: profile.preferredProductTypes,
      weeklyTimeBudget: profile.weeklyTimeBudget,
      moneyBudget: profile.moneyBudget,
      monetizationPreference: profile.monetizationPreference,
    });

    const db = getDb();
    const records = ideas.map((idea) => toOpportunity(userId, profile.id, idea));

    if (db) {
      const inserted = await db.insert(opportunities).values(records).returning();
      return inserted.map((record) => ({
        ...record,
        scores: scoreOpportunity(
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
            title: record.title,
            targetAudience: record.targetAudience,
            painfulProblem: record.painfulProblem,
            demandSignal: record.demandSignal,
            proposedMicroSaas: record.proposedMicroSaas,
            whyThisFitsUser: record.whyThisFitsUser,
            pricingIdea: record.pricingIdea,
            difficultyScore: record.difficultyScore,
            confidenceScore: record.confidenceScore,
            mvpScope: record.mvpScope,
            assumptions: record.assumptions,
            validationSteps: record.validationSteps,
          },
        ),
      }));
    }

    records.forEach((record) => memoryStore.opportunities.set(record.id, record));
    return records.map((record) => ({
      ...record,
      scores: scoreOpportunity(
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
          title: record.title,
          targetAudience: record.targetAudience,
          painfulProblem: record.painfulProblem,
          demandSignal: record.demandSignal,
          proposedMicroSaas: record.proposedMicroSaas,
          whyThisFitsUser: record.whyThisFitsUser,
          pricingIdea: record.pricingIdea,
          difficultyScore: record.difficultyScore,
          confidenceScore: record.confidenceScore,
          mvpScope: record.mvpScope,
          assumptions: record.assumptions,
          validationSteps: record.validationSteps,
        },
      ),
    }));
  },

  async list(userId: string) {
    const db = getDb();
    if (db) {
      return db
        .select()
        .from(opportunities)
        .where(eq(opportunities.userId, userId))
        .orderBy(desc(opportunities.createdAt));
    }

    return [...memoryStore.opportunities.values()]
      .filter((item) => item.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  async getById(userId: string, id: string) {
    const db = getDb();
    if (db) {
      const [record] = await db
        .select()
        .from(opportunities)
        .where(eq(opportunities.id, id))
        .limit(1);
      if (!record || record.userId !== userId) return null;
      return record;
    }

    const record = memoryStore.opportunities.get(id);
    if (!record || record.userId !== userId) return null;
    return record;
  },
};