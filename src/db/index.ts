import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "@/db/schema"

import env from "@/lib/env"

const sql = neon(env.DATABASE_URL)
export const db = drizzle({
  client: sql,
  schema,
  logger: true
})
export type DB = typeof db
