'use client'

import { getScrollBehavior, scrollToAnchorHash } from '@/utilities/anchorLink'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function scrollToCurrentHash(behavior: ScrollBehavior, attempt = 0): void {
  const hash = window.location.hash
  if (!hash || hash === '#') return

  if (scrollToAnchorHash(hash, behavior) || attempt >= 30) return

  requestAnimationFrame(() => scrollToCurrentHash(behavior, attempt + 1))
}

export const AnchorScroll: React.FC = () => {
  const pathname = usePathname()

  useEffect(() => {
    scrollToCurrentHash(getScrollBehavior())
  }, [pathname])

  useEffect(() => {
    const onHashChange = () => {
      scrollToCurrentHash(getScrollBehavior())
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return null
}
