import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-xl border border-white/[0.12] bg-graphite px-4 py-2 text-[15px] text-cream placeholder:text-cream-dim/50 font-rajdhani transition-colors duration-200 focus-visible:outline-none focus-visible:border-orange/60 focus-visible:ring-2 focus-visible:ring-orange/20 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red/60',
        className,
      )}
      type={type}
      {...props}
    />
  )
}

export { Input }
