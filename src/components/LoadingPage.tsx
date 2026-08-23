import { Loader2 } from 'lucide-react'
import type React from 'react'

export const LoadingPage = (): React.JSX.Element => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <Loader2 className='h-12 w-12 animate-spin text-primary' />
    </div>
  )
}
