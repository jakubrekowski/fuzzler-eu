import React from 'react'
import { cn } from '@/utilities/ui'

export const HIGHLIGHT_REGEX = /(\[\[.*?\]\])/g

export function isHighlightedPart(part: string): boolean {
  return part.startsWith('[[') && part.endsWith(']]')
}

export function parseHighlightedText(
  text: string,
  highlightClassName = 'text-orange',
): React.ReactNode[] {
  if (!text) return []

  const parts = text.split(HIGHLIGHT_REGEX)

  return parts.map((part, i) => {
    if (isHighlightedPart(part)) {
      return (
        <span key={i} className={highlightClassName}>
          {part.slice(2, -2)}
        </span>
      )
    }
    return part
  })
}

type HighlightedTextProps = {
  children?: string | null
  className?: string
  highlightClassName?: string
  as?: 'span' | 'p' | 'fragment'
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  children,
  className,
  highlightClassName,
  as = 'fragment',
}) => {
  if (!children) return null

  const content = parseHighlightedText(children, highlightClassName)

  if (as === 'fragment') {
    return <>{content}</>
  }

  const Tag = as
  return <Tag className={className}>{content}</Tag>
}
