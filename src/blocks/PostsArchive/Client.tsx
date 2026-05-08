'use client'

import React from 'react'
import type { Post } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { Media } from '@/components/Media'

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
          Wszystkie Newsy ↗
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
  const { slug, categories, meta, title, publishedAt } = post
  const { description, image: metaImage } = meta || {}

  const category = categories?.[0]
  const categoryTitle = typeof category === 'object' ? category.title : ''

  const renderTitle = (text: string) => {
    if (!text) return null
    const parts = text.split(/(\[\[.*?\]\])/g)
    return parts.map((part, i) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        return (
          <span key={i} className="text-orange">
            {part.slice(2, -2)}
          </span>
        )
      }
      return part
    })
  }

  // Deterministic gradient based on title or ID
  const gradients = [
    'from-[#4B0082] to-[#F84949]', // purple-red
    'from-[#FF9A42] to-[#F84949]', // orange-red
    'from-[#79E69C] to-[#4B0082]', // green-purple
    'from-[#2A0049] to-[#FF9A42]', // deep-orange
  ]
  const gradient = gradients[Math.abs(title.length % gradients.length)]

  return (
    <article className="group bg-[#2D2D2A] border border-white/[0.1] rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-orange/40">
      <Link href={`/posts/${slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)}>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent 0 10px, black 10px 11px)',
            }}
          />
        </div>

        {metaImage && typeof metaImage === 'object' && (
          <Media
            resource={metaImage}
            size="33vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {categoryTitle && (
          <div className="absolute top-4 left-4 bg-white text-[#2D2D2A] px-3 py-1 rounded-md font-bold text-[10px] uppercase tracking-widest z-10">
            {categoryTitle}
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="font-mono text-[11px] tracking-[0.18em] text-orange uppercase mb-2">
          // {categoryTitle || 'newsy'}
        </div>
        <h3 className="font-bold text-xl leading-[1.15] uppercase tracking-tight text-white mb-3 group-hover:text-orange transition-colors">
          <Link href={`/posts/${slug}`}>{renderTitle(title)}</Link>
        </h3>
        <p className="text-[#E8E2D6]/70 text-[15px] line-clamp-2 mb-6 flex-1">{description}</p>

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
