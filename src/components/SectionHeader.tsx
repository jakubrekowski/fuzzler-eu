import React from 'react'
import { cn } from '@/utilities/ui'

interface SectionHeaderProps {
  tagline?: string | null
  title: string
  description?: string | null
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ tagline, title, description, className }) => {
  const renderTitle = (text: string) => {
    if (!text) return null
    const parts = text.split(/(\[\[.*?\]\])/g)
    return parts.map((part, i) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        return (
          <span key={i} className="text-[#ff9000]">
            {part.slice(2, -2)}
          </span>
        )
      }
      return part
    })
  }

  return (
    <div className={cn("flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20", className)}>
      <div className="max-w-2xl">
        {tagline && (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff9000] mb-6">
            {tagline}
          </p>
        )}
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight font-rajdhani leading-[0.9]">
          {renderTitle(title)}
        </h2>
      </div>
      <div className="lg:max-w-md lg:mb-1">
        {description && (
          <p className="text-zinc-400 text-lg leading-relaxed lg:text-right">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
