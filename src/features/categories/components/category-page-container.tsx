import { CategoryForm } from "@/features/categories/components/category-form"
import { getCategoryBySlug } from "@/features/categories/server/db/get-category-by-slug"

interface CategoryPageContainerProps {
  slug: string
}

export async function CategoryPageContainer({
  slug
}: CategoryPageContainerProps) {
  const category = await getCategoryBySlug(slug)

  const defaultValues = {
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    id: category?.id ?? undefined
  }
  const isEditing = !!category

  return <CategoryForm defaultValues={defaultValues} isEditing={isEditing} />
}
