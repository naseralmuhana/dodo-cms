import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import { product } from "./schema"

export const productSchema = createInsertSchema(product, {
  name: (schema) => schema.name.min(1, { message: "Name is required" }),
  slug: (schema) => schema.slug.min(1, { message: "Slug is required" }),
  categoryId: (schema) =>
    schema.categoryId.min(1, { message: "Category is required" })
}).omit({ createdAt: true, updatedAt: true })

export type ProductSchema = z.infer<typeof productSchema>
export type SelectProductSchema = InferSelectModel<typeof product>
