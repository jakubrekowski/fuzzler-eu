import React from 'react'
import { CMSLink } from '@/components/Link'
import { ButtonArrow } from '@/components/ui/button'

interface ActionButtonProps {
  link: any // CMS Link data
  className?: string
  showArrow?: boolean
  size?: 'default' | 'lg' | 'sm'
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  link,
  className,
  showArrow = true,
  size = 'default',
  onClick,
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
      size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'default'}
      className={className}
      onClick={onClick}
    >
      {showArrow && !isDisabled && <ButtonArrow />}
    </CMSLink>
  )
}
