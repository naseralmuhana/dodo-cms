import { Suspense } from "react"

import { AppDataTableHeader } from "@/components/app-data-table/app-data-table-header"

import { CategoriesPageContainer } from "@/features/categories/components/categories-page-container"

export default function CategoriesPage() {
  return (
    <>
      <AppDataTableHeader
        title="Categories"
        description="Manage and organize your categories"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <CategoriesPageContainer />
      </Suspense>
    </>
  )
}
