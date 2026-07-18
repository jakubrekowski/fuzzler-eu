import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { publishedPostsByCategoriesWhere, publishedPostsWhere } from '@/utilities/publishedPosts'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    try {
      const payload = await getPayload({ config: configPromise })
      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        where:
          flattenedCategories && flattenedCategories.length > 0
            ? publishedPostsByCategoriesWhere(flattenedCategories)
            : publishedPostsWhere(),
      })

      posts = fetchedPosts.docs
    } catch (error) {
      console.error('Error fetching posts for ArchiveBlock:', error)
      posts = []
    }
  } else {
    if (selectedDocs?.length) {
      const selectedPostIDs = selectedDocs
        .map((post) => (typeof post.value === 'object' ? post.value.id : post.value))
        .filter((id): id is number => typeof id === 'number')

      if (selectedPostIDs.length > 0) {
        try {
          const payload = await getPayload({ config: configPromise })
          const fetchedPosts = await payload.find({
            collection: 'posts',
            depth: 1,
            limit: selectedPostIDs.length,
            where: {
              and: [
                ...(publishedPostsWhere().and ?? []),
                {
                  id: {
                    in: selectedPostIDs,
                  },
                },
              ],
            },
          })

          posts = fetchedPosts.docs
        } catch (error) {
          console.error('Error fetching selected posts for ArchiveBlock:', error)
        }
      }
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
