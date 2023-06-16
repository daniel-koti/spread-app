import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  description: string
  label: string
  placeholder?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ description, label, placeholder, ...props }, ref) => {
    return (
      <label
        htmlFor={description}
        className="block bg-white overflow-hidden rounded-[10px] border border-gray-200 px-4 py-3 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500"
      >
        <span className="text-xs font-medium text-gray-700">{label}</span>

        <input
          id={description}
          placeholder={placeholder}
          className="mt-1 w-full bg-white border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          ref={ref}
          {...props}
        />
      </label>
    )
  },
)

Input.displayName = ''
