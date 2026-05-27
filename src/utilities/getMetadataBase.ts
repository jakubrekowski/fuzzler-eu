import { headers } from 'next/headers'

import { getServerSideURL } from './getURL'

export async function getMetadataBase(): Promise<URL> {
  try {
    const headersList = await headers()
    const host = headersList.get('x-forwarded-host') ?? headersList.get('host')

    if (host) {
      const protocol = headersList.get('x-forwarded-proto') ?? 'https'
      return new URL(`${protocol}://${host.split(',')[0].trim()}`)
    }
  } catch {
    // headers() is unavailable during static generation
  }

  return new URL(getServerSideURL())
}
