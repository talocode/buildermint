import { eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { memoryStore } from "@/lib/db/memory-store";
import { skillProfiles, type SkillProfile } from "@/lib/db/schema";

import { profileInputSchema } from "./validators";

export type ProfileInput = {
  skills: string[];
  domainExperience: string[];
  tools: string[];
  audiences: string[];
  preferredProductTypes: string[];
  weeklyTimeBudget?: number | null;
  moneyBudget?: number | null;
  monetizationPreference?: string | null;
};

function now() {
  return new Date();
}

function toProfile(userId: string, input: ProfileInput, existing?: SkillProfile): SkillProfile {
  const timestamp = now();
  return {
    id: existing?.id ?? crypto.randomUUID(),
    userId,
    skills: input.skills,
    domainExperience: input.domainExperience,
    tools: input.tools,
    audiences: input.audiences,
    preferredProductTypes: input.preferredProductTypes,
    weeklyTimeBudget: input.weeklyTimeBudget ?? null,
    moneyBudget: input.moneyBudget ?? null,
    monetizationPreference: input.monetizationPreference ?? null,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

export const profileService = {
  validateInput(body: unknown) {
    return profileInputSchema.parse(body);
  },

  async upsert(userId: string, body: unknown) {
    const input = profileInputSchema.parse(body);
    const db = getDb();

    if (db) {
      const [existing] = await db
        .select()
        .from(skillProfiles)
        .where(eq(skillProfiles.userId, userId))
        .limit(1);

      if (existing) {
        const [updated] = await db
          .update(skillProfiles)
          .set({
            ...input,
            updatedAt: now(),
          })
          .where(eq(skillProfiles.id, existing.id))
          .returning();
        return updated;
      }

      const [created] = await db
        .insert(skillProfiles)
        .values({ userId, ...input })
        .returning();
      return created;
    }

    const existing = [...memoryStore.profiles.values()].find((p) => p.userId === userId);
    const profile = toProfile(userId, input, existing);
    memoryStore.profiles.set(profile.id, profile);
    return profile;
  },

  async getByUserId(userId: string) {
    const db = getDb();
    if (db) {
      const [record] = await db
        .select()
        .from(skillProfiles)
        .where(eq(skillProfiles.userId, userId))
        .limit(1);
      return record ?? null;
    }

    return [...memoryStore.profiles.values()].find((p) => p.userId === userId) ?? null;
  },
};