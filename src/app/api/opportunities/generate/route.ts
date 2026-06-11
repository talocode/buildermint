import { requireUser } from "@/lib/auth";
import { opportunityService } from "@/lib/buildermint/opportunity-service";
import { handleApiError, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json().catch(() => ({}));
    const opportunities = await opportunityService.generate(
      user.id,
      typeof body.skillProfileId === "string" ? body.skillProfileId : undefined,
    );
    return jsonOk({ opportunities });
  } catch (error) {
    return handleApiError(error);
  }
}