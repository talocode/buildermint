import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { OpportunityCard } from "@/components/opportunity-card";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { opportunityService } from "@/lib/buildermint/opportunity-service";
import { profileService } from "@/lib/buildermint/profile-service";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const profile = await profileService.getByUserId(user.id);
  const opportunities = await opportunityService.list(user.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Profile your skills, generate opportunities, and turn the best idea into build and launch plans.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Skill Profile</CardTitle>
            <CardDescription>{profile ? "Profile saved" : "Not created yet"}</CardDescription>
          </CardHeader>
          <Button asChild variant="secondary">
            <Link href="/dashboard/profile">{profile ? "Edit profile" : "Create profile"}</Link>
          </Button>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
            <CardDescription>{opportunities.length} generated</CardDescription>
          </CardHeader>
          <Button asChild variant="secondary">
            <Link href="/dashboard/opportunities">View opportunities</Link>
          </Button>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Provider and environment info</CardDescription>
          </CardHeader>
          <Button asChild variant="secondary">
            <Link href="/dashboard/settings">Open settings</Link>
          </Button>
        </Card>
      </div>

      {opportunities.length === 0 ? (
        <EmptyState
          title="No opportunities yet"
          description="Create your skill profile, then generate validated micro-SaaS ideas."
          action={
            <Button asChild>
              <Link href="/dashboard/profile">Create profile</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.slice(0, 4).map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </div>
  );
}