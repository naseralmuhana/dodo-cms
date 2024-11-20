import { relations } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"

import { ingredientSize } from "@/db/schema/ingredient-size/schema"
import { productIngredient } from "@/db/schema/product-ingredient/schema"

/**
 * Ingredients Table
 * Represents the ingredients available for use in various products (e.g., pizzas, drinks).
 * Ingredients can be base items or optional extras.
 *
 * Fields:
 * - `id`: Unique identifier for each ingredient.
 * - `name`: The name of the ingredient (e.g., "Chicken", "Onion").
 * - `slug`: URL-friendly version of the ingredient name, generated automatically and unique across all ingredients.
 * - `imageUrl`: URL to the image representing the ingredient.
 * - `createdAt`: Timestamp indicating when the ingredient was created.
 * - `updatedAt`: Timestamp indicating when the ingredient was last updated.
 *
 * Indexes:
 * - `ingredients_name_idx`: Index on the `name` field for fast lookup of ingredients by name.
 * - `ingredients_slug_idx`: Index on the `slug` field for fast lookup of ingredients by slug.
 */
export const ingredient = pgTable(
  "ingredients",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at", { precision: 2 }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { precision: 2, mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("ingredients_name_idx").on(table.name),
    index("ingredients_slug_idx").on(table.slug)
  ]
)

/**
 * Relations:
 * - `ingredientsSizes`: Many-to-many relationship with `sizes`, which specifies the size-specific pricing for ingredients.
 * - `productsIngredients`: Many-to-many relationship with `products`, linking each ingredient to a specific product, allowing both base and extra ingredients to be added to products.
 */
export const ingredientRelations = relations(ingredient, ({ many }) => ({
  ingredientsSizes: many(ingredientSize),
  productsIngredients: many(productIngredient)
}))
