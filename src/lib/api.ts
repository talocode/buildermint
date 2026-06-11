import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { AIGenerationError } from "@/lib/ai/errors";

const SENSITIVE_PATTERNS = [
  /xai/i,
  /openai/i,
  /api[_-]?key/i,
  /service role/i,
  /stack trace/i,
  /at\s+\w+\s+\(/i,
];

function sanitizeClientMessage(message: string) {
  if (SENSITIVE_PATTERNS.some((pattern) => pattern.test(message))) {
    return "Request could not be completed.";
  }
  return message;
}

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json(
    { ok: false, error: sanitizeClientMessage(message) },
    { status },
  );
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError("Invalid request body.", 400);
  }

  if (error instanceof AIGenerationError) {
    return jsonError(error.message, 502);
  }

  if (error instanceof Error) {
    if (error.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    return jsonError(error.message, 400);
  }

  return jsonError("Unexpected server error", 500);
}