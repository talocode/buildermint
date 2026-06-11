import { beforeEach, describe, expect, it } from "vitest";

import { memoryStore } from "@/lib/db/memory-store";

import { opportunityService } from "./opportunity-service";
import { profileService } from "./profile-service";

const profileInput = {
  skills: ["TypeScript"],
  domainExperience: ["SaaS"],
  tools: ["Next.js"],
  audiences: ["founders"],
  preferredProductTypes: ["B2B"],
  monetizationPreference: "subscription",
};

describe("user-scoped records", () => {
  beforeEach(() => {
    memoryStore.profiles.clear();
    memoryStore.opportunities.clear();
    memoryStore.buildPlans.clear();
    memoryStore.launchPlans.clear();
  });

  it("scopes opportunities to the authenticated user id", async () => {
    await profileService.upsert("user-a", profileInput);
    await profileService.upsert("user-b", profileInput);

    await opportunityService.generate("user-a");
    const userAList = await opportunityService.list("user-a");
    const userBList = await opportunityService.list("user-b");

    expect(userAList).toHaveLength(5);
    expect(userBList).toHaveLength(0);
    expect(userAList.every((item) => item.userId === "user-a")).toBe(true);
  });
});