import type { RowData } from '@tanstack/react-table'
import { DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui'
import type { PromptTableColumn } from '../tableFeatures'

interface SelectFilterSectionProps<TData extends RowData> {
  label: string
  column: PromptTableColumn<TData>
  options: string[]
  getDisplay?: (value: string) => React.ReactNode
}

export function SelectFilterSection<TData extends RowData>({
  label,
  column,
  options,
  getDisplay,
}: SelectFilterSectionProps<TData>) {
  const current = (column.getFilterValue() as string[]) ?? []

  return (
    <div>
      <DropdownMenuLabel>{label}</DropdownMenuLabel>
      <DropdownMenuSeparator />

      {options.map((value) => {
        const selected = current.includes(value)

        return (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selected}
            onSelect={(e) => {
              e.preventDefault()
              column.setFilterValue(
                selected ? current.filter((v) => v !== value) : [...current, value],
              )
            }}
          >
            {getDisplay?.(value) ?? value}
          </DropdownMenuCheckboxItem>
        )
      })}
    </div>
  )
}
