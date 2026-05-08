import React from 'react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'

interface ActionButtonProps {
  link: any // CMS Link data
  className?: string
  showArrow?: boolean
  size?: 'default' | 'lg'
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  link, 
  className, 
  showArrow = true, 
  size = 'default'
}) => {
  if (!link) return null

  const isActuallyDisabled = link.appearance === 'disabled'

  return (
    <CMSLink
      {...link}
      className={cn(
        'rounded-full font-bold uppercase tracking-[0.08em] transition-all duration-300',
        size === 'lg' ? 'h-16 px-10 text-lg' : 'h-12 px-6 text-sm',
        (link.appearance === 'default' || link.appearance == null) &&
          'bg-orange text-graphite hover:bg-orange/90 hover:-translate-y-0.5 shadow-[0_6px_0_0_#B5641F,0_12px_32px_-8px_rgba(255,154,66,0.5)] active:translate-y-0.5 active:shadow-none',
        className
      )}
    >
      {(link.appearance === 'default' || link.appearance == null) && showArrow && !isActuallyDisabled && (
        <ArrowRight className="ml-2 w-4 h-4 -rotate-45" />
      )}
    </CMSLink>
  )
}
