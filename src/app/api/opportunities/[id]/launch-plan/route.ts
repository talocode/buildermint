import { requireUser } from "@/lib/auth";
import { launchPlanService } from "@/lib/buildermint/launch-plan-service";
import { handleApiError, jsonOk } from "@/lib/api";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const plan = await launchPlanService.generate(user.id, id);
    return jsonOk({ plan });
  } catch (error) {
    return handleApiError(error);
  }
}