import { beforeEach, describe, expect, it } from "vitest";

import { memoryStore } from "@/lib/db/memory-store";

import { opportunityService } from "./opportunity-service";
import { profileService } from "./profile-service";

describe("opportunityService with mock provider", () => {
  beforeEach(() => {
    memoryStore.profiles.clear();
    memoryStore.opportunities.clear();
    memoryStore.buildPlans.clear();
    memoryStore.launchPlans.clear();
  });

  it("generates opportunities after profile creation", async () => {
    await profileService.upsert("user-1", {
      skills: ["React"],
      domainExperience: ["SaaS"],
      tools: ["Next.js"],
      audiences: ["founders"],
      preferredProductTypes: ["B2B"],
      monetizationPreference: "subscription",
    });

    const opportunities = await opportunityService.generate("user-1");
    expect(opportunities).toHaveLength(5);
    expect(opportunities[0].scores?.overall).toBeGreaterThan(0);
  });
});