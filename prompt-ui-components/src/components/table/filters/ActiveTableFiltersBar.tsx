import { TableFilter } from '../TableTypes'
import { Table } from '@tanstack/react-table'
import { FilterBadge } from './FilterBadge'

interface ActiveTableFiltersBarProps {
  table: Table<any>
  filters?: TableFilter[]
}

export function ActiveTableFiltersBar({ table, filters = [] }: ActiveTableFiltersBarProps) {
  const { globalFilter, columnFilters } = table.getState()

  if (!globalFilter && columnFilters.length === 0) {
    return null
  }

  const filterMetaById: Record<string, TableFilter> = Object.fromEntries(
    filters.map((f) => [f.id, f]),
  )

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {typeof globalFilter === 'string' && globalFilter.length > 0 && (
        <FilterBadge
          label={`Search: "${globalFilter}"`}
          onRemove={() => table.setGlobalFilter('')}
        />
      )}

      {columnFilters.map((filter) => {
        const meta = filterMetaById[filter.id]
        const column = table.getColumn(filter.id)
        if (!meta || !column) return null

        const headerLabel =
          meta.label ??
          (typeof column.columnDef.header === 'string' ? column.columnDef.header : filter.id)

        if (meta.type === 'select') {
          if (!Array.isArray(filter.value)) return null

          const values = filter.value as string[]

          return values.map((value: string) => (
            <FilterBadge
              key={`${filter.id}-${value}`}
              label={`${headerLabel}: ${meta.getDisplay?.(value) ?? value}`}
              onRemove={() => {
                const next = values.filter((v: string) => v !== value)
                column.setFilterValue(next.length > 0 ? next : undefined)
              }}
            />
          ))
        }

        if (meta.type === 'numericRange') {
          if (typeof filter.value !== 'object' || filter.value === null) {
            return null
          }

          const value = filter.value as {
            min?: string
            max?: string
            noScore?: boolean
          }

          let text = ''
          if (value.noScore) text = meta.noValueLabel ?? 'No value'
          else if (value.min && value.max) text = `${value.min}–${value.max}`
          else if (value.min) text = `≥ ${value.min}`
          else if (value.max) text = `≤ ${value.max}`

          if (!text) return null

          return (
            <FilterBadge
              key={filter.id}
              label={`${headerLabel}: ${text}`}
              onRemove={() => column.setFilterValue(undefined)}
            />
          )
        }

        return null
      })}
    </div>
  )
}
