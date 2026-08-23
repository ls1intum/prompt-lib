import type { RowData } from '@tanstack/react-table'
import { Filter } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui'
import type { TableFilter } from '../PromptTableTypes'
import type { PromptTableInstance } from '../tableFeatures'
import { NumericRangeFilterSection } from './NumericRangeFilterSection'
import { SelectFilterSection } from './SelectFilterSection'

interface TableFiltersMenuProps<TData extends RowData> {
  table: PromptTableInstance<TData>
  filters: TableFilter<TData>[]
  trigger?: ReactNode
}

export function TableFiltersMenu<TData extends RowData>({
  table,
  filters,
  trigger,
}: TableFiltersMenuProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button variant='outline' className='justify-start'>
            <Filter className='h-4 w-4' />
            <span className='hidden sm:inline'>Filter</span>
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-64 max-h-[60vh] overflow-y-auto'>
        {filters.map((filter) => {
          const column = table.getColumn(filter.id)
          if (!column) return null

          if (filter.type === 'select') {
            return (
              <SelectFilterSection
                key={filter.id}
                label={filter.label}
                column={column}
                options={filter.options}
                getDisplay={filter.optionLabel}
              />
            )
          }

          if (filter.type === 'numericRange') {
            return (
              <NumericRangeFilterSection
                key={filter.id}
                label={filter.label}
                column={column}
                noValueLabel={filter.noValueLabel}
              />
            )
          }

          return <div key={filter.id}>{filter.render({ column, table })}</div>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
