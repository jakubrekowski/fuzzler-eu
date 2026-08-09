import { revalidatePath } from 'next/cache'

type InvalidatePublicCacheOptions = {
  paths: string[]
  purgeEverything?: boolean
}

const getPublicURL = (path: string) => {
  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '')
  return baseURL ? new URL(path, `${baseURL}/`).toString() : null
}

/** Keeps Next's data cache and the optional Cloudflare HTML cache coherent. */
export const invalidatePublicCache = async ({
  paths,
  purgeEverything = false,
}: InvalidatePublicCacheOptions): Promise<void> => {
  const uniquePaths = [...new Set(paths)]
  uniquePaths.forEach((path) => revalidatePath(path))

  const zoneID = process.env.CLOUDFLARE_ZONE_ID
  const token = process.env.CLOUDFLARE_API_TOKEN
  if (!zoneID || !token) return

  const files = uniquePaths.map(getPublicURL).filter((url): url is string => Boolean(url))
  if (!purgeEverything && files.length === 0) return

  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneID}/purge_cache`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(purgeEverything ? { purge_everything: true } : { files }),
      signal: AbortSignal.timeout(5_000),
    })

    if (!response.ok) {
      console.error('Cloudflare cache purge failed', { status: response.status, paths: uniquePaths })
    }
  } catch (error) {
    // Publishing content must not fail when the external purge service is unavailable.
    console.error('Cloudflare cache purge request failed', { error, paths: uniquePaths })
  }
}
