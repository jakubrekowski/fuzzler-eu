import type { Where } from 'payload'

/** Restricts public post feeds to articles whose scheduled publication time has passed. */
export const publishedPostsWhere = (): Where => ({
  and: [
    {
      _status: {
        equals: 'published' as const,
      },
    },
    {
      publishedAt: {
        less_than_equal: new Date().toISOString(),
      },
    },
  ],
})

export const publishedPostsByCategoriesWhere = (categories: (number | string)[]): Where => ({
  and: [
    ...(publishedPostsWhere().and ?? []),
    {
      categories: {
        in: categories,
      },
    },
  ],
})
