"use client"

import { ChangeEventHandler, useState } from "react"

import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  categorySchema,
  type CategorySchema
} from "@/db/schema/category/validation"

import { getFormTitleAndDescription } from "@/lib/get-form-title-description"
import { slugify } from "@/lib/slugify"

import { TOAST_MESSAGES } from "@/constants/toast-messages"

import { DisplayServerActionError } from "@/components/display-server-action-errors"
import { FormHeader } from "@/components/form-header"
import { SubmittingButton } from "@/components/submitting-button"
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

import { addCategory } from "@/features/categories/server/actions/add-category"
import { deleteCategory } from "@/features/categories/server/actions/delete-category"
import { editCategory } from "@/features/categories/server/actions/edit-category"

type handleChangeType = ChangeEventHandler<HTMLInputElement> | undefined

interface CategoryFormProps {
  defaultValues: CategorySchema
  isEditing: boolean
}

export function CategoryForm({ defaultValues, isEditing }: CategoryFormProps) {
  const router = useRouter()
  const [errors, setErrors] = useState({})

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues
  })

  const { execute, isExecuting } = useAction(
    isEditing ? editCategory : addCategory,
    {
      onSuccess: ({ input }) => {
        const message = isEditing
          ? TOAST_MESSAGES.UPDATE.success(input.name)
          : TOAST_MESSAGES.CREATE.success(input.name)
        toast.success(message)
      },
      onError: ({ input, error }) => {
        const message = isEditing
          ? TOAST_MESSAGES.UPDATE.error(input.name)
          : TOAST_MESSAGES.CREATE.error(input.name)
        toast.error(message)
        setErrors(error)
      }
    }
  )

  const { execute: executeDelete } = useAction(deleteCategory, {
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.DELETE.success("This category"))
      router.replace("/categories")
      router.refresh()
    },
    onError: ({ error }) => {
      toast.error(TOAST_MESSAGES.DELETE.error("this category"))
      setErrors(error)
    }
  })

  function onSubmit(values: CategorySchema) {
    execute(values)
  }

  const onDelete = () => {
    executeDelete({ id: defaultValues.id })
  }

  const { title, description } = getFormTitleAndDescription({
    isEditing,
    entityName: "category",
    entityValue: defaultValues?.name
  })

  return (
    <>
      <FormHeader
        isEditing={isEditing}
        title={title}
        description={description}
        onDelete={onDelete}
      />
      <DisplayServerActionError errors={errors} />
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
                      disabled={isExecuting}
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
          <SubmittingButton
            label={isEditing ? "Save Changes" : "Create"}
            isLoading={isExecuting}
          />
        </form>
      </Form>
    </>
  )
}
