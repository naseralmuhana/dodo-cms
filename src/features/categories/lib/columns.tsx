"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { type SelectCategorySchema } from "@/db/schema/category/validation"

import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"

export const columns: ColumnDef<SelectCategorySchema>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "slug",
    header: "Slug"
  },
  {
    accessorKey: "createdAt",
    header: "Create At"
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At"
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
