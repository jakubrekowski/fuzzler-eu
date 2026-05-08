import React from 'react'
import { cn } from '@/utilities/ui'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'green' | 'orange' | 'white'
  dot?: boolean
}

export function Badge({ className, variant = 'default', dot, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-white/5 border-white/10 text-cream-dim',
    outline: 'border-white/10 bg-transparent text-cream',
    green: 'bg-green text-graphite-dark shadow-[0_6px_0_0_rgba(0,0,0,0.25)]',
    orange: 'bg-orange text-graphite-dark shadow-[0_6px_0_0_rgba(0,0,0,0.25)]',
    white: 'bg-cream text-graphite-dark shadow-[0_6px_0_0_rgba(0,0,0,0.25)]',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 px-3.5 py-1.5 border rounded-full text-[13px] uppercase tracking-[0.16em] font-bold transition-all',
        variants[variant],
        className,
      )}
      {...props}
    >
      {dot && variant === 'default' && (
        <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_0_4px_rgba(121,230,156,0.18)]" />
      )}
      {props.children}
    </div>
  )
}
