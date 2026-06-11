import { describe, expect, it } from "vitest";

import { MockProvider } from "./mock-provider";

describe("MockProvider", () => {
  it("returns five opportunities with assumptions and validation steps", async () => {
    const provider = new MockProvider();
    const ideas = await provider.generateOpportunities({
      skills: ["TypeScript"],
      domainExperience: ["SaaS"],
      tools: ["Next.js"],
      audiences: ["founders"],
      preferredProductTypes: ["B2B"],
      monetizationPreference: "subscription",
    });

    expect(ideas).toHaveLength(5);
    for (const idea of ideas) {
      expect(idea.assumptions.length).toBeGreaterThan(0);
      expect(idea.validationSteps.length).toBeGreaterThan(0);
      expect(idea.title.length).toBeGreaterThan(0);
    }
  });
});