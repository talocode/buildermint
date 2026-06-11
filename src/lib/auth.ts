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

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === "development") {
      return DEV_USER;
    }
    return null;
  }

  const supabase = await createClient();
  if (!supabase) {
    return process.env.NODE_ENV === "development" ? DEV_USER : null;
  }

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return process.env.NODE_ENV === "development" ? DEV_USER : null;
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