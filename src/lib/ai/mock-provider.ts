import type {
  AIProvider,
  BuildPlanOutput,
  LaunchPlanOutput,
  OpportunityIdea,
  SkillProfileInput,
} from "./provider";

export class MockProvider implements AIProvider {
  readonly name = "mock";

  async generateOpportunities(profile: SkillProfileInput): Promise<OpportunityIdea[]> {
    const primarySkill = profile.skills[0] ?? "software development";
    const audience = profile.audiences[0] ?? "indie builders";

    return [
      {
        title: `${primarySkill} workflow tracker`,
        targetAudience: audience,
        painfulProblem: "Builders lose context between research, build, and launch phases.",
        demandSignal: "Repeated forum posts about fragmented builder workflows and idea validation.",
        proposedMicroSaas: "A lightweight workspace that turns skills into validated micro-SaaS opportunities with testable MVP scopes.",
        whyThisFitsUser: `Matches your ${primarySkill} background and preference for ${profile.preferredProductTypes[0] ?? "B2B tools"}.`,
        pricingIdea: "$19/mo solo plan after 14-day trial",
        difficultyScore: 42,
        confidenceScore: 74,
        mvpScope: "Profile intake, opportunity generator, saved plans dashboard",
        assumptions: [
          "Builders will pay for structured validation, not just idea lists",
          "Users can complete profile setup in under 10 minutes",
        ],
        validationSteps: [
          "Interview 5 builders about current idea validation workflow",
          "Run a landing page smoke test with waitlist CTA",
          "Ship profile + opportunity generator and measure week-1 retention",
        ],
      },
      {
        title: "Niche demand signal digest",
        targetAudience: profile.audiences[1] ?? "solo founders",
        painfulProblem: "Founders struggle to separate real demand from noisy trend chatter.",
        demandSignal: "High engagement on posts asking how to validate micro-SaaS ideas quickly.",
        proposedMicroSaas: "Weekly digest that maps your skills to emerging demand signals with validation prompts.",
        whyThisFitsUser: `Leverages your domain experience in ${profile.domainExperience[0] ?? "product building"}.`,
        pricingIdea: "$12/mo digest + $39/mo pro with plan exports",
        difficultyScore: 55,
        confidenceScore: 68,
        mvpScope: "Manual signal library, profile matching, exportable validation checklist",
        assumptions: [
          "Curated signals are more useful than raw scraping in v1",
          "Users trust recommendations tied to their stated skills",
        ],
        validationSteps: [
          "Collect 20 demand signals manually for one niche",
          "Test whether 3 users act on at least one validation step",
          "Measure save/share rate for generated opportunities",
        ],
      },
      {
        title: "MVP prompt pack generator",
        targetAudience: "technical indie hackers",
        painfulProblem: "Builders know the idea but stall when translating it into buildable tasks.",
        demandSignal: "Frequent requests for implementation prompts and scoped MVP backlogs.",
        proposedMicroSaas: "Turns validated opportunities into implementation prompts and UI/API outlines.",
        whyThisFitsUser: `Fits your tool stack: ${profile.tools.slice(0, 2).join(", ") || "Next.js, Supabase"}.`,
        pricingIdea: "$29 one-time export pack or $15/mo subscription",
        difficultyScore: 38,
        confidenceScore: 71,
        mvpScope: "Opportunity detail page, build plan generator, markdown export",
        assumptions: [
          "Builders want copy-paste implementation prompts, not full code generation",
          "Scope limits increase trust more than broad AI answers",
        ],
        validationSteps: [
          "Ask 5 users to build one feature from a generated prompt",
          "Track time-to-first-commit after plan export",
          "Survey willingness to pay after first successful export",
        ],
      },
      {
        title: "Launch copy coach",
        targetAudience: audience,
        painfulProblem: "Builders ship MVPs but struggle with credible launch messaging.",
        demandSignal: "Common launch threads ask for landing page and outreach templates.",
        proposedMicroSaas: "Generates launch page copy, outreach drafts, and pricing test suggestions from the MVP plan.",
        whyThisFitsUser: "Complements your build workflow without promising guaranteed revenue.",
        pricingIdea: "$9/launch pack or included in $24/mo builder plan",
        difficultyScore: 33,
        confidenceScore: 66,
        mvpScope: "Launch plan generator with editable sections and success metrics",
        assumptions: [
          "Launch help is more valuable after a build plan exists",
          "Users prefer editable drafts over auto-posting",
        ],
        validationSteps: [
          "Generate launch plans for 3 real opportunities",
          "Measure edit rate and exported copy usage",
          "Run one small pricing message A/B test manually",
        ],
      },
      {
        title: "Skill-to-offer mapper",
        targetAudience: "consultants moving into products",
        painfulProblem: "Service providers don't know which product shape fits their existing skills.",
        demandSignal: "Recurring questions about productizing expertise without overbuilding.",
        proposedMicroSaas: "Maps skills, audience, and time budget to realistic micro-SaaS shapes with monetization fit.",
        whyThisFitsUser: `Uses your monetization preference: ${profile.monetizationPreference ?? "subscription"}.`,
        pricingIdea: "$16/mo with annual discount",
        difficultyScore: 47,
        confidenceScore: 70,
        mvpScope: "Profile scoring, opportunity ranking, monetization fit explanations",
        assumptions: [
          "Users want realistic scopes based on weekly time budget",
          "Ranking builds trust more than more ideas",
        ],
        validationSteps: [
          "Verify top-ranked idea feels actionable for 5 testers",
          "Check whether time-budget constraints change selections",
          "Track repeat visits after first opportunity save",
        ],
      },
    ];
  }

  async generateBuildPlan(
    profile: SkillProfileInput,
    opportunity: OpportunityIdea,
  ): Promise<BuildPlanOutput> {
    return {
      featureList: [
        "Skill profile intake",
        "Opportunity generator",
        "Opportunity detail + scoring",
        "Build plan export",
        "Validation checklist tracker",
      ],
      techStack: {
        frontend: "Next.js App Router",
        styling: "Tailwind CSS + shadcn/ui",
        auth: "Supabase Auth",
        database: "Supabase Postgres + Drizzle ORM",
        ai: "Provider abstraction (xAI first)",
      },
      dataModel: [
        { table: "skill_profiles", purpose: "Builder skill and constraint profile" },
        { table: "opportunities", purpose: "Generated micro-SaaS opportunities" },
        { table: "build_plans", purpose: "MVP implementation plans" },
      ],
      apiRoutes: [
        "POST /api/profile",
        "POST /api/opportunities/generate",
        "POST /api/opportunities/[id]/build-plan",
      ],
      uiPages: ["/dashboard/profile", "/dashboard/opportunities", "/dashboard/opportunities/[id]"],
      implementationPrompts: [
        `Implement the core flow for "${opportunity.title}" starting with profile intake and opportunity persistence.`,
        `Add scoring badges for confidence and difficulty on the opportunity detail page.`,
        `Create a build plan view that highlights what to test first for ${opportunity.proposedMicroSaas}.`,
      ],
      validationChecklist: opportunity.validationSteps,
      uncertaintyNotes: opportunity.assumptions,
      testFirst: [
        "Validate profile completion UX with 3 builders",
        "Confirm generated opportunity feels specific to stated skills",
        "Ship save/export before adding more AI features",
      ],
    };
  }

  async generateLaunchPlan(
    _profile: SkillProfileInput,
    opportunity: OpportunityIdea,
  ): Promise<LaunchPlanOutput> {
    return {
      landingPageCopy: {
        headline: `Turn ${opportunity.targetAudience}'s problem into a focused micro-SaaS`,
        subheadline: opportunity.proposedMicroSaas,
        cta: "Join the validation waitlist",
        proof: "Built for builders who want testable opportunities, not hype.",
      },
      xLaunchPost: `I'm exploring ${opportunity.title} for ${opportunity.targetAudience}. Looking for 10 builders to test the validation workflow. No revenue promises — just a structured way to test demand.`,
      customerOutreachMessages: [
        `Hi — I'm building a tool to help ${opportunity.targetAudience} validate "${opportunity.painfulProblem}". Would a 15-minute feedback call be useful?`,
        `Quick question: how do you currently validate micro-SaaS ideas before building?`,
      ],
      waitlistCta: "Get early access to the validation workflow",
      pricingTest: opportunity.pricingIdea,
      successMetrics: [
        "10 waitlist signups from target audience",
        "3 interviews completed",
        "1 paid pilot or strong intent signal",
      ],
      uncertaintyNotes: opportunity.assumptions,
      testFirst: [
        "Publish landing page and share one outreach message",
        "Run 5 customer discovery calls",
        "Track which validation step users complete first",
      ],
    };
  }
}