import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import { ingredientSize } from "./schema"

export const ingredientSizeSchema = createInsertSchema(ingredientSize, {
  price: z.number().positive({ message: "Price must be a positive number" })
})

export type IngredientSizeSchema = z.infer<typeof ingredientSizeSchema>
export type SelectIngredientSizeSchema = InferSelectModel<typeof ingredientSize>
