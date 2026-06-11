import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const skillProfiles = pgTable("skill_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  skills: jsonb("skills").$type<string[]>().notNull().default([]),
  domainExperience: jsonb("domain_experience").$type<string[]>().notNull().default([]),
  tools: jsonb("tools").$type<string[]>().notNull().default([]),
  audiences: jsonb("audiences").$type<string[]>().notNull().default([]),
  preferredProductTypes: jsonb("preferred_product_types").$type<string[]>().notNull().default([]),
  weeklyTimeBudget: integer("weekly_time_budget"),
  moneyBudget: integer("money_budget"),
  monetizationPreference: text("monetization_preference"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const opportunities = pgTable("opportunities", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  skillProfileId: uuid("skill_profile_id").notNull(),
  title: text("title").notNull(),
  targetAudience: text("target_audience").notNull(),
  painfulProblem: text("painful_problem").notNull(),
  demandSignal: text("demand_signal").notNull(),
  proposedMicroSaas: text("proposed_micro_saas").notNull(),
  whyThisFitsUser: text("why_this_fits_user").notNull(),
  pricingIdea: text("pricing_idea").notNull(),
  difficultyScore: integer("difficulty_score").notNull(),
  confidenceScore: integer("confidence_score").notNull(),
  mvpScope: text("mvp_scope").notNull(),
  assumptions: jsonb("assumptions").$type<string[]>().notNull().default([]),
  validationSteps: jsonb("validation_steps").$type<string[]>().notNull().default([]),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const buildPlans = pgTable("build_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  opportunityId: uuid("opportunity_id").notNull(),
  featureList: jsonb("feature_list").$type<string[]>().notNull().default([]),
  techStack: jsonb("tech_stack").$type<Record<string, string>>().notNull().default({}),
  dataModel: jsonb("data_model").$type<Record<string, unknown>[]>().notNull().default([]),
  apiRoutes: jsonb("api_routes").$type<string[]>().notNull().default([]),
  uiPages: jsonb("ui_pages").$type<string[]>().notNull().default([]),
  implementationPrompts: jsonb("implementation_prompts").$type<string[]>().notNull().default([]),
  validationChecklist: jsonb("validation_checklist").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const launchPlans = pgTable("launch_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  opportunityId: uuid("opportunity_id").notNull(),
  landingPageCopy: jsonb("landing_page_copy").$type<Record<string, string>>().notNull().default({}),
  xLaunchPost: text("x_launch_post").notNull().default(""),
  customerOutreachMessages: jsonb("customer_outreach_messages").$type<string[]>().notNull().default([]),
  waitlistCta: text("waitlist_cta").notNull().default(""),
  pricingTest: text("pricing_test").notNull().default(""),
  successMetrics: jsonb("success_metrics").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const savedResearchSignals = pgTable("saved_research_signals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  opportunityId: uuid("opportunity_id"),
  source: text("source").notNull(),
  title: text("title").notNull(),
  url: text("url"),
  summary: text("summary").notNull(),
  signalType: text("signal_type").notNull(),
  confidence: integer("confidence").notNull().default(50),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type SkillProfile = typeof skillProfiles.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;
export type BuildPlan = typeof buildPlans.$inferSelect;
export type LaunchPlan = typeof launchPlans.$inferSelect;
export type SavedResearchSignal = typeof savedResearchSignals.$inferSelect;