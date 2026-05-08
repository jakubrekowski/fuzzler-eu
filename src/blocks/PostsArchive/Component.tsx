import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PostsArchiveClient } from '@/blocks/PostsArchive/Client'

export const PostsArchiveBlockComponent = async (props: any) => {
  const { tagline, title, description, categories, limit, anchor } = props

  const payload = await getPayload({ config: configPromise })

  const flattenedCategories = categories?.map((category: any) => {
    if (typeof category === 'object') return category.id
    else return category
  })

  const fetchedPosts = await payload.find({
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
