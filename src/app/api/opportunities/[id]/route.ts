import { requireUser } from "@/lib/auth";
import { opportunityService } from "@/lib/buildermint/opportunity-service";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const opportunity = await opportunityService.getById(user.id, id);
    if (!opportunity) {
      return jsonError("Opportunity not found", 404);
    }
    return jsonOk({ opportunity });
  } catch (error) {
    return handleApiError(error);
  }
}