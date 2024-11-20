import { relations } from "drizzle-orm"
import { decimal, integer, pgTable, primaryKey } from "drizzle-orm/pg-core"

import { ingredient } from "@/db/schema/ingredient/schema"
import { size } from "@/db/schema/size/schema"

/**
 * Ingredient Sizes Table
 * Represents the relationship between ingredients and their sizes, along with the pricing for each combination.
 * This table allows tracking how much an ingredient costs when used with a specific size.
 *
 * Fields:
 * - `ingredientId`: A URL-friendly identifier for the ingredient (e.g., "chicken", "cheese").
 *   - References the `id` field in the `ingredients` table.
 *
 * - `sizeId`: A URL-friendly identifier for the size (e.g., "small", "medium", "large").
 *   - References the `id` field in the `sizes` table.
 *
 * - `price`: The price of the ingredient for the specified size.
 *   - Stored as a decimal with a precision of 5 and scale of 2 (e.g., "0.50", "1.25").
 *
 * Primary Key:
 * - The combination of `ingredientId` and `sizeId` serves as the primary key to ensure uniqueness of ingredient-size combinations.
 *
 */
export const ingredientSize = pgTable(
  "ingredients_sizes",
  {
    ingredientId: integer("ingredient_id")
      .references(() => ingredient.id, { onDelete: "cascade" })
      .notNull(),
    sizeId: integer("size_id")
      .references(() => size.id, { onDelete: "cascade" })
      .notNull(),
    price: decimal("price", { precision: 5, scale: 2 }).notNull()
  },
  (table) => [primaryKey({ columns: [table.ingredientId, table.sizeId] })]
)

/**
 * Relations:
 * - `ingredient`: Many-to-one relationship, linking each size-price pair to a specific ingredient.
 * - `size`: Many-to-one relationship, linking each size-price pair to a specific size.
 */
export const ingredientSizeRelations = relations(ingredientSize, ({ one }) => ({
  ingredient: one(ingredient, {
    fields: [ingredientSize.ingredientId],
    references: [ingredient.id]
  }),
  size: one(size, {
    fields: [ingredientSize.sizeId],
    references: [size.id]
  })
}))
