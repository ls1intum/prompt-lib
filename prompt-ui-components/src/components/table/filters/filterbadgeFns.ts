import { TableFilter } from '../TableTypes'

interface minMaxFilterType {
  noScore: boolean
  min: string
  max: string
}

export function displaySelectActiveFilterBadgeValue(filtervalue: unknown) {
  return `${filtervalue}`
}

export function displayMinMaxActiveFilterBadgeValue(filtervalue: unknown) {
  const v = filtervalue as minMaxFilterType
  if (v.noScore) {
    return 'None'
  }
  if (v.min && v.max) {
    return `${v.min} - ${v.max}`
  }
  if (v.min) {
    return '≥ ' + v.min
  }
  if (v.max) {
    return '≤ ' + v.max
  }
  return ''
}

export function tableFilterTypeDisplayFunction(tableFilter: TableFilter) {
  if (tableFilter.badge) {
    return tableFilter.badge.displayValue
  }
  if (tableFilter.type == 'numericRange') {
    return displayMinMaxActiveFilterBadgeValue
  }
  return displaySelectActiveFilterBadgeValue
}
