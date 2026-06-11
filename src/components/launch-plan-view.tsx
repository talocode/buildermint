import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function LaunchPlanView({
  plan,
}: {
  plan: {
    landingPageCopy: Record<string, string>;
    xLaunchPost: string;
    customerOutreachMessages: string[];
    waitlistCta: string;
    pricingTest: string;
    successMetrics: string[];
    uncertaintyNotes?: string[];
    testFirst?: string[];
  };
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Landing page copy</CardTitle>
        </CardHeader>
        <dl className="space-y-2 text-sm text-slate-300">
          {Object.entries(plan.landingPageCopy).map(([key, value]) => (
            <div key={key}>
              <dt className="font-medium capitalize text-slate-200">{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>X launch post</CardTitle>
        </CardHeader>
        <p className="text-sm text-slate-300">{plan.xLaunchPost}</p>
      </Card>
      <ListCard title="Customer outreach" items={plan.customerOutreachMessages} />
      <Card>
        <CardHeader>
          <CardTitle>Waitlist CTA</CardTitle>
        </CardHeader>
        <p className="text-sm text-slate-300">{plan.waitlistCta}</p>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pricing test</CardTitle>
        </CardHeader>
        <p className="text-sm text-slate-300">{plan.pricingTest}</p>
      </Card>
      <ListCard title="Success metrics" items={plan.successMetrics} />
      {plan.testFirst?.length ? <ListCard title="What to test first" items={plan.testFirst} /> : null}
      {plan.uncertaintyNotes?.length ? <ListCard title="Uncertainty notes" items={plan.uncertaintyNotes} /> : null}
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}