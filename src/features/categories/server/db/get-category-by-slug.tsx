import { db } from "@/db"

import { type SelectCategorySchema } from "@/db/schema/category/validation"

/**
 * Retrieves a category from the database based on its slug.
 *
 * @param {string} slug The slug of the category to retrieve.
 * @returns {Promise<SelectCategorySchema | null>} A promise that resolves to the
 *          category if found, or null if no category is found. If an error
 *          occurs, the promise will reject with an Error instance.
 */
export const getCategoryBySlug = async (
  slug: string
): Promise<
  Omit<SelectCategorySchema, "createdAt" | "updatedAt"> | undefined
> => {
  try {
    const category = await db.query.category.findFirst({
      columns: {
        createdAt: false,
        updatedAt: false
      },
      where: (categories, { eq }) => eq(categories.slug, slug)
    })

    if (!category) {
      console.warn(`getCategory: No category found for slug '${slug}'.`)
    }

    return category
  } catch (error) {
    console.error(
      "getCategoryBySlug: Error occurred while fetching category",
      error
    )
    throw new Error(
      "An error occurred while fetching the category. Please try again later."
    )
  }
}
