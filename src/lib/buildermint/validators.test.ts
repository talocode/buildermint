import { describe, expect, it } from "vitest";

import { profileInputSchema } from "./validators";

describe("profileInputSchema", () => {
  it("requires skills and audiences", () => {
    expect(() =>
      profileInputSchema.parse({
        skills: [],
        audiences: ["founders"],
      }),
    ).toThrow();
  });

  it("accepts a valid profile", () => {
    const parsed = profileInputSchema.parse({
      skills: ["React"],
      audiences: ["founders"],
      tools: ["Next.js"],
    });

    expect(parsed.skills).toEqual(["React"]);
  });
});