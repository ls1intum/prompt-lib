import type { ColumnFiltersState, RowData, SortingState } from '@tanstack/react-table'
import type {
  PromptTableColumn,
  PromptTableColumnDef,
  PromptTableCore,
  PromptTableInitialState,
} from './tableFeatures'

export interface TableProps<T extends WithId> {
  data: T[]
  actions?: RowAction<T>[]
  columns?: PromptTableColumnDef<T, any>[]
  filters?: TableFilter<T>[]
  onRowClick?: (rowData: T) => void
  initialState?: PromptTableInitialState
  enableColumnVisibilityToggle?: boolean
  onSortingChange?: (sorting: SortingState) => void
  onSearchChange?: (search: string) => void
  onColumnFiltersChange?: (columnFilters: ColumnFiltersState) => void
  pageSize?: number
}

export interface WithId {
  id: string
}

export interface RowAction<Type extends WithId> {
  label: string
  icon?: React.ReactNode
  onAction: (rows: Type[], inputValue?: string) => void | Promise<void>
  confirm?: {
    title?: string
    description: string | ((count: number) => string)
    confirmLabel?: string
    variant?: 'default' | 'destructive'
    input?: {
      label: string
      placeholder?: string
      defaultValue?: string
    }
  }
  disabled?: (rows: Type[]) => boolean
  hide?: (rows: Type[]) => boolean
}

type TableFilterBase = {
  id: string
  label: string
  badge?: {
    label: string
    displayValue: (filtervalue: unknown) => string
  }
}

export type TableFilter<TData extends RowData = any> =
  | (TableFilterBase & {
      type: 'select'
      options: string[]
      optionLabel?: (value: string) => React.ReactNode
    })
  | (TableFilterBase & {
      type: 'numericRange'
      noValueLabel?: string
    })
  | (TableFilterBase & {
      type: 'custom'
      render: (args: {
        column: PromptTableColumn<TData>
        table: PromptTableCore<TData>
      }) => React.ReactNode
    })
