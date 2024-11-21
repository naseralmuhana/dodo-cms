"use client"

import { useState } from "react"

import { usePathname, useRouter } from "next/navigation"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { ResponsiveDialog } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps<TData extends { slug: string }> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends { slug: string }>({
  row
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleEdit = () => router.push(`${pathname}/${row.original.slug}`)
  const handleDelete = () => setDeleteDialogOpen(true)

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
        onConfirm={() => {
          console.log("Deleting")
        }}
      />
    </>
  )
}
