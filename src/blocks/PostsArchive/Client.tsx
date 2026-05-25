'use client'

import React from 'react'
import type { Post } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { HighlightedText } from '@/components/HighlightedText'
import Link from 'next/link'
import { CategoryBadge } from '@/components/CategoryBadge'
import { PostHeroImage } from '@/components/PostHeroImage'
import { getPrimaryCategory } from '@/utilities/categoryBadge'
import {
  formatReadingTimeShortPl,
  getReadingTimeMinutes,
} from '@/utilities/readingTime'

interface PostsArchiveClientProps {
  tagline?: string | null
  title: string
  description?: string | null
  posts: Post[]
  anchor?: string | null
}

export const PostsArchiveClient: React.FC<PostsArchiveClientProps> = (props) => {
  const { tagline, title, description, posts, anchor } = props

  return (
    <div className="container py-24" id={anchor || undefined}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <SectionHeader tagline={tagline} title={title} description={description} className="mb-0" />
        <Link href="/posts" className="btn-ghost shrink-0 self-start md:self-end">
          Wszystkie FuzzNews ↗
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

const PostCard = ({ post }: { post: Post }) => {
  const { slug, categories, title, publishedAt, heroImage, description } = post
  const excerpt = description || post.meta?.description || null
  const readingMinutes = getReadingTimeMinutes(post.content)

  const category = getPrimaryCategory(post)
  const categoryTitle = category?.title ?? ''

  const gradients = [
    'from-[#4B0082] to-[#F84949]',
    'from-[#FF9A42] to-[#F84949]',
    'from-[#79E69C] to-[#4B0082]',
    'from-[#2A0049] to-[#FF9A42]',
  ]
  const gradient = gradients[Math.abs(title.length % gradients.length)]

  return (
    <article className="group bg-[#2D2D2A] border border-white/[0.1] rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-orange/40">
      <Link href={`/posts/${slug}`} className="block">
        <PostHeroImage heroImage={heroImage} gradient={gradient} size="33vw">
          {category && (
            <CategoryBadge
              category={category}
              className="absolute top-4 left-4 text-[10px] px-3 py-1 rounded-md tracking-widest"
            />
          )}
        </PostHeroImage>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="font-mono text-[11px] tracking-[0.18em] text-orange uppercase mb-2">
          // {categoryTitle || 'newsy'} · {formatReadingTimeShortPl(readingMinutes)}
        </div>
        <h3 className="font-bold text-xl leading-[1.15] uppercase tracking-tight text-white mb-3 group-hover:text-orange transition-colors">
          <Link href={`/posts/${slug}`}>
            <HighlightedText>{title}</HighlightedText>
          </Link>
        </h3>
        {excerpt && (
          <p className="text-[#E8E2D6]/70 text-[15px] line-clamp-2 mb-6 flex-1">
            <HighlightedText>{excerpt}</HighlightedText>
          </p>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#E8E2D6]/50">
          <span>{publishedAt ? new Date(publishedAt).toLocaleDateString('pl-PL') : ''}</span>
          <Link
            href={`/posts/${slug}`}
            className="text-orange hover:underline decoration-orange/30"
          >
            ↗ CZYTAJ
          </Link>
        </div>
      </div>
    </article>
  )
}
