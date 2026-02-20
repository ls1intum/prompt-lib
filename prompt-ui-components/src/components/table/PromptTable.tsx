import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ReactElement, useEffect, useState } from 'react'
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
  initialState,
  sortingQueryParam,
}: TableProps<T>): ReactElement {
  const sortingQueryParamEnabled = sortingQueryParam ? (sortingQueryParam.enabled ?? true) : false
  const sortingQueryParamName = sortingQueryParam?.paramName

  const [sorting, setSorting] = useState<SortingState>(() => {
    if (!sortingQueryParamEnabled || !sortingQueryParamName || typeof window === 'undefined') {
      return initialState?.sorting ?? []
    }

    const urlSorting = parseSortingFromUrl(window.location.search, sortingQueryParamName)
    return urlSorting.length > 0 ? urlSorting : (initialState?.sorting ?? [])
  })
  const [search, setSearch] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const baseColumns = columns ?? generateColumns(data)

  const columnsWithFilterFns = addFiltersToColumns(baseColumns, filters)

  const cols: ColumnDef<T>[] = [
    checkboxColumn<T>(),
    ...columnsWithFilterFns,
    ...(actions ? [actionColumn<T>(actions)] : []),
  ]

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((currentSorting) =>
      typeof updaterOrValue === 'function' ? updaterOrValue(currentSorting) : updaterOrValue
    )
  }

  useEffect(() => {
    if (!sortingQueryParamEnabled || !sortingQueryParamName || typeof window === 'undefined') return

    const url = new URL(window.location.href)
    const serializedSorting = serializeSortingForUrl(sorting)

    if (serializedSorting) {
      url.searchParams.set(sortingQueryParamName, serializedSorting)
    } else {
      url.searchParams.delete(sortingQueryParamName)
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

    if (nextUrl !== currentUrl) {
      window.history.replaceState(window.history.state, '', nextUrl)
    }
  }, [sorting, sortingQueryParamEnabled, sortingQueryParamName])

  const table = useReactTable({
    data: data,
    columns: cols,
    state: {
      sorting,
      globalFilter: search,
      rowSelection,
    },
    initialState,
    onSortingChange: handleSortingChange,
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

function parseSortingFromUrl(search: string, paramName: string): SortingState {
  const serializedSorting = new URLSearchParams(search).get(paramName)
  if (!serializedSorting) return []

  return serializedSorting
    .split(',')
    .map((segment) => {
      const [encodedId, order = 'asc'] = segment.split(':')
      if (!encodedId) return null
      if (order !== 'asc' && order !== 'desc') return null

      let id: string
      try {
        id = decodeURIComponent(encodedId)
      } catch {
        return null
      }

      if (!id) return null

      return {
        id,
        desc: order === 'desc',
      }
    })
    .filter((entry): entry is SortingState[number] => entry !== null)
}

function serializeSortingForUrl(sorting: SortingState): string | null {
  if (sorting.length === 0) return null

  return sorting
    .map(({ id, desc }) => `${encodeURIComponent(id)}:${desc ? 'desc' : 'asc'}`)
    .join(',')
}
