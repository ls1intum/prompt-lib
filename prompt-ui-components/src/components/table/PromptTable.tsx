import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ReactElement, useState } from 'react'
import { Table } from '../ui'
import { checkboxColumn } from './columnDefs/selectColumn'
import { actionColumn } from './columnDefs/actionColumn'
import { TableSearch } from './tableBarComponents/TableSearch'
import { TableActionsButton } from './tableBarComponents/TableActionsButton'
import { TableInfoText } from './tableBarComponents/TableInfoText'
import { TableHeaders } from './tableComponents/TableHeaders'
import { TableRows } from './tableComponents/TableRows'
import { TableProps, WithId } from './TableTypes'
import { TableColumnVisibilityButton } from './tableBarComponents/TableColumnVisibilityButton'
import { generateColumns } from './generateColumns'
import { TableFiltersMenu } from './filters/TableFiltersMenu'
import { ActiveTableFiltersBar } from './filters/ActiveTableFiltersBar'
import { addFiltersToColumns } from './filters/applyFiltersToColumns'

export function PromptTable<T extends WithId>({
  data,
  actions,
  columns,
  filters,
  onRowClick,
}: TableProps<T>): ReactElement {
  const [sorting, setSorting] = useState<SortingState>([])
  const [search, setSearch] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const baseColumns = columns ?? generateColumns(data)

  const columnsWithFilterFns = addFiltersToColumns(baseColumns, filters)

  const cols: ColumnDef<T>[] = [
    checkboxColumn<T>(),
    ...columnsWithFilterFns,
    ...(actions ? [actionColumn<T>(actions)] : []),
  ]

  const table = useReactTable({
    data: data,
    columns: cols,
    state: {
      sorting,
      globalFilter: search,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row) => row.id!,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex items-center justify-between gap-3 flex-wrap'>
        <TableSearch value={search} onChange={(e) => setSearch(e.target.value)} />
        {filters && <TableFiltersMenu table={table} filters={filters} />}
        <TableColumnVisibilityButton table={table} />
        {actions && <TableActionsButton table={table} actions={actions} />}
      </div>

      <ActiveTableFiltersBar table={table} filters={filters} />

      <TableInfoText table={table} />

      <div className='rounded-md border overflow-x-auto w-full'>
        <Table className='table-auto w-full relative'>
          <TableHeaders table={table} />
          <TableRows table={table} onRowClick={onRowClick} />
        </Table>
      </div>
    </div>
  )
}
