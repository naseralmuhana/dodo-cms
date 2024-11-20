import { relations } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"

import { product } from "@/db/schema/product/schema"

/**
 * Categories Table
 * Represents the different categories (e.g., Pizzas, Drinks) to which products can belong.
 *
 * Fields:
 * - `id`: Unique identifier for each category.
 * - `name`: Name of the category (e.g., "Pizzas", "Drinks").
 * - `slug`: URL-friendly version of the category name, automatically generated and unique across all categories.
 * - `createdAt`: Timestamp indicating when the category was created.
 * - `updatedAt`: Timestamp indicating when the category was last updated.
 *
 * Indexes:
 * - `categories_name_idx`: Index on the `name` field for fast lookup of categories by name.
 * - `categories_slug_idx`: Index on the `slug` field for fast lookup of categories by slug.
 */
export const category = pgTable(
  "categories",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    createdAt: timestamp("created_at", { precision: 2 }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { precision: 2, mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("categories_name_idx").on(table.name),
    index("categories_slug_idx").on(table.slug)
  ]
)

/**
 * Relations:
 * - `products`: One-to-many relationship, where each category can have multiple products.
 *   This allows us to query the products that belong to a specific category.
 */
export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product)
}))
