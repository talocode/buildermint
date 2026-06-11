"use client";

import { useState } from "react";

import { LoadingButton } from "@/components/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SkillProfile } from "@/lib/db/schema";

function toLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function fromLines(values: string[]) {
  return values.join("\n");
}

export function SkillProfileForm({ initial }: { initial?: SkillProfile | null }) {
  const [skills, setSkills] = useState(fromLines(initial?.skills ?? []));
  const [domainExperience, setDomainExperience] = useState(fromLines(initial?.domainExperience ?? []));
  const [tools, setTools] = useState(fromLines(initial?.tools ?? []));
  const [audiences, setAudiences] = useState(fromLines(initial?.audiences ?? []));
  const [preferredProductTypes, setPreferredProductTypes] = useState(
    fromLines(initial?.preferredProductTypes ?? []),
  );
  const [weeklyTimeBudget, setWeeklyTimeBudget] = useState(
    initial?.weeklyTimeBudget?.toString() ?? "",
  );
  const [moneyBudget, setMoneyBudget] = useState(initial?.moneyBudget?.toString() ?? "");
  const [monetizationPreference, setMonetizationPreference] = useState(
    initial?.monetizationPreference ?? "subscription",
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skills: toLines(skills),
        domainExperience: toLines(domainExperience),
        tools: toLines(tools),
        audiences: toLines(audiences),
        preferredProductTypes: toLines(preferredProductTypes),
        weeklyTimeBudget: weeklyTimeBudget ? Number(weeklyTimeBudget) : null,
        moneyBudget: moneyBudget ? Number(moneyBudget) : null,
        monetizationPreference,
      }),
    });

    const payload = await response.json();
    setLoading(false);
    setMessage(payload.ok ? "Profile saved." : payload.error ?? "Failed to save profile.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="skills">Skills (one per line)</Label>
          <Textarea id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="audiences">Target audiences</Label>
          <Textarea id="audiences" value={audiences} onChange={(e) => setAudiences(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="domainExperience">Domain experience</Label>
          <Textarea id="domainExperience" value={domainExperience} onChange={(e) => setDomainExperience(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tools">Tools</Label>
          <Textarea id="tools" value={tools} onChange={(e) => setTools(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredProductTypes">Preferred product types</Label>
          <Textarea id="preferredProductTypes" value={preferredProductTypes} onChange={(e) => setPreferredProductTypes(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monetizationPreference">Monetization preference</Label>
          <Input id="monetizationPreference" value={monetizationPreference} onChange={(e) => setMonetizationPreference(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weeklyTimeBudget">Weekly time budget (hours)</Label>
          <Input id="weeklyTimeBudget" type="number" value={weeklyTimeBudget} onChange={(e) => setWeeklyTimeBudget(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="moneyBudget">Money budget (USD)</Label>
          <Input id="moneyBudget" type="number" value={moneyBudget} onChange={(e) => setMoneyBudget(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <LoadingButton type="submit" loading={loading}>
          Save profile
        </LoadingButton>
        {message ? <p className="text-sm text-slate-400">{message}</p> : null}
      </div>
    </form>
  );
}