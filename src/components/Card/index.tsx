'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

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

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'bg-graphite border border-white/[0.08] rounded-[20px] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-orange/40 cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      {/* Thumb */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-indigo to-red overflow-hidden">
        {!metaImage && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, rgba(0,0,0,0) 0 10px, rgba(0,0,0,0.18) 10px 11px)',
            }}
          />
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} mediaSize="medium" size="33vw" imgClassName="object-cover w-full h-full" />
        )}
      </div>

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
        {description && (
          <p className="text-cream-dim text-[15px] flex-1">{sanitizedDescription}</p>
        )}
      </div>
    </article>
  )
}
