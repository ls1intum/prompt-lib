import { OnChangeFn } from '@tanstack/react-table'

export function createChangeHandler<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  externalOnChange?: (value: T) => void,
): OnChangeFn<T> {
  return (updaterOrValue) => {
    setState((current) => {
      const next =
        typeof updaterOrValue === 'function'
          ? (updaterOrValue as (old: T) => T)(current)
          : updaterOrValue

      externalOnChange?.(next)
      return next
    })
  }
}
