import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

let client: ReturnType<typeof postgres> | null = null;
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!db) {
    client = postgres(process.env.DATABASE_URL, { prepare: false });
    db = drizzle(client, { schema });
  }

  return db;
}

export { schema };