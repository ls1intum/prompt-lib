import { MoreHorizontal } from 'lucide-react'
import type { ReactElement } from 'react'
import { Button } from '@/components/ui'
import { ActionsMenu } from '../actions/ActionsMenu'
import type { RowAction, WithId } from '../PromptTableTypes'
import type { PromptTableInstance } from '../tableFeatures'

interface TableActionsButtonProps<TData extends WithId> {
  actions: RowAction<TData>[]
  table: PromptTableInstance<TData>
}

export function TableActionsButton<TData extends WithId>({
  actions,
  table,
}: TableActionsButtonProps<TData>): ReactElement {
  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
  const selectedCount = selectedRows.length
  return (
    <ActionsMenu
      actions={actions}
      selectedRows={selectedRows}
      triggerComponent={
        <Button disabled={selectedCount === 0}>
          <MoreHorizontal className='h-4 w-4' />
          <span className='hidden sm:inline'>Actions</span>
        </Button>
      }
    />
  )
}
