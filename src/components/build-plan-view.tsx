import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function BuildPlanView({
  plan,
}: {
  plan: {
    featureList: string[];
    techStack: Record<string, string>;
    dataModel: Record<string, unknown>[];
    apiRoutes: string[];
    uiPages: string[];
    implementationPrompts: string[];
    validationChecklist: string[];
    uncertaintyNotes?: string[];
    testFirst?: string[];
  };
}) {
  return (
    <div className="space-y-4">
      <Section title="Features" items={plan.featureList} />
      <Card>
        <CardHeader>
          <CardTitle>Tech stack</CardTitle>
        </CardHeader>
        <dl className="grid gap-2 text-sm text-slate-300 md:grid-cols-2">
          {Object.entries(plan.techStack).map(([key, value]) => (
            <div key={key}>
              <dt className="font-medium text-slate-200">{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <Section title="API routes" items={plan.apiRoutes} />
      <Section title="UI pages" items={plan.uiPages} />
      <Section title="Implementation prompts" items={plan.implementationPrompts} />
      <Section title="Validation checklist" items={plan.validationChecklist} />
      {plan.testFirst?.length ? <Section title="What to test first" items={plan.testFirst} /> : null}
      {plan.uncertaintyNotes?.length ? <Section title="Uncertainty notes" items={plan.uncertaintyNotes} /> : null}
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Structured output for execution, not hype.</CardDescription>
      </CardHeader>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}