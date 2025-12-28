import { Table as ReactTable } from '@tanstack/react-table'
import { ReactElement } from 'react'

interface TableInfoTextProps<TData> {
  table: ReactTable<TData>
}

export function TableInfoText<TData>({ table }: TableInfoTextProps<TData>): ReactElement {
  const selectedCount = table.getSelectedRowModel().rows.length

  return (
    <div className='flex gap-2 text-sm text-muted-foreground'>
      {selectedCount > 0 && <span className='text-foreground'>{selectedCount} selected</span>}
      <span>
        Showing {table.getFilteredRowModel().rows.length} of{' '}
        {table.getPrePaginationRowModel().rows.length} Rows
      </span>
    </div>
  )
}
