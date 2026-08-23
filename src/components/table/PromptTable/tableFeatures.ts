import {
  type Cell,
  type Column,
  type ColumnDef,
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  type Header,
  type ReactTable,
  type Row,
  type RowData,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns,
  type Table,
  type TableState,
  tableFeatures,
} from '@tanstack/react-table'

export const promptTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns,
  sortFns,
})

export type PromptTableFeatures = typeof promptTableFeatures

export type PromptTableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  PromptTableFeatures,
  TData,
  TValue
>
export type PromptTableColumn<TData extends RowData, TValue = unknown> = Column<
  PromptTableFeatures,
  TData,
  TValue
>
export type PromptTableCell<TData extends RowData, TValue = unknown> = Cell<
  PromptTableFeatures,
  TData,
  TValue
>
export type PromptTableHeader<TData extends RowData, TValue = unknown> = Header<
  PromptTableFeatures,
  TData,
  TValue
>
export type PromptTableRow<TData extends RowData> = Row<PromptTableFeatures, TData>
export type PromptTableCore<TData extends RowData> = Table<PromptTableFeatures, TData>
export type PromptTableInstance<TData extends RowData> = ReactTable<PromptTableFeatures, TData>
export type PromptTableInitialState = Partial<TableState<PromptTableFeatures>>
