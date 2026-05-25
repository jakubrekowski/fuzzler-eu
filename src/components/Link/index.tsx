import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { HighlightedText } from '@/components/HighlightedText'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href && appearance !== 'disabled') return null

  const rawHref = href || url || ''
  // Hash-only anchors (e.g. #cennik) target the home page; use /#cennik for cross-route navigation.
  const resolvedHref =
    rawHref.startsWith('#') && rawHref.length > 1 ? `/${rawHref}` : rawHref
  const hasInPageHash = resolvedHref.includes('#')
  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const linkContent = (
    <>
      {label && <HighlightedText>{label}</HighlightedText>}
      {children && children}
    </>
  )

  const linkProps = {
    href: resolvedHref,
    ...(hasInPageHash ? { scroll: false as const } : {}),
    ...newTabProps,
  }

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} {...linkProps}>
        {linkContent}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link
        className={cn(className, appearance === 'disabled' && 'pointer-events-none')}
        {...linkProps}
      >
        {linkContent}
      </Link>
    </Button>
  )
}
