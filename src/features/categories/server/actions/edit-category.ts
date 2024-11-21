"use server"

import { redirect } from "next/navigation"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/db"
import { category } from "@/db/schema"
import { categorySchema } from "@/db/schema/category/validation"

import { actionClient } from "@/lib/safe-action"

export const editCategory = actionClient
  .schema(categorySchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { name, slug, id } }) => {
    if (id)
      await db.update(category).set({ name, slug }).where(eq(category.id, id))

    redirect("/categories")
  })
