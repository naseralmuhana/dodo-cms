import { relations } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"

import { ingredientSize } from "@/db/schema/ingredient-size/schema"
import { productSizeType } from "@/db/schema/product-size-type/schema"

/**
 * Sizes Table
 * Represents the different sizes (e.g., Small, Medium, Large) that products can have in the restaurant.
 *
 * Fields:
 * - `id`: Unique identifier for each size.
 * - `name`: Name of the size (e.g., "Small", "Medium", "Large").
 * - `slug`: URL-friendly version of the size name, automatically generated and unique across all sizes.
 * - `createdAt`: Timestamp indicating when the size was created.
 * - `updatedAt`: Timestamp indicating when the size was last updated.
 *
 * Indexes:
 * - `sizes_name_idx`: Index on the `name` field for fast lookup of sizes by name.
 * - `sizes_slug_idx`: Index on the `slug` field for fast lookup of sizes by slug.
 */
export const size = pgTable(
  "sizes",
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
    index("sizes_name_idx").on(table.name),
    index("sizes_slug_idx").on(table.slug)
  ]
)

/**
 * Relations:
 * - `productsSizesTypes`: Many-to-many relationship with `products`, specifying the pricing for different product sizes and types.
 *   This allows querying the products available in each size.
 */
export const sizeRelations = relations(size, ({ many }) => ({
  ingredientsSizes: many(ingredientSize),
  productsSizesTypes: many(productSizeType)
}))
