import { requireUser } from "@/lib/auth";
import { profileService } from "@/lib/buildermint/profile-service";
import { handleApiError, jsonOk } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireUser();
    const profile = await profileService.getByUserId(user.id);
    return jsonOk({ profile });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const profile = await profileService.upsert(user.id, body);
    return jsonOk({ profile });
  } catch (error) {
    return handleApiError(error);
  }
}