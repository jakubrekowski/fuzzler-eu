import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-24 w-full rounded-xl border border-white/[0.12] bg-graphite px-4 py-3 text-[15px] text-cream placeholder:text-cream-dim/50 font-rajdhani transition-colors duration-200 focus-visible:outline-none focus-visible:border-orange/60 focus-visible:ring-2 focus-visible:ring-orange/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red/60 resize-none',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
