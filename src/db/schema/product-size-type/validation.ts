import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import { productSizeType } from "./schema"

export const productSizeTypeSchema = createInsertSchema(productSizeType, {
  price: z.number().positive({ message: "Price must be a positive number" })
})

export type ProductSizeTypeSchema = z.infer<typeof productSizeTypeSchema>
export type SelectProductSizeTypeSchema = InferSelectModel<
  typeof productSizeType
>
