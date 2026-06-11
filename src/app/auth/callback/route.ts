import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        const loginUrl = new URL("/login", requestUrl.origin);
        loginUrl.searchParams.set("error", "auth_callback_failed");
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}