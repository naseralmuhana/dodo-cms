import { relations } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"

import { productSizeType } from "@/db/schema/product-size-type/schema"

/**
 * Types Table
 * Represents different types available for products (e.g., pizza types such as "Thin", "Original").
 * Each type is associated with a unique name and a slug for URL-based references.
 *
 * Fields:
 * - `id`: Unique identifier for each type.
 * - `name`: Name of the type (e.g., "Thin", "Original").
 * - `slug`: A URL-friendly identifier for the type, used in routes and references.
 * - `createdAt`: Timestamp for when the type was created.
 * - `updatedAt`: Timestamp for when the type was last updated.
 *
 * Indexes:
 * - `types_name_idx`: Index on the `name` field to speed up searches by name.
 * - `types_slug_idx`: Index on the `slug` field to allow fast lookups by slug.
 */
export const type = pgTable(
  "types",
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
    index("types_name_idx").on(table.name),
    index("types_slug_idx").on(table.slug)
  ]
)

/**
 * Relationships:
 * - `productsSizesTypes`: Many-to-many relationship with `products`, specifying the pricing for different product sizes and types.
 *   This allows querying the products available in each type.
 */
export const typeRelations = relations(type, ({ many }) => ({
  productsSizesTypes: many(productSizeType)
}))
