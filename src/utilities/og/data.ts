import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Page } from '@/payload-types'
import { homeStatic } from '@/endpoints/seed/home-static'
import { getOgBranding } from '@/utilities/og/branding'
import { getMediaUrl } from '@/utilities/og/getMediaUrl'
import { prepareOgBackgroundImage } from '@/utilities/og/resolveImageDataUri'
import type { RenderOgImageOptions } from '@/utilities/og/render'

async function resolveBackgroundImage(url: string | null): Promise<string | null> {
  if (!url) return null
  return prepareOgBackgroundImage(url)
}

const siteDescription =
  'Fuzzler — wydarzenie, społeczność i aktualności ze świata fuzzingu i bezpieczeństwa.'

const postsListDescription =
  'Co u nas piszczy. Aktualizacje programu, nowi prowadzący, kulisy organizacji i fotorelacje z poprzednich edycji.'

async function withBranding(
  data: Omit<RenderOgImageOptions, 'branding'>,
): Promise<RenderOgImageOptions> {
  const branding = await getOgBranding()
  return { ...data, branding }
}

export async function getSiteOgData(): Promise<RenderOgImageOptions> {
  let title = 'Fuzzler'
  let description = siteDescription

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1,
      pagination: false,
      overrideAccess: false,
      where: { slug: { equals: 'home' } },
    })

    const page = result.docs?.[0] ?? homeStatic
    title = page.meta?.title || page.title || title
    description = page.meta?.description || siteDescription
  } catch {
    // Use defaults when the database is unavailable
  }

  return withBranding({ title, description, kind: 'site' })
}

export async function getPageOgData(slug: string): Promise<RenderOgImageOptions> {
  const decodedSlug = decodeURIComponent(slug)

  let title = 'Fuzzler'
  let description: string | null = null
  let backgroundImageUrl: string | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1,
      pagination: false,
      overrideAccess: false,
      where: { slug: { equals: decodedSlug } },
    })

    let page: Page | null = result.docs?.[0] ?? null

    if (!page && decodedSlug === 'home') {
      page = homeStatic as Page
    }

    if (page) {
      title = page.meta?.title || page.title || title
      description = page.meta?.description ?? null
      backgroundImageUrl = await resolveBackgroundImage(getMediaUrl(page.meta?.image))
    }
  } catch {
    // Fall back to generic branding
  }

  return withBranding({
    title,
    description,
    kind: decodedSlug === 'home' ? 'site' : 'page',
    backgroundImageUrl,
  })
}

export async function getPostOgData(slug: string): Promise<RenderOgImageOptions> {
  const decodedSlug = decodeURIComponent(slug)

  let title = 'Fuzzler'
  let description: string | null = null
  let backgroundImageUrl: string | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1,
      pagination: false,
      overrideAccess: false,
      depth: 1,
      where: { slug: { equals: decodedSlug } },
    })

    const post = result.docs?.[0]

    if (post) {
      title = post.meta?.title || post.title || title
      description =
        post.meta?.description || post.description || (typeof post.lead === 'string' ? post.lead : null)
      backgroundImageUrl = await resolveBackgroundImage(
        getMediaUrl(post.meta?.image) ?? getMediaUrl(post.heroImage),
      )
    }
  } catch {
    // Fall back to generic branding
  }

  return withBranding({
    title,
    description,
    kind: 'post',
    backgroundImageUrl,
  })
}

export async function getPostsListOgData(): Promise<RenderOgImageOptions> {
  return withBranding({
    title: 'Fuzz News',
    description: postsListDescription,
    kind: 'post',
  })
}
