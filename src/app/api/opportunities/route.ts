import { requireUser } from "@/lib/auth";
import { opportunityService } from "@/lib/buildermint/opportunity-service";
import { handleApiError, jsonOk } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireUser();
    const opportunities = await opportunityService.list(user.id);
    return jsonOk({ opportunities });
  } catch (error) {
    return handleApiError(error);
  }
}