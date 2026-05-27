'use client'

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

type AnchorLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: string
}

export const AnchorLink: React.FC<AnchorLinkProps> = ({
  href,
  onClick,
  className,
  children,
  ...rest
}) => {
  const pathname = usePathname()
  const normalized = normalizeAnchorHref(href)
  const samePageAnchor = isSamePageAnchor(pathname, normalized)

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (samePageAnchor) {
      event.preventDefault()
      navigateToAnchor(normalized, getScrollBehavior())
    }

    onClick?.(event)
  }

  const anchorProps = {
    className: cn(className),
    href: normalized.href,
    onClick: handleClick,
    ...rest,
  }

  if (normalized.isExternal) {
    return <a {...anchorProps}>{children}</a>
  }

  return (
    <Link
      {...anchorProps}
      scroll={normalized.hash ? false : undefined}
    >
      {children}
    </Link>
  )
}
