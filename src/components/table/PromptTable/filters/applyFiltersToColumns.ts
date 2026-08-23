import type { RowData } from '@tanstack/react-table'
import type { TableFilter } from '../PromptTableTypes'
import type { PromptTableColumnDef } from '../tableFeatures'
import { multiSelectFilter, numericRangeFilter } from './filterFns'

function isAccessorKeyColumn<T extends RowData>(
  column: PromptTableColumnDef<T, any>,
): column is PromptTableColumnDef<T, any> & { accessorKey: string } {
  return 'accessorKey' in column
}

export function addFiltersToColumns<T extends RowData>(
  columns: PromptTableColumnDef<T, any>[],
  filters?: TableFilter<T>[],
): PromptTableColumnDef<T, any>[] {
  if (!filters?.length) return columns

  return columns.map((column) => {
    if (!isAccessorKeyColumn(column)) return column

    const filter = filters.find((f) => f.id === column.accessorKey)
    if (!filter) return column

    if (filter.type === 'select') {
      return { ...column, filterFn: multiSelectFilter }
    }

    if (filter.type === 'numericRange') {
      return { ...column, filterFn: numericRangeFilter }
    }

    return column
  })
}
