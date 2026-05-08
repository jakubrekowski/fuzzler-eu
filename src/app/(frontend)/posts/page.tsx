import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Post } from '@/payload-types'
import { FuzzNewsClient } from './FuzzNewsClient'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  // Featured posts — top 3 by publishedAt
  const featuredResult = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    sort: '-publishedAt',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      heroImage: true,
      populatedAuthors: true,
    },
  })

  // Grid posts — next 9
  const gridResult = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 9,
    page: 1,
    sort: '-publishedAt',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      heroImage: true,
    },
  })

  // All categories for filter chips
  const categoriesResult = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 50,
  })

  return (
    <FuzzNewsClient
      featuredPosts={featuredResult.docs as Post[]}
      gridPosts={gridResult.docs as Post[]}
      categories={categoriesResult.docs}
      totalDocs={gridResult.totalDocs}
      totalPages={gridResult.totalPages}
      currentPage={gridResult.page ?? 1}
    />
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Furr Wieści — Fuzzler',
    description:
      'Co u nas piszczy. Aktualizacje programu, nowi prowadzący, kulisy organizacji i fotorelacje z poprzednich edycji.',
  }
}
