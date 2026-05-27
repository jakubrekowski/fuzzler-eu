import { renderOgImage } from '@/utilities/og/render'
import type { RenderOgImageOptions } from '@/utilities/og/render'

const cacheControl = 'public, max-age=86400, stale-while-revalidate=604800'

export async function ogImageResponse(data: RenderOgImageOptions): Promise<Response> {
  try {
    const image = await renderOgImage(data)
    const buffer = await image.arrayBuffer()

    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': cacheControl,
      },
    })
  } catch (error) {
    console.error('Failed to generate OG image', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
