import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import { productIngredient } from "./schema"

export const productIngredientSchema = createInsertSchema(productIngredient, {})

export type ProductIngredientSchema = z.infer<typeof productIngredientSchema>
export type SelectProductIngredientSchema = InferSelectModel<
  typeof productIngredient
>
