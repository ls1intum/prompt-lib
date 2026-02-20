import { Column, ColumnDef, InitialTableState, Table } from '@tanstack/react-table'

export interface WithId {
  id: string
}

export interface RowAction<Type extends WithId> {
  label: string
  icon?: React.ReactNode
  onAction: (rows: Type[]) => void | Promise<void>
  confirm?: {
    title?: string
    description: string | ((count: number) => string)
    confirmLabel?: string
    variant?: 'default' | 'destructive'
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

export type TableFilter =
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
      render: (args: { column: Column<any, unknown>; table: Table<any> }) => React.ReactNode
    })

export interface TableProps<Type extends WithId> {
  data: Type[]
  actions?: RowAction<Type>[]
  columns?: ColumnDef<Type>[]
  filters?: TableFilter[]
  onRowClick?: (rowData: Type) => void
  initialState?: InitialTableState
  sortingQueryParam?: {
    enabled?: boolean
    paramName?: string
  }
}
