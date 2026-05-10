import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Post } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import PageClient from './page.client'
import { FuzzArticleClient } from './FuzzArticleClient'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
    })
    return posts.docs.map(({ slug }) => ({ slug }))
  } catch (error) {
    return []
  }
}

type Args = { params: Promise<{ slug?: string }> }

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  // Fetch related posts as full Post objects
  const relatedPostObjects: Post[] = (post.relatedPosts ?? [])
    .filter((p): p is Post => typeof p === 'object')

  // Fetch recent posts for "related" fallback when none are set
  let recentPosts: Post[] = []
  if (relatedPostObjects.length === 0) {
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 3,
        sort: '-publishedAt',
        overrideAccess: false,
        where: { slug: { not_equals: decodedSlug } },
      })
      recentPosts = result.docs as Post[]
    } catch (error) {
      recentPosts = []
    }
  }

  return (
    <>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <FuzzArticleClient
        post={post}
        relatedPosts={relatedPostObjects.length > 0 ? relatedPostObjects : recentPosts}
      />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug: decodeURIComponent(slug) })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  try {
    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: { slug: { equals: slug } },
    })
    return result.docs?.[0] || null
  } catch (error) {
    return null
  }
})
