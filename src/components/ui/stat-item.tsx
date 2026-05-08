import React from 'react'
import { cn } from '@/utilities/ui'

export interface StatItemProps {
  label: string
  value: string
  suffix?: string
  className?: string
}

export function StatItem({ label, value, suffix, className }: StatItemProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="font-jetbrains text-[12px] uppercase tracking-[0.2em] text-cream-dim">
        {label}
      </div>
      <div className="text-[38px] font-bold leading-none mt-1 text-cream">
        {value}
        {suffix && (
          <span className="text-orange text-lg ml-1 font-semibold">{suffix}</span>
        )}
      </div>
    </div>
  )
}
