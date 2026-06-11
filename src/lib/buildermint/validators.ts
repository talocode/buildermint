import { z } from "zod";

export const profileInputSchema = z.object({
  skills: z.array(z.string().min(1)).min(1),
  domainExperience: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  audiences: z.array(z.string().min(1)).min(1),
  preferredProductTypes: z.array(z.string()).default([]),
  weeklyTimeBudget: z.number().int().positive().optional().nullable(),
  moneyBudget: z.number().int().nonnegative().optional().nullable(),
  monetizationPreference: z.string().optional().nullable(),
});

export const generateOpportunitiesSchema = z.object({
  skillProfileId: z.string().uuid().optional(),
});

export const opportunityIdSchema = z.object({
  id: z.string().uuid(),
});

export const planIdSchema = z.object({
  id: z.string().uuid(),
});

export function parseJsonBody<T>(schema: z.ZodSchema<T>, body: unknown): T {
  return schema.parse(body);
}