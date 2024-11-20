import { relations } from "drizzle-orm"
import { boolean, pgTable, primaryKey, integer } from "drizzle-orm/pg-core"

import { ingredient } from "@/db/schema/ingredient/schema"
import { product } from "@/db/schema/product/schema"

/**
 * Products Ingredients Table
 * Represents the relationship between products and ingredients, storing which ingredients
 * are used in each product, and whether they are base ingredients or optional.
 *
 * Each record associates a product with an ingredient and includes a boolean flag `isBase`
 * that indicates whether the ingredient is part of the base (mandatory) ingredients or an optional one.
 *
 * Fields:
 * - `productId`: References the `id` of the product in the `products` table.
 * - `ingredientId`: References the `id` of the ingredient in the `ingredients` table.
 * - `isBase`: Boolean flag indicating whether the ingredient is a base ingredient (mandatory) for the product. Default is `false` for optional ingredients.
 *
 *
 * This table enables efficient querying of which ingredients are in each product,
 * as well as identifying which ingredients are mandatory (base) or optional for each product.
 */

export const productIngredient = pgTable(
  "products_ingredients",
  {
    productId: integer("product_id")
      .references(() => product.id, { onDelete: "cascade" })
      .notNull(),
    ingredientId: integer("ingredient_id")
      .references(() => ingredient.id, { onDelete: "cascade" })
      .notNull(),
    isBase: boolean("is_base").notNull().default(false)
  },
  (table) => [
    primaryKey({
      columns: [table.productId, table.ingredientId, table.isBase]
    })
  ]
)

/**
 * Relations:
 * - `product`: Many-to-one relationship, linking each product-ingredient pair to a specific product.
 * - `ingredient`: Many-to-one relationship, linking each product-ingredient pair to a specific ingredient.
 */
export const productIngredientRelations = relations(
  productIngredient,
  ({ one }) => ({
    product: one(product, {
      fields: [productIngredient.productId],
      references: [product.id]
    }),
    ingredient: one(ingredient, {
      fields: [productIngredient.ingredientId],
      references: [ingredient.id]
    })
  })
)
