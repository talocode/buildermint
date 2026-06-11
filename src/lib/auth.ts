import { createClient } from "@/lib/supabase/server";

export type AuthUser = {
  id: string;
  email: string;
};

const DEV_USER: AuthUser = {
  id: "dev-user-001",
  email: "builder@buildermint.dev",
};

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function shouldUseDevAuthFallback() {
  return !isSupabaseConfigured() && process.env.NODE_ENV === "development";
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (shouldUseDevAuthFallback()) {
    return DEV_USER;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email ?? "unknown@user.local",
  };
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}