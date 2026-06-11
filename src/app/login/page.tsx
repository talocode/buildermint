"use client";

import Link from "next/link";
import { useState } from "react";

import { LoadingButton } from "@/components/loading-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      setMessage("Supabase is not configured. Continue to dashboard in development mode.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    setMessage(error ? error.message : "Check your email for the magic link.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to BuilderMint</CardTitle>
          <CardDescription>
            Use your email for a magic link. In development without Supabase, go straight to the dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <LoadingButton type="submit" loading={loading} className="w-full">
            Send magic link
          </LoadingButton>
        </form>
        {message ? <p className="mt-4 text-sm text-slate-400">{message}</p> : null}
        {!process.env.NEXT_PUBLIC_SUPABASE_URL ? (
          <p className="mt-6 text-sm text-slate-500">
            Dev mode? <Link href="/dashboard" className="text-emerald-400">Open dashboard</Link>
          </p>
        ) : null}
      </Card>
    </div>
  );
}