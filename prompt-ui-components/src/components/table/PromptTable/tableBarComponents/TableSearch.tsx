import { Input } from '@/components/ui'
import { SearchIcon } from 'lucide-react'
import { ReactElement, ChangeEvent } from 'react'

interface TableSearchProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function TableSearch({ value, onChange }: TableSearchProps): ReactElement {
  return (
    <div className='relative flex-1 min-w-0 overflow-hidden'>
      <Input
        placeholder='Search ...'
        value={value}
        onChange={onChange}
        className='pl-10 w-full min-w-0'
      />
      <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500' />
    </div>
  )
}
