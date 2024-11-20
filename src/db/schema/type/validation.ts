import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import { type } from "./schema"

export const typeSchema = createInsertSchema(type, {
  name: (schema) => schema.name.min(1, { message: "Name is required" }),
  slug: (schema) => schema.slug.min(1, { message: "Slug is required" })
}).omit({ createdAt: true, updatedAt: true })

export type TypeSchema = z.infer<typeof typeSchema>

export type SelectTypeSchema = InferSelectModel<typeof type>
