import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { getMediaUrl } from './og/getMediaUrl'
import { getPageOgImageUrl, getPostOgImageUrl } from './og/url'
import { mergeOpenGraph } from './mergeOpenGraph'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (!image || typeof image !== 'object') return null
  return getMediaUrl(image)
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  collection: 'pages' | 'posts'
}): Promise<Metadata> => {
  const { doc, collection } = args

  const cmsImage = getImageURL(doc?.meta?.image)
  const slug = typeof doc?.slug === 'string' ? doc.slug : null
  const dynamicOgImage =
    !cmsImage && slug
      ? collection === 'posts'
        ? getPostOgImageUrl(slug)
        : getPageOgImageUrl(slug)
      : null
  const ogImage = cmsImage ?? dynamicOgImage

  const pageTitle = doc?.meta?.title || doc?.title
  const title = pageTitle ? `${pageTitle} | Fuzzler` : 'Fuzzler'

  const path =
    collection === 'posts' && slug ? `/posts/${slug}` : slug && slug !== 'home' ? `/${slug}` : '/'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
              },
            ],
          }
        : {}),
      title,
      url: path,
    }),
    title,
  }
}
