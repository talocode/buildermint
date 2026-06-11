import { SkillProfileForm } from "@/components/skill-profile-form";
import { profileService } from "@/lib/buildermint/profile-service";
import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const profile = await profileService.getByUserId(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Skill Profile</h1>
        <p className="mt-2 text-slate-400">
          Tell BuilderMint what you can build, who you understand, and how much time or budget you have.
        </p>
      </div>
      <SkillProfileForm initial={profile} />
    </div>
  );
}