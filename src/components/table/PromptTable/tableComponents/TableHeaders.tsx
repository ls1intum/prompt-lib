import { flexRender, type RowData } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import { TableHead, TableHeader, TableRow } from '../../../ui'
import type { PromptTableHeader, PromptTableInstance } from '../tableFeatures'
import { SortableHeader } from './SortableHeader'

interface TableHeadersProps<TData extends RowData> {
  table: PromptTableInstance<TData>
}

export function TableHeaders<TData extends RowData>({
  table,
}: TableHeadersProps<TData>): ReactElement {
  return (
    <TableHeader className='bg-muted/100'>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} className='whitespace-nowrap'>
              {renderHeaderCell(header)}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}

function renderHeaderCell<TData extends RowData>(header: PromptTableHeader<TData>) {
  if (header.isPlaceholder) return null

  const def = header.column.columnDef.header

  if (header.column.getCanSort() && typeof def === 'string') {
    return <SortableHeader column={header.column} title={def} />
  }

  return flexRender(def, header.getContext())
}
