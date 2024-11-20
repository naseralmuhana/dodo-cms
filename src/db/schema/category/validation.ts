import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import { category } from "./schema"

export const categorySchema = createInsertSchema(category, {
  name: (schema) => schema.name.min(1, { message: "Name is required" }),
  slug: (schema) => schema.slug.min(1, { message: "Slug is required" })
}).omit({ createdAt: true, updatedAt: true })

export type CategorySchema = z.infer<typeof categorySchema>
export type SelectCategorySchema = InferSelectModel<typeof category>
