"use server"

import { redirect } from "next/navigation"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/db"
import { category } from "@/db/schema"
import { categorySchema } from "@/db/schema/category/validation"

import { actionClient } from "@/lib/safe-action"

import { getCategoryById } from "@/features/categories/server/db/get-category-by-id"
import { getCategoryBySlug } from "@/features/categories/server/db/get-category-by-slug"

export const editCategory = actionClient
  .schema(categorySchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { name, slug, id } }) => {
    if (!id) {
      throw Error("category id is required")
    }

    const isCategoryExists = await getCategoryById(id)
    if (!isCategoryExists) {
      throw new Error(`Category with id '${id}' does not exists.`)
    }

    const existingCategory = await getCategoryBySlug(slug)
    if (existingCategory) {
      throw new Error(`Category with name '${name}' already exists.`)
    }

    await db.update(category).set({ name, slug }).where(eq(category.id, id))

    redirect("/categories")
  })
