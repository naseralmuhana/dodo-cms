import { relations } from "drizzle-orm"
import {
  decimal,
  integer,
  pgTable,
  primaryKey,
  text
} from "drizzle-orm/pg-core"

import { product } from "@/db/schema/product/schema"
import { size } from "@/db/schema/size/schema"
import { type } from "@/db/schema/type/schema"

/**
 * Products Sizes Types Table
 * Represents the relationship between products, their sizes, and types,
 * with associated pricing and image URL for each combination of product, size, and type.
 *
 * This table allows a product to have different prices based on its size and type,
 * with an image URL specific to the combination of product, size, and type.
 *
 * Fields:
 * - `productId`: References the `id` of the product in the `products` table.
 * - `sizeId`: References the `id` of the size in the `sizes` table.
 * - `typeId`: References the `id` of the type in the `types` table.
 * - `price`: The price of the product for this specific size and type combination.
 * - `imageUrl`: The URL of the image associated with this specific size and type of the product.
 *
 * This table is essential for pricing and displaying different product variations
 * based on size and type, with an image URL tailored to each variation.
 */

export const productSizeType = pgTable(
  "products_sizes_types",
  {
    productId: integer("product_id")
      .references(() => product.id, { onDelete: "cascade" })
      .notNull(),
    sizeId: integer("size_id")
      .references(() => size.id, { onDelete: "cascade" })
      .notNull(),
    typeId: integer("type_id")
      .references(() => type.id, { onDelete: "cascade" })
      .notNull(),
    price: decimal("price", { precision: 5, scale: 2 }).notNull(),
    imageUrl: text("image_url").notNull()
  },
  (table) => [
    primaryKey({ columns: [table.productId, table.sizeId, table.typeId] })
  ]
)

/**
 * Relations:
 * - `product`: Many-to-one relationship, linking each size/type pricing to a specific product.
 * - `size`: Many-to-one relationship, linking each size/type pricing to a specific size.
 * - `type`: Many-to-one relationship, linking each size/type pricing to a specific type.
 */
export const productSizeTypeRelations = relations(
  productSizeType,
  ({ one }) => ({
    product: one(product, {
      fields: [productSizeType.productId],
      references: [product.id]
    }),
    size: one(size, {
      fields: [productSizeType.sizeId],
      references: [size.id]
    }),
    type: one(type, {
      fields: [productSizeType.typeId],
      references: [type.id]
    })
  })
)
