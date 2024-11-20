import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import { ingredient } from "./schema"

export const ingredientSchema = createInsertSchema(ingredient, {
  name: (schema) => schema.name.min(1, { message: "Name is required" }),
  slug: (schema) => schema.slug.min(1, { message: "Slug is required" }),
  imageUrl: (schema) =>
    schema.imageUrl.min(1, { message: "Image URL is required" })
}).omit({ createdAt: true, updatedAt: true })

export type IngredientSchema = z.infer<typeof ingredientSchema>
export type SelectIngredientSchema = InferSelectModel<typeof ingredient>
