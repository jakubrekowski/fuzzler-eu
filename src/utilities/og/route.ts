import { renderOgImage } from '@/utilities/og/render'
import type { RenderOgImageOptions } from '@/utilities/og/render'

const cacheControl = 'public, max-age=86400, stale-while-revalidate=604800'

export async function ogImageResponse(data: RenderOgImageOptions): Promise<Response> {
  const image = await renderOgImage(data)

  return new Response(image.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': cacheControl,
    },
  })
}
