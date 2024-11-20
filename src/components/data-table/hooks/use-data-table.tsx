import {
  getCoreRowModel,
  TableOptions,
  useReactTable
} from "@tanstack/react-table"

interface useDataTableProps<TData>
  extends Omit<TableOptions<TData>, "state" | "getCoreRowModel"> {}

export function useDataTable<TData>({ ...props }: useDataTableProps<TData>) {
  const table = useReactTable({
    ...props,
    getCoreRowModel: getCoreRowModel()
  })

  return table
}
