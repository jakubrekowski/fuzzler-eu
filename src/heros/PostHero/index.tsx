import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Badge } from '@/components/ui/badge'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative bg-graphite-dark font-rajdhani text-cream overflow-hidden py-24 lg:py-32 border-b border-white/10">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-indigo/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange/5 blur-[100px] rounded-full" />
      </div>

      <div className="container z-10 relative lg:grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                return (
                  <Badge key={index} variant="outline" className="text-orange border-orange/30">
                    {category.title || 'Untitled category'}
                  </Badge>
                )
              }
              return null
            })}
          </div>

          <h1 className="text-[clamp(40px,6vw,72px)] font-bold uppercase leading-[0.95] tracking-tight mb-8">
            {title}
          </h1>

          <div className="flex flex-wrap gap-8 text-cream-dim text-sm uppercase tracking-widest font-semibold border-t border-white/5 pt-8">
            {hasAuthors && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-orange opacity-80">Written by</span>
                <span className="text-cream">{formatAuthors(populatedAuthors)}</span>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-orange opacity-80">Published</span>
                <time dateTime={publishedAt} className="text-cream">
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>

        {heroImage && typeof heroImage !== 'string' && (
          <div className="relative">
            <div className="relative z-10 rounded-[28px] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
              <Media
                fill
                imgClassName="object-cover"
                mediaSize="large"
                priority
                resource={heroImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/60 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Glass decoration */}
            <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full -z-10" />
          </div>
        )}
      </div>
    </div>
  )
}
