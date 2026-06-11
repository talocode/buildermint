import type { BuildPlan, LaunchPlan, Opportunity, SkillProfile } from "./schema";

type Store = {
  profiles: Map<string, SkillProfile>;
  opportunities: Map<string, Opportunity>;
  buildPlans: Map<string, BuildPlan>;
  launchPlans: Map<string, LaunchPlan>;
};

const globalStore = globalThis as typeof globalThis & {
  __buildermintStore?: Store;
};

function store(): Store {
  if (!globalStore.__buildermintStore) {
    globalStore.__buildermintStore = {
      profiles: new Map(),
      opportunities: new Map(),
      buildPlans: new Map(),
      launchPlans: new Map(),
    };
  }
  return globalStore.__buildermintStore;
}

export const memoryStore = {
  profiles: store().profiles,
  opportunities: store().opportunities,
  buildPlans: store().buildPlans,
  launchPlans: store().launchPlans,
};