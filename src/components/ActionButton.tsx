import React from 'react'
import { CMSLink } from '@/components/Link'
import { ButtonArrow } from '@/components/ui/button'

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
  size = 'default',
}) => {
  if (!link) return null

  const appearance =
    link.appearance === 'disabled'
      ? 'disabled'
      : link.appearance === 'outline'
        ? 'outline'
        : 'default'

  const isDisabled = appearance === 'disabled'

  return (
    <CMSLink
      {...link}
      appearance={appearance}
      size={size === 'lg' ? 'lg' : 'default'}
      className={className}
    >
      {showArrow && !isDisabled && <ButtonArrow />}
    </CMSLink>
  )
}
