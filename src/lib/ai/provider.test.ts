import { afterEach, describe, expect, it, vi } from "vitest";

import { getAIProvider } from "./provider";
import { MockProvider } from "./mock-provider";
import { XAIProvider } from "./xai-provider";
import { selectAIProviderName } from "@/lib/runtime-status";

describe("AI provider selection", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses mock provider when XAI_API_KEY is missing", () => {
    vi.stubEnv("AI_PROVIDER", "xai");
    vi.stubEnv("XAI_API_KEY", "");

    expect(selectAIProviderName()).toBe("mock");
    expect(getAIProvider()).toBeInstanceOf(MockProvider);
  });

  it("uses xAI provider when AI_PROVIDER=xai and key exists", () => {
    vi.stubEnv("AI_PROVIDER", "xai");
    vi.stubEnv("XAI_API_KEY", "test-key");

    expect(selectAIProviderName()).toBe("xai");
    expect(getAIProvider()).toBeInstanceOf(XAIProvider);
  });
});