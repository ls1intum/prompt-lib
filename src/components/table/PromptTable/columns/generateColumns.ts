import type { CellContext } from '@tanstack/react-table'
import type { PromptTableColumnDef, PromptTableFeatures } from '../tableFeatures'

function humanize(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (c) => c.toUpperCase())
}

export function generateColumns<T extends Record<string, any>>(
  data: T[],
): PromptTableColumnDef<T, any>[] {
  if (!data.length) return []

  return Object.keys(data[0] as object).map((key) => ({
    accessorKey: key,
    header: humanize(key),
    cell: (info: CellContext<PromptTableFeatures, T, any>) => {
      const value = info.getValue()
      return typeof value === 'object' ? JSON.stringify(value) : String(value)
    },
  }))
}
