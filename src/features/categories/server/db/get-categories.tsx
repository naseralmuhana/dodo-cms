import { db } from "@/db"

import { type SelectCategorySchema } from "@/db/schema/category/validation"

/**
 * Retrieves all categories from the database.
 *
 * @returns {Promise<SelectCategorySchema[] | null>}
 *          A promise that resolves to an array of categories if successful,
 *          or null if an error occurs.
 */
export const getCategories = async (): Promise<SelectCategorySchema[]> => {
  try {
    // Fetch categories from the database
    const categories = await db.query.category.findMany({
      orderBy: (categories, { desc }) => desc(categories.updatedAt)
    })

    return categories
  } catch (error) {
    console.error(
      "getCategories: Error occurred while fetching categories",
      error
    )

    throw new Error(
      "An error occurred while fetching the categories. Please try again later."
    )
  }
}
