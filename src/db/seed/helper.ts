import { InferInsertModel } from "drizzle-orm"
import { PgTable } from "drizzle-orm/pg-core"

import { DB } from "@/db"

/**
 * Type definition for the `seedTable` function, ensuring that the data being inserted
 * matches the expected structure of the table as inferred by Drizzle ORM.
 *
 * @template T - The type of the table being targeted.
 */
type SeedTableType<T extends PgTable> = {
  db: DB // Database instance for executing queries
  table: T // The table that we want to insert the data into
  data: InferInsertModel<T>[] // Type-safe data that matches the table's insert model
  tableName: string // The name of the table for logging purposes
}

/**
 * A function to insert data into a given table, ensuring that the data matches
 * the table's schema using TypeScript's type system to enforce the correct structure.
 *
 * @param db - The database instance used to perform the insertion.
 * @param table - The specific table to insert the data into.
 * @param data - The data to be inserted, ensuring it matches the inferred model for the table.
 * @param tableName - The name of the table, used for logging purposes.
 */
export const seedTable = async <T extends PgTable>({
  db,
  table,
  data,
  tableName
}: SeedTableType<T>): Promise<void> => {
  console.log(`\nStarting to seed ${tableName} table...`)

  try {
    // Insert the data into the table.
    // TypeScript ensures that the data matches the table structure, preventing accidental mistakes.
    await db.insert(table).values(data)
    console.log(`${tableName} table seeded successfully.\n`)
  } catch (error) {
    // In case of an error during insertion, log the error with the table name for easier debugging.
    console.error(`Failed to seed ${tableName} table. Error details:`, error)
  }
}

// Example Usage:
// Await this function to seed the 'category' table with the 'categories' data.
// await seedTable({
//   db,
//   table: category,
//   data: categories,
//   tableName: "category",
// });

/**
 * Utility function that formats the price field of the data to a string with two decimal places.
 * This function is useful for ensuring that price data is correctly formatted before insertion.
 *
 * @template T - The type of the data being processed, which must include a `price` field of type `number`.
 * @param data - The array of data items that contain the price field.
 * @returns The modified data array with the price formatted as a string.
 */
export const stringifyPrice = <T extends { price: number }>(data: T[]) => {
  return data.map((item) => ({
    ...item, // Spread the original item properties
    price: item.price.toFixed(2) // Format the price field to two decimal places as a string
  }))
}
