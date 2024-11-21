"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/db"
import { category } from "@/db/schema"
import { categorySchema } from "@/db/schema/category/validation"

import { actionClient } from "@/lib/safe-action"

export const deleteCategory = actionClient
  .schema(categorySchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .schema(async (schema) => schema.pick({ id: true }))
  .action(async ({ parsedInput: { id } }) => {
    if (id) await db.delete(category).where(eq(category.id, id))
  })

export type DeleteCategory = typeof deleteCategory
