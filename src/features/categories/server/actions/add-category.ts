"use server"

import { redirect } from "next/navigation"

import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/db"
import { category } from "@/db/schema"
import { categorySchema } from "@/db/schema/category/validation"

import { actionClient } from "@/lib/safe-action"

export const addCategory = actionClient
  .schema(categorySchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { name, slug } }) => {
    await db.insert(category).values({ name, slug })
    redirect("/categories")
  })
