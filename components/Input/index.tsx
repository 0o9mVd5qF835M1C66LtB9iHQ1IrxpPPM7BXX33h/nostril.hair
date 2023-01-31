import { ChangeEvent } from 'react'
import { BsSearch } from 'react-icons/bs'

interface Props {
  label?: string
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type: string
}

export default function Input({ label, name, onChange, placeholder, type }: Props) {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label || 'input'}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          className="w-full h-14 text-lg text-[#111111] dark:text-slate-200 focus:ring-2 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-[#0B7BC1] dark:focus:border-[#0B7BC1] dark:bg-[#222222] dark:placeholder-quicksilver"
          placeholder={placeholder}
        />
        {name === 'search' && (
          <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
            <BsSearch className="h-5 w-5 text-gray-500 dark:text-quicksilver" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}
