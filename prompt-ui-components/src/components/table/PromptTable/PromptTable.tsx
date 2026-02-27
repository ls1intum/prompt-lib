import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ReactElement, useState } from 'react'
import { Table } from '../../ui'
import { checkboxColumn } from './columns/columnDefs/selectColumn'
import { actionColumn } from './columns/columnDefs/actionColumn'
import { TableSearch } from './tableBarComponents/TableSearch'
import { TableActionsButton } from './tableBarComponents/TableActionsButton'
import { TableInfoText } from './tableBarComponents/TableInfoText'
import { TableHeaders } from './tableComponents/TableHeaders'
import { TableRows } from './tableComponents/TableRows'
import { WithId } from './PromptTableTypes'
import { TableColumnVisibilityButton } from './tableBarComponents/TableColumnVisibilityButton'
import { generateColumns } from './columns/generateColumns'
import { TableFiltersMenu } from './filters/TableFiltersMenu'
import { ActiveTableFiltersBar } from './filters/ActiveTableFiltersBar'
import { addFiltersToColumns } from './filters/applyFiltersToColumns'
import { TableProps } from './PromptTableTypes'

export function PromptTable<T extends WithId>({
  data,
  actions,
  columns,
  filters,
  onRowClick,
  initialState,
  onSortingChange,
  onSearchChange,
  onColumnFiltersChange,
}: TableProps<T>): ReactElement {
  const [sorting, setSorting] = useState<SortingState>(initialState?.sorting ?? [])
  const [search, setSearch] = useState<string>(
    typeof initialState?.globalFilter === 'string' ? initialState.globalFilter : '',
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState?.columnFilters ?? [],
  )
  const [rowSelection, setRowSelection] = useState({})

  const baseColumns = columns ?? generateColumns(data)
  const columnsWithFilterFns = addFiltersToColumns(baseColumns, filters)
  const cols: ColumnDef<T>[] = [
    checkboxColumn<T>(),
    ...columnsWithFilterFns,
    ...(actions ? [actionColumn<T>(actions)] : []),
  ]

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((current) => {
      const next = typeof updaterOrValue === 'function' ? updaterOrValue(current) : updaterOrValue
      onSortingChange?.(next)
      return next
    })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange?.(value)
  }

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (updaterOrValue) => {
    setColumnFilters((current) => {
      const next = typeof updaterOrValue === 'function' ? updaterOrValue(current) : updaterOrValue
      onColumnFiltersChange?.(next)
      return next
    })
  }

  const table = useReactTable({
    data: data,
    columns: cols,
    state: {
      sorting,
      globalFilter: search,
      columnFilters,
      rowSelection,
    },
    initialState,
    onSortingChange: handleSortingChange,
    onGlobalFilterChange: handleSearchChange,
    onColumnFiltersChange: handleColumnFiltersChange,
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
        <TableSearch value={search} onChange={(e) => handleSearchChange(e.target.value)} />
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
