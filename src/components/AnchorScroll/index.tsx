'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

function scrollToHash(hash: string, behavior: ScrollBehavior): boolean {
  if (!hash || hash === '#') return false

  const id = decodeURIComponent(hash.slice(1))
  const el = document.getElementById(id)
  if (!el) return false

  el.scrollIntoView({ behavior, block: 'start' })
  return true
}

function scrollToCurrentHash(behavior: ScrollBehavior, attempt = 0): void {
  const hash = window.location.hash
  if (!hash || hash === '#') return

  if (scrollToHash(hash, behavior) || attempt >= 30) return

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
