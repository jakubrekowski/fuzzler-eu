import React from 'react'
import type { Category } from '@/payload-types'
import { cn } from '@/utilities/ui'
import {
  getCategoryBadgeStyles,
  hexToRgba,
  resolveCategoryBadgeColor,
} from '@/utilities/categoryBadge'

type CategoryBadgeVariant = 'solid' | 'pill' | 'outline'

type CategoryBadgeProps = {
  category?: Category | null
  label?: string
  variant?: CategoryBadgeVariant
  className?: string
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  label,
  variant = 'solid',
  className,
}) => {
  const title = label ?? category?.title
  if (!title) return null

  const color = resolveCategoryBadgeColor(category)
  const { background, foreground } = getCategoryBadgeStyles(color)

  if (variant === 'pill') {
    return (
      <span
        className={cn(
          'inline-flex items-center px-4 py-1.5 rounded-full font-mono text-[12px] tracking-[0.2em] uppercase',
          className,
        )}
        style={{
          backgroundColor: hexToRgba(background, 0.15),
          color: background,
        }}
      >
        {title}
      </span>
    )
  }

  if (variant === 'outline') {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2.5 py-1.5 rounded-full border font-mono text-[11px] tracking-[0.14em] uppercase transition-colors',
          className,
        )}
        style={{
          borderColor: background,
          color: background,
        }}
      >
        #{title}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold uppercase tracking-[0.14em] z-10',
        className,
      )}
      style={{
        backgroundColor: background,
        color: foreground,
      }}
    >
      {title}
    </span>
  )
}
