'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { PostHeroImage } from '@/components/PostHeroImage'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'description' | 'heroImage'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, description: postDescription, heroImage } = doc || {}
  const excerpt = postDescription || meta?.description

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = excerpt?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'bg-graphite border border-white/[0.08] rounded-[20px] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-orange/40 cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <PostHeroImage
        heroImage={heroImage}
        gradient="from-indigo to-red"
        size="33vw"
        className="w-full"
      />

      {/* Body */}
      <div className="p-[18px] flex flex-col flex-1">
        {showCategories && hasCategories && (
          <div className="font-jetbrains text-[11px] tracking-[0.18em] text-orange uppercase mb-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'
                const isLast = index === categories.length - 1
                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )}
        {titleToUse && (
          <h3 className="font-bold text-[20px] leading-[1.15] uppercase tracking-[0.01em] text-cream mb-2">
            <Link className="hover:text-orange transition-colors duration-200" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {excerpt && (
          <p className="text-cream-dim text-[15px] flex-1">{sanitizedDescription}</p>
        )}
      </div>
    </article>
  )
}
