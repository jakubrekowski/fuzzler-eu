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

  let featuredPosts: Post[] = []
  let gridPosts: Post[] = []
  let categories: any[] = []
  let totalDocs = 0
  let totalPages = 1
  let currentPage = 1

  try {
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
    featuredPosts = featuredResult.docs as Post[]

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
    gridPosts = gridResult.docs as Post[]
    totalDocs = gridResult.totalDocs
    totalPages = gridResult.totalPages
    currentPage = gridResult.page ?? 1

    // All categories for filter chips
    const categoriesResult = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 50,
    })
    categories = categoriesResult.docs
  } catch (error) {
    console.error('Error fetching posts for build:', error)
  }

  return (
    <FuzzNewsClient
      featuredPosts={featuredPosts}
      gridPosts={gridPosts}
      categories={categories}
      totalDocs={totalDocs}
      totalPages={totalPages}
      currentPage={currentPage}
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
