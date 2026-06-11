export class AIGenerationError extends Error {
  constructor(message = "AI generation failed. Please try again.") {
    super(message);
    this.name = "AIGenerationError";
  }
}

export function wrapAIError(error: unknown): AIGenerationError {
  if (error instanceof AIGenerationError) {
    return error;
  }
  return new AIGenerationError();
}