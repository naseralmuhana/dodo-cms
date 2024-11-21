import { AppDataTable } from "@/components/app-data-table"

import { columns } from "@/features/categories/lib/columns"
import { getCategories } from "@/features/categories/server/db/get-categories"

export async function CategoriesPageContainer() {
  const categories = await getCategories()

  return <AppDataTable columns={columns} data={categories || []} />
}
