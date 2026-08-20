import type React from 'react'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

export interface CombinableQuery {
  isPending: boolean
  isError: boolean
  isFetching: boolean
  isEnabled: boolean
  error?: unknown
  refetch: () => void
}

export interface CombinedQueryState {
  isPending: boolean
  isError: boolean
  isFetching: boolean
  error?: unknown
  refetch: () => void
}

export const combineQueryStates = (queries: CombinableQuery[]): CombinedQueryState => {
  const active = queries.filter((query) => query.isEnabled)

  return {
    isPending: active.some((query) => query.isPending),
    isError: active.some((query) => query.isError),
    isFetching: active.some((query) => query.isFetching),
    error: active.find((query) => query.isError)?.error,
    refetch: () => {
      for (const query of active) {
        query.refetch()
      }
    },
  }
}

const errorMessage = (error: unknown): string | undefined =>
  error instanceof Error ? error.message : undefined

interface QueryGateProps {
  queries: CombinableQuery[]
  children: React.ReactNode | (() => React.ReactNode)
  loadingFallback?: React.ReactNode
  errorFallback?: (state: CombinedQueryState) => React.ReactNode
}

export const QueryGate = ({
  queries,
  children,
  loadingFallback,
  errorFallback,
}: QueryGateProps): React.JSX.Element => {
  const state = combineQueryStates(queries)

  if (state.isError) {
    return (
      <>
        {errorFallback ? (
          errorFallback(state)
        ) : (
          <ErrorPage
            description={errorMessage(state.error)}
            onRetry={state.refetch}
            isRetrying={state.isFetching}
          />
        )}
      </>
    )
  }

  if (state.isPending) {
    return <>{loadingFallback === undefined ? <LoadingPage /> : loadingFallback}</>
  }

  return <>{typeof children === 'function' ? children() : children}</>
}
