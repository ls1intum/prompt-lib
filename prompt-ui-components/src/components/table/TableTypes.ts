import { Column, ColumnDef, Table } from '@tanstack/react-table'

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

export type TableFilter =
  | {
      type: 'select'
      id: string
      label: string
      options: string[]
      getDisplay?: (value: string) => React.ReactNode
    }
  | {
      type: 'numericRange'
      id: string
      label: string
      noValueLabel?: string
    }
  | {
      type: 'custom'
      id: string
      label: string
      render: (args: { column: Column<any, unknown>; table: Table<any> }) => React.ReactNode
    }

export interface TableProps<Type extends WithId> {
  data: Type[]
  actions?: RowAction<Type>[]
  columns?: ColumnDef<Type>[]
  filters?: TableFilter[]
  onRowClick?: (rowData: Type) => void
}
