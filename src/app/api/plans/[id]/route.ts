import { requireUser } from "@/lib/auth";
import { buildPlanService } from "@/lib/buildermint/build-plan-service";
import { launchPlanService } from "@/lib/buildermint/launch-plan-service";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const type = new URL(request.url).searchParams.get("type");

    if (type === "launch") {
      const plan = await launchPlanService.getById(user.id, id);
      if (!plan) return jsonError("Plan not found", 404);
      return jsonOk({ plan, planType: "launch" });
    }

    const buildPlan = await buildPlanService.getById(user.id, id);
    if (!buildPlan) return jsonError("Plan not found", 404);
    return jsonOk({ plan: buildPlan, planType: "build" });
  } catch (error) {
    return handleApiError(error);
  }
}