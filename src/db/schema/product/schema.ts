import { relations } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"

import { category } from "@/db/schema/category/schema"
import { productIngredient } from "@/db/schema/product-ingredient/schema"
import { productSizeType } from "@/db/schema/product-size-type/schema"

/**
 * Products Table
 * Represents the various products (e.g., pizzas, drinks) available for sale in the restaurant.
 * Each product belongs to a specific category, identified by the `categorySlug`.
 *
 * Fields:
 * - `id`: Unique numeric identifier for each product (primary key).
 * - `name`: Name of the product (e.g., "Chicken BBQ Pizza"). Must be unique.
 * - `slug`: URL-friendly identifier for the product. Must be unique and is used for slug-based routing, generated automatically and unique across all products.
 * - `categoryId`: References the `id` of the associated category in the `categories` table.
 * - `createdAt`: Timestamp indicating when the product was created. Automatically set to the current time.
 * - `updatedAt`: Timestamp indicating the last time the product was updated. Automatically updates on modification.
 *
 * Indexes:
 * - `products_name_idx`: Index on the `name` field for efficient lookup of products by name.
 * - `products_slug_idx`: Index on the `slug` field for efficient slug-based lookups.
 * - `products_category_id_idx`: Index on the `categoryId` field for efficient filtering and joining by category.
 */

export const product = pgTable(
  "products",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    categoryId: integer("category_id")
      .references(() => category.id, { onDelete: "restrict" })
      .notNull(),
    createdAt: timestamp("created_at", { precision: 2 }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { precision: 2, mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("products_name_idx").on(table.name),
    index("products_slug_idx").on(table.slug),
    index("products_category_id_idx").on(table.categoryId)
  ]
)

/**
 * Relations:
 * - `category`: Many-to-one relationship, linking each product to a specific category (e.g., Pizza, Drinks).
 * - `productsIngredients`: Many-to-many relationship with `ingredients`, specifying the ingredients included in the product (both base and optional extra ingredients).
 * - `productsSizesTypes`: Many-to-many relationship with `sizes` and `types`, allowing querying for specific size and type pricing for each product.
 */
export const productRelations = relations(product, ({ one, many }) => ({
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id]
  }),
  productsIngredients: many(productIngredient),
  productsSizesTypes: many(productSizeType)
}))
