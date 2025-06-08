import { ReactNode, ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
  size?: 'default' | 'icon'
  children: ReactNode
}

export function Button({ 
  className, 
  variant = 'default', 
  size = 'default',
  children,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-gray-900 text-white hover:bg-gray-800': variant === 'default',
          'bg-transparent hover:bg-gray-800': variant === 'ghost',
          'h-10 px-4 py-2': size === 'default',
          'h-10 w-10': size === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
