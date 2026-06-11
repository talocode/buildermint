import { describe, expect, it } from "vitest";
import { ZodError, z } from "zod";

import { AIGenerationError } from "@/lib/ai/errors";
import { handleApiError } from "./api";

describe("handleApiError", () => {
  it("returns 401 for unauthorized errors", async () => {
    const response = handleApiError(new Error("Unauthorized"));
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe("Unauthorized");
  });

  it("sanitizes raw xAI error details", async () => {
    const response = handleApiError(
      new Error("xAI API key invalid at Provider.call (/node_modules/ai)"),
    );
    const body = await response.json();
    expect(body.error).toBe("Request could not be completed.");
  });

  it("returns clean AI generation errors", async () => {
    const response = handleApiError(new AIGenerationError());
    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body.error).toContain("AI generation failed");
  });

  it("returns validation errors for zod failures", async () => {
    const schema = z.object({ skills: z.array(z.string()).min(1) });
    let zodError: ZodError | null = null;
    try {
      schema.parse({ skills: [] });
    } catch (error) {
      zodError = error as ZodError;
    }

    const response = handleApiError(zodError);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Invalid request body.");
  });
});