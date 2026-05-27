export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export function scrollToAnchorHash(hash: string, behavior: ScrollBehavior = getScrollBehavior()): boolean {
  if (!hash || hash === '#') return false

  const id = decodeURIComponent(hash.slice(1))
  const el = document.getElementById(id)
  if (!el) return false

  el.scrollIntoView({ behavior, block: 'start' })
  return true
}

export type NormalizedAnchorHref = {
  /** Path without hash, always starts with `/` */
  pathname: string
  /** Fragment including `#`, or null */
  hash: string | null
  /** Full path for Next.js `Link` */
  href: string
}

/**
 * Normalizes CMS / custom URLs into a single pathname + hash.
 * Fixes duplicated fragments like `/#far#far#far` or `#far#far`.
 */
export function normalizeAnchorHref(rawHref: string): NormalizedAnchorHref {
  const trimmed = rawHref.trim()

  if (!trimmed) {
    return { pathname: '/', hash: null, href: '/' }
  }

  let pathname = '/'
  let hash: string | null = null

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed)
      pathname = url.pathname || '/'
      hash = url.hash && url.hash.length > 1 ? `#${url.hash.slice(1).split('#')[0]?.split('?')[0] ?? ''}` : null
      if (hash === '#') hash = null
    } catch {
      pathname = '/'
    }
  } else {
    const hashIndex = trimmed.indexOf('#')

    if (hashIndex >= 0) {
      const pathPart = trimmed.slice(0, hashIndex)
      const fragment = trimmed.slice(hashIndex + 1)
      const id = fragment.split('#')[0]?.split('?')[0]?.trim() ?? ''
      hash = id ? `#${id}` : null

      if (pathPart === '' || pathPart === '/') {
        pathname = '/'
      } else {
        pathname = pathPart.startsWith('/') ? pathPart : `/${pathPart}`
      }
    } else {
      pathname = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    }
  }

  if (pathname === '') pathname = '/'

  // `#section` and `/#section` always target the home page.
  if (hash && (trimmed.startsWith('#') || trimmed.startsWith('/#'))) {
    pathname = '/'
  }

  const href = hash ? `${pathname}${hash}` : pathname

  return { pathname, hash, href }
}

export function isSamePageAnchor(pathname: string, target: NormalizedAnchorHref): boolean {
  if (!target.hash) return false
  return target.pathname === pathname
}

export function navigateToAnchor(
  target: NormalizedAnchorHref,
  behavior: ScrollBehavior = getScrollBehavior(),
): void {
  if (!target.hash) return

  const nextUrl = `${target.pathname}${target.hash}`
  const currentUrl = `${window.location.pathname}${window.location.hash}`

  if (currentUrl !== nextUrl) {
    window.history.pushState(null, '', nextUrl)
  }

  scrollToAnchorHash(target.hash, behavior)
}
