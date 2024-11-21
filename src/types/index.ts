import { icons, type LucideProps } from "lucide-react"

import type { DeleteCategory } from "@/features/categories/server/actions/delete-category"

export type IconType = {
  name: keyof typeof icons
  props?: LucideProps
}
export type DeleteActionType = DeleteCategory
