"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/data-table"
import { useDataTable } from "@/components/data-table/hooks/use-data-table"

interface AppDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function AppDataTable<TData, TValue>({
  columns,
  data
}: AppDataTableProps<TData, TValue>) {
  const table = useDataTable({ columns, data })
  return <DataTable table={table}></DataTable>
}
