import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import { size } from "./schema"

export const sizeSchema = createInsertSchema(size, {
  name: (schema) => schema.name.min(1, { message: "Name is required" }),
  slug: (schema) => schema.slug.min(1, { message: "Slug is required" })
}).omit({ createdAt: true, updatedAt: true })

export type SizeSchema = z.infer<typeof sizeSchema>

export type SelectSizeSchema = InferSelectModel<typeof size>
