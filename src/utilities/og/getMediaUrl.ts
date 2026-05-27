import type { Media } from '@/payload-types'

import { getServerSideURL } from '../getURL'

export function getMediaUrl(image?: Media | number | null): string | null {
  if (!image || typeof image !== 'object' || !('url' in image) || !image.url) {
    return null
  }

  const serverUrl = getServerSideURL()
  const ogUrl = image.sizes?.og?.url

  return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
}
