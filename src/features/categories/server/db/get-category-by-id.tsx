import { db } from "@/db"
import { type SelectCategorySchema } from "@/db/schema/category/validation"

/**
 * Retrieves a category from the database based on its id.
 *
 * @param {number} id The id of the category to retrieve.
 * @returns {Promise<SelectCategorySchema | null>} A promise that resolves to the
 *          category if found, or null if no category is found. If an error
 *          occurs, the promise will reject with an Error instance.
 */
export const getCategoryById = async (
  id: number
): Promise<
  Omit<SelectCategorySchema, "createdAt" | "updatedAt"> | undefined
> => {
  try {
    const category = await db.query.category.findFirst({
      columns: {
        createdAt: false,
        updatedAt: false
      },
      where: (categories, { eq }) => eq(categories.id, id)
    })

    if (!category) {
      console.warn(`getCategory: No category found for id '${id}'.`)
    }

    return category
  } catch (error) {
    console.error(
      "getCategoryById: Error occurred while fetching category",
      error
    )
    throw new Error(
      "An error occurred while fetching the category. Please try again later."
    )
  }
}
