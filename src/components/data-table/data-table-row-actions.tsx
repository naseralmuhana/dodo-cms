"use client"

import { useState } from "react"

import { usePathname, useRouter } from "next/navigation"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

import { DeleteActionType } from "@/types"

import { TOAST_MESSAGES } from "@/constants/toast-messages"

import { useIsMobile } from "@/hooks/use-mobile"

import { IconButton } from "@/components/icon-button"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

type RowExtends = {
  slug: string
  id: number
  name: string
}

interface DataTableRowActionsProps<TData extends RowExtends> {
  row: Row<TData>
  deleteAction: DeleteActionType
}

export function DataTableRowActions<TData extends RowExtends>({
  row,
  deleteAction
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()

  const isMobile = useIsMobile()

  const { name, slug, id } = row.original

  const { execute } = useAction(deleteAction, {
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.DELETE.success(name))
      router.refresh()
    },
    onError: () => {
      toast.error(TOAST_MESSAGES.DELETE.error(name))
    }
  })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleEdit = () => router.push(`${pathname}/${slug}`)
  const handleDelete = () => setDeleteDialogOpen(true)
  const handleConfirmDelete = () => execute({ id })

  if (isMobile) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ResponsiveDialog
          hideTrigger
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
        />
      </>
    )
  }

  return (
    <div className="hidden items-center gap-x-1 sm:flex">
      <IconButton
        tooltipContent="edit"
        icon={{ name: "Pencil" }}
        className="text-info"
        onClick={handleEdit}
      />
      <ResponsiveDialog
        trigger={
          <IconButton
            tooltipContent="delete"
            icon={{ name: "Trash2" }}
            className="text-destructive"
          />
        }
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
