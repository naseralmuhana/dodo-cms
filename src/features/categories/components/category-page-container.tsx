import { CategoryForm } from "@/features/categories/components/category-form"

import { getCategoryBySlug } from "../server/db/get-category-by-slug"

interface CategoryPageContainerProps {
  slug: string
}

export async function CategoryPageContainer({
  slug
}: CategoryPageContainerProps) {
  const category = await getCategoryBySlug(slug)
  return (
    <>
      <CategoryForm
        defaultValues={{
          name: category?.name ?? "",
          slug: category?.slug ?? "",
          id: category?.id
        }}
        isEditing={!!category}
      />
    </>
  )
}
