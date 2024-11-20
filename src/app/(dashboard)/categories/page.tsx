import { Suspense } from "react"

import { CategoriesDataTable } from "@/features/categories/components/categories-data-table"

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesDataTable />
    </Suspense>
  )
}
