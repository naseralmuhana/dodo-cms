"use client"

import { usePathname, useRouter } from "next/navigation"

import { Plus } from "lucide-react"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"

interface AppDataTableHeaderProps {
  title: string
  description?: string
  onActionClick?: () => void // Optional custom handler for the action button
  actionLabel?: string // Configurable label for the action
  showActionButton?: boolean // Option to toggle the button visibility
}

export function AppDataTableHeader({
  title,
  description,
  onActionClick,
  actionLabel = "Add",
  showActionButton = true
}: AppDataTableHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick()
    } else {
      router.push(`${pathname}/new`)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <Heading title={title} description={description} />
      {showActionButton && (
        <Button variant="secondary" onClick={handleActionClick}>
          <Plus />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
