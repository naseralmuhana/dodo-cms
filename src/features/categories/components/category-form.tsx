"use client"

import { ChangeEventHandler } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  categorySchema,
  type CategorySchema
} from "@/db/schema/category/validation"

import { slugify } from "@/lib/slugify"

import { SubmittingButton } from "@/components/shared/submitting-button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type handleChangeType = ChangeEventHandler<HTMLInputElement> | undefined

interface CategoryFormProps {
  defaultValues?: CategorySchema
  isEditing?: boolean
}

export function CategoryForm({ defaultValues, isEditing }: CategoryFormProps) {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues
  })

  function onSubmit(values: CategorySchema) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8 max-w-3xl"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            const handleChange: handleChangeType = (e) => {
              const generatedSlug = slugify(e.target.value)

              form.setValue("slug", generatedSlug)
              form.trigger("slug")

              field.onChange(e.target.value)
              form.trigger("name")
            }

            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    type="text"
                    {...field}
                    onChange={handleChange} // Use the custom handleChange
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="Slug"
                  type="text"
                  {...field}
                  disabled
                  readOnly // Keep it read-only to prevent manual edits
                />
              </FormControl>
              <FormDescription>
                Generated automatically based on the name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmittingButton label={isEditing ? "Save Changes" : "Create"} />
      </form>
    </Form>
  )
}
