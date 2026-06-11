import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  "Profile your skills, tools, audiences, and constraints",
  "Generate validated micro-SaaS opportunities with demand signals",
  "Open the best fit and generate an MVP build plan",
  "Create a launch plan with messaging, outreach, and test metrics",
];

const outputs = [
  "Skill profile",
  "Ranked opportunities",
  "MVP build plan",
  "Launch plan",
  "Validation checklist",
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-emerald-400">BuilderMint</span>
          <div className="flex gap-3">
            <Button asChild variant="ghost">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Start building</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-20">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-emerald-400">Talocode</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Turn your skills into validated micro-SaaS ideas.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            BuilderMint helps builders profile their skills, find demand signals, generate buildable opportunities, and turn the best idea into an MVP and launch plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/dashboard">Start building</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-slate-800 bg-slate-950/60 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold text-white">How it works</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {steps.map((step, index) => (
                <Card key={step}>
                  <CardHeader>
                    <CardTitle>Step {index + 1}</CardTitle>
                    <CardDescription>{step}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-white">What you get</h2>
              <ul className="mt-6 space-y-3 text-slate-300">
                {outputs.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Example output</CardTitle>
                <CardDescription>
                  A realistic opportunity with assumptions and validation steps — not guaranteed revenue hype.
                </CardDescription>
              </CardHeader>
              <div className="space-y-3 text-sm text-slate-300">
                <p><strong className="text-slate-100">Idea:</strong> Skill-to-offer mapper for consultants moving into products</p>
                <p><strong className="text-slate-100">Demand signal:</strong> Repeated questions about productizing expertise without overbuilding</p>
                <p><strong className="text-slate-100">Validation:</strong> Interview 5 builders, publish a waitlist CTA, test one outreach message</p>
              </div>
            </Card>
          </div>
        </section>

        <section className="border-t border-slate-800 py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-semibold text-white">Build opportunities, not hype.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              BuilderMint is for builders who want structured validation, realistic scopes, and launch plans they can test.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/dashboard/profile">Start building</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        BuilderMint by Talocode — turn skills into validated software opportunities.
      </footer>
    </div>
  );
}