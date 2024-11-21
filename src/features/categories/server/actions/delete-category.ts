"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/db"
import { category } from "@/db/schema"
import { categorySchema } from "@/db/schema/category/validation"

import { actionClient } from "@/lib/safe-action"

import { getCategoryById } from "@/features/categories/server/db/get-category-by-id"

export const deleteCategory = actionClient
  .schema(categorySchema)
  .schema(async (schema) => schema.pick({ id: true }), {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { id } }) => {
    if (!id) {
      throw Error("category id is required")
    }

    const isCategoryExists = await getCategoryById(id)
    if (!isCategoryExists) {
      throw new Error(`Category with id '${id}' does not exists.`)
    }

    await db.delete(category).where(eq(category.id, id))
  })

export type DeleteCategory = typeof deleteCategory
