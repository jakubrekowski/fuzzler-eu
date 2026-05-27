import { getServerSideURL } from '../getURL'

export function getSiteOgImageUrl(): string {
  return `${getServerSideURL()}/api/og`
}

export function getPageOgImageUrl(slug: string): string {
  return `${getServerSideURL()}/api/og/page/${encodeURIComponent(slug)}`
}

export function getPostOgImageUrl(slug: string): string {
  return `${getServerSideURL()}/api/og/post/${encodeURIComponent(slug)}`
}

export function getPostsListOgImageUrl(): string {
  return `${getServerSideURL()}/api/og/posts`
}
