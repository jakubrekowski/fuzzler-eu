import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PostsArchiveClient } from '@/blocks/PostsArchive/Client'
import type { Post } from '@/payload-types'

export const PostsArchiveBlockComponent = async (props: any) => {
  const { tagline, title, description, categories, limit, anchor } = props

  const flattenedCategories = categories?.map((category: any) => {
    if (typeof category === 'object') return category.id
    else return category
  })

  let fetchedPosts: { docs: Post[] } = { docs: [] }

  try {
    const payload = await getPayload({ config: configPromise })
    fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: limit || 12,
      sort: '-publishedAt',
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })
  } catch (error) {
    console.error('Error fetching posts for PostsArchiveBlock:', error)
  }

  return (
    <PostsArchiveClient
      tagline={tagline}
      title={title}
      description={description}
      posts={fetchedPosts.docs}
      anchor={anchor}
    />
  )
}
