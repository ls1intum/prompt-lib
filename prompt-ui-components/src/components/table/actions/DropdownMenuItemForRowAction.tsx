import { ReactElement } from 'react'
import { DropdownMenuItem } from '@/components/ui'
import { RowAction, WithId } from '../TableTypes'

interface DropdownMenuItemForRowActionProps<Type extends WithId> {
  action: RowAction<Type>
  rows: Type[]
  onTrigger: (action: RowAction<Type>) => void
}

export function DropdownMenuItemForRowAction<Type extends WithId>({
  action,
  rows,
  onTrigger,
}: DropdownMenuItemForRowActionProps<Type>): ReactElement | null {
  const isHidden = action.hide?.(rows) ?? false
  const isDisabled = action.disabled?.(rows) ?? false

  if (isHidden) return null

  return (
    <DropdownMenuItem
      disabled={isDisabled}
      onSelect={(event) => {
        event.preventDefault()
        if (!isDisabled) {
          onTrigger(action)
        }
      }}
    >
      {action.icon}
      {action.label}
    </DropdownMenuItem>
  )
}
