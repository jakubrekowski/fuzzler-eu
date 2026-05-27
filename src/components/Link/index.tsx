'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import {
  getScrollBehavior,
  isSamePageAnchor,
  navigateToAnchor,
  normalizeAnchorHref,
} from '@/utilities/anchorLink'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { HighlightedText } from '@/components/HighlightedText'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
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
    onClick,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const pathname = usePathname()

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href && appearance !== 'disabled') return null

  const rawHref = href || url || ''
  const normalized = normalizeAnchorHref(rawHref)
  const { href: resolvedHref, hash } = normalized
  const hasInPageHash = Boolean(hash)
  const samePageAnchor = isSamePageAnchor(pathname, normalized)
  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const linkContent = (
    <>
      {label && <HighlightedText>{label}</HighlightedText>}
      {children && children}
    </>
  )

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (samePageAnchor && !newTab) {
      event.preventDefault()
      navigateToAnchor(normalized, getScrollBehavior())
    }

    onClick?.(event)
  }

  const linkProps = {
    href: resolvedHref,
    ...(hasInPageHash ? { scroll: false as const } : {}),
    ...newTabProps,
    onClick: handleClick,
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
