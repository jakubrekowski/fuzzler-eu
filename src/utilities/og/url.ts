export function getSiteOgImageUrl(): string {
  return '/api/og'
}

export function getPageOgImageUrl(slug: string): string {
  return `/api/og/page/${encodeURIComponent(slug)}`
}

export function getPostOgImageUrl(slug: string): string {
  return `/api/og/post/${encodeURIComponent(slug)}`
}

export function getPostsListOgImageUrl(): string {
  return '/api/og/posts'
}
