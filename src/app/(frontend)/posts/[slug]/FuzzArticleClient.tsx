'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useHeaderTheme } from '@/providers/HeaderTheme'

/* ─── helpers ─── */

const GRADIENTS = [
  'from-[#4B0082] to-[#F84949]',
  'from-[#FF9A42] to-[#F84949]',
  'from-[#79E69C] to-[#4B0082]',
  'from-[#2A0049] to-[#FF9A42]',
  'from-[#F84949] to-[#2A0049]',
  'from-[#FF9A42] to-[#79E69C]',
]
function pickGradient(seed: string | number) {
  const s = String(seed)
  const h = s.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return GRADIENTS[Math.abs(h) % GRADIENTS.length]!
}

const HATCH = 'repeating-linear-gradient(-45deg,transparent 0 12px,rgba(0,0,0,.18) 12px 13px)'

function fmtDate(iso?: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function categoryLabel(post: Post) {
  const c = post.categories?.[0]
  return typeof c === 'object' ? c.title : ''
}

function authorInitial(name?: string | null) {
  return (name ?? 'A').charAt(0).toUpperCase()
}

/* ─── share icons ─── */
const IconTelegram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.99 15.27l-.4 4.21c.57 0 .82-.24 1.12-.54l2.7-2.58 5.6 4.1c1.03.57 1.76.27 2.04-.95l3.7-17.32c.33-1.52-.55-2.12-1.55-1.74L1.36 9.86c-1.5.57-1.48 1.4-.26 1.78l5.34 1.66 12.4-7.83c.58-.36 1.12-.16.68.2"/>
  </svg>
)
const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6z"/>
  </svg>
)
const IconEmail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
  </svg>
)
const IconLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/>
  </svg>
)

/* ═══════════════════════════════════ ROOT ═══════════════════════════════════ */

interface Props {
  post: Post
  relatedPosts: Post[]
}

export const FuzzArticleClient: React.FC<Props> = ({ post, relatedPosts }) => {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => { setHeaderTheme('dark') }, [setHeaderTheme])

  const { title, categories, heroImage, populatedAuthors, publishedAt, meta } = post
  const cat = categoryLabel(post)
  const gradient = pickGradient(post.id)
  const author = populatedAuthors?.[0]
  const authorName = author?.name ?? 'Redakcja'

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-white/[0.08]"
        style={{
          background:
            'radial-gradient(80% 60% at 30% 20%,rgba(75,0,130,.55) 0%,transparent 60%),radial-gradient(60% 50% at 90% 80%,rgba(248,73,73,.25) 0%,transparent 60%),#1B1B19',
          padding: '48px 0 0',
          paddingTop: 'calc(96px + 48px)',
        }}
      >
        <div className="max-w-[980px] mx-auto px-6 md:px-8">
          {/* breadcrumbs */}
          <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#E8E2D6]/50 mb-6">
            <Link href="/" className="hover:text-[#FF9A42] transition-colors">Fuzzler</Link>
            <span className="text-[#FF9A42]">/</span>
            <Link href="/posts" className="hover:text-[#FF9A42] transition-colors">Wieści</Link>
            <span className="text-[#FF9A42]">/</span>
            <span className="text-[#E8E2D6]/70 truncate max-w-[20ch]">{title}</span>
          </nav>

          {/* category badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF9A42]/15 text-[#FF9A42] font-mono text-[12px] tracking-[0.2em] uppercase mb-5">
            // {cat || 'newsy'} · {fmtDate(publishedAt)} · 6 min czytania
          </span>

          {/* title */}
          <h1
            className="font-rajdhani font-bold uppercase leading-[1] tracking-tight text-white mb-5"
            style={{ fontSize: 'clamp(36px,5.6vw,72px)' }}
          >
            {title}
          </h1>

          {/* lede */}
          {meta?.description && (
            <p className="text-[#E8E2D6]/70 text-xl leading-relaxed max-w-[62ch] mb-7">
              {meta.description}
            </p>
          )}

          {/* byline */}
          <div className="flex flex-wrap justify-between items-center gap-4 py-5 border-t border-b border-white/[0.08] mb-8">
            <div className="flex items-center gap-3.5">
              {/* avatar */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF9A42] to-[#F84949] grid place-items-center font-bold text-[#2D2D2A] text-lg shrink-0">
                {authorInitial(authorName)}
              </div>
              <div>
                <div className="font-bold uppercase tracking-[0.04em] text-white">{authorName}</div>
                <div className="font-mono text-[11px] tracking-[0.16em] text-[#E8E2D6]/50 uppercase">
                  Redakcja · {fmtDate(publishedAt)}
                </div>
              </div>
            </div>

            {/* share */}
            <div className="flex gap-2">
              {[
                { label: 'Telegram', icon: <IconTelegram />, href: `https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}` },
                { label: 'X', icon: <IconX />, href: `https://x.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}` },
                { label: 'Email', icon: <IconEmail />, href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}` },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-white/[0.1] grid place-items-center text-white hover:bg-[#FF9A42] hover:text-[#2D2D2A] hover:border-[#FF9A42] transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
              <button
                aria-label="Kopiuj link"
                onClick={handleCopyLink}
                className="w-9 h-9 rounded-xl border border-white/[0.1] grid place-items-center text-white hover:bg-[#FF9A42] hover:text-[#2D2D2A] hover:border-[#FF9A42] transition-all duration-200"
              >
                <IconLink />
              </button>
            </div>
          </div>

          {/* hero image */}
          <div
            className={`relative overflow-hidden rounded-t-3xl bg-gradient-to-br ${gradient}`}
            style={{ aspectRatio: '21/9' }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: HATCH }} />
            {heroImage && typeof heroImage === 'object' && (
              <Media
                resource={heroImage}
                priority
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <span className="absolute top-4 left-4 z-10 bg-white text-[#2D2D2A] font-bold text-[11px] uppercase tracking-[0.16em] px-3 py-1.5 rounded-md">
              ★ Featured
            </span>
            <span className="absolute bottom-4 left-4 z-10 font-mono text-[11px] tracking-[0.16em] text-white/70 uppercase">
              // {fmtDate(publishedAt)} · Fuzzler
            </span>
          </div>
        </div>
      </section>

      {/* ── 3-COLUMN LAYOUT ──────────────────────────────────── */}
      <div
        className="fuzz-layout-grid max-w-[1180px] mx-auto px-6 md:px-8 py-12"
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr 240px',
          gap: '32px',
        }}
      >
        {/* TOC — hidden on mobile, sticky on desktop */}
        <TocSidebar post={post} />

        {/* Article body */}
        <article className="min-w-0">
          <div className="fuzz-article-body">
            <RichText data={post.content} enableGutter={false} enableProse={false} />
          </div>
        </article>

        {/* Meta sidebar */}
        <MetaSidebar post={post} />
      </div>

      {/* ── RELATED POSTS ────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-white/[0.08] bg-[#1B1B19] py-20 px-6 md:px-8">
          <div className="max-w-[1180px] mx-auto">
            <div className="flex items-end justify-between gap-4 mb-7">
              <h2 className="font-rajdhani font-bold text-4xl uppercase leading-none">
                Powiązane <em className="not-italic text-[#FF9A42]">wieści</em>
              </h2>
              <Link href="/posts" className="font-mono text-[12px] tracking-[0.18em] uppercase text-[#FF9A42] hover:underline shrink-0">
                Wszystkie wieści ↗
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((p) => (
                <RelatedCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ARTICLE BODY STYLES ──────────────────────────────── */}
      <style>{`
        .fuzz-article-body { font-family: 'Rajdhani', sans-serif; font-size: 18px; line-height: 1.6; color: #FDF9F3; }
        .fuzz-article-body h2 { font-weight: 700; font-size: 36px; text-transform: uppercase; letter-spacing: .01em; line-height: 1.05; margin: 48px 0 16px; scroll-margin-top: 100px; }
        .fuzz-article-body h2 em { font-style: normal; color: #FF9A42; }
        .fuzz-article-body h3 { font-weight: 700; font-size: 22px; text-transform: uppercase; letter-spacing: .04em; margin: 32px 0 10px; }
        .fuzz-article-body p { margin-bottom: 18px; color: #FDF9F3; font-size: 18px; }
        .fuzz-article-body p strong { color: #FDF9F3; font-weight: 700; }
        .fuzz-article-body a { color: #FF9A42; border-bottom: 1px dashed #FF9A42; }
        .fuzz-article-body ul, .fuzz-article-body ol { margin: 0 0 22px 22px; color: #FDF9F3; font-size: 18px; }
        .fuzz-article-body li { margin-bottom: 8px; }
        .fuzz-article-body ul li::marker { color: #FF9A42; }
        .fuzz-article-body blockquote { margin: 32px 0; padding: 24px 28px; border-left: 4px solid #FF9A42; background: rgba(255,154,66,.06); border-radius: 0 16px 16px 0; font-size: 22px; line-height: 1.5; }
        .fuzz-article-body blockquote cite { display: block; margin-top: 10px; font-style: normal; font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: #E8E2D6; }
        .fuzz-article-body figure { margin: 32px 0; }
        .fuzz-article-body figcaption { margin-top: 10px; font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: .16em; color: #E8E2D6; text-transform: uppercase; text-align: center; }
        @media (max-width: 1100px) { .fuzz-layout-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}

/* ═══════════════════════════════════ TOC ════════════════════════════════════ */

const TocSidebar: React.FC<{ post: Post }> = ({ post }) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>('.fuzz-article-body h2[id]'))
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActiveId(visible[0]!.target.id)
      },
      { rootMargin: '-80px 0px -60% 0px' },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  // Extract headings from content — only works if RichText renders h2 with id
  // We render a static fallback list based on h2 text nodes
  const headings = useRef<{ id: string; text: string }[]>([])

  useEffect(() => {
    headings.current = Array.from(
      document.querySelectorAll<HTMLElement>('.fuzz-article-body h2'),
    ).map((el) => {
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ?? ''
      }
      return { id: el.id, text: el.textContent ?? '' }
    })
  }, [])

  return (
    <aside
      className="hidden lg:block"
      style={{ position: 'sticky', top: '96px', alignSelf: 'start', fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }}
    >
      <div className="text-[11px] tracking-[0.2em] text-[#E8E2D6]/50 uppercase mb-3">// w tym wpisie</div>
      <TocList activeId={activeId} />

      {/* Back link */}
      <div className="mt-8 pt-6 border-t border-white/[0.08]">
        <Link
          href="/posts"
          className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#E8E2D6]/40 hover:text-[#FF9A42] transition-colors flex items-center gap-2"
        >
          ← Wszystkie wieści
        </Link>
      </div>
    </aside>
  )
}

/* Separate client component so it can re-render on activeId changes */
const TocList: React.FC<{ activeId: string }> = ({ activeId }) => {
  const [items, setItems] = useState<{ id: string; text: string }[]>([])

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.fuzz-article-body h2'))
    setItems(
      els.map((el) => {
        if (!el.id) {
          el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ?? ''
        }
        return { id: el.id, text: el.textContent ?? '' }
      }),
    )
  }, [])

  if (!items.length) return null

  return (
    <ol className="list-none flex flex-col gap-2" style={{ counterReset: 't' }}>
      {items.map(({ id, text }, i) => (
        <li key={id} style={{ counterIncrement: 't' }}>
          <a
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className={[
              'flex gap-2.5 items-start py-1.5 pl-3 border-l-2 leading-snug transition-all duration-200',
              activeId === id
                ? 'text-[#FF9A42] border-[#FF9A42]'
                : 'text-[#E8E2D6]/50 border-transparent hover:text-white hover:border-[#E8E2D6]/30',
            ].join(' ')}
          >
            <span className="text-[#FF9A42] font-bold shrink-0 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="line-clamp-2">{text}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

/* ═══════════════════════════════════ META SIDEBAR ═══════════════════════════ */

const MetaSidebar: React.FC<{ post: Post }> = ({ post }) => {
  const { publishedAt, populatedAuthors, categories } = post
  const cat = categoryLabel(post)
  const authorName = populatedAuthors?.[0]?.name ?? 'Redakcja'

  return (
    <aside
      className="hidden lg:flex flex-col gap-4"
      style={{ position: 'sticky', top: '96px', alignSelf: 'start' }}
    >
      {/* Facts card */}
      <div className="bg-[#2D2D2A] border border-white/[0.1] rounded-2xl p-5">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#E8E2D6]/50 mb-3">// fakty</div>
        {[
          ['Data', fmtDate(publishedAt)],
          ['Autor', authorName],
          ['Czas', '6 min'],
          ['Kategoria', cat || '—'],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between py-2 border-b border-dashed border-white/[0.08] last:border-0 text-sm">
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[#E8E2D6]/50">{k}</span>
            <span className="font-bold uppercase tracking-[0.04em] text-white">{v}</span>
          </div>
        ))}
      </div>

      {/* Tags card */}
      {categories && categories.length > 0 && (
        <div className="bg-[#2D2D2A] border border-white/[0.1] rounded-2xl p-5">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#E8E2D6]/50 mb-3">// tagi</div>
          <div className="flex flex-wrap gap-1.5">
            {(categories as any[]).map((c, i) => {
              const label = typeof c === 'object' ? c.title : ''
              const catSlug = typeof c === 'object' ? c.slug : ''
              return (
                <Link
                  key={i}
                  href={`/posts?category=${catSlug}`}
                  className="px-2.5 py-1.5 border border-white/[0.1] rounded-full font-mono text-[11px] tracking-[0.14em] uppercase text-[#E8E2D6]/50 hover:text-[#FF9A42] hover:border-[#FF9A42] transition-all"
                >
                  #{label}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* CTA card */}
      <div
        className="rounded-2xl p-5 border"
        style={{
          background: 'linear-gradient(180deg,rgba(255,154,66,.18),rgba(255,154,66,.04))',
          borderColor: 'rgba(255,154,66,.4)',
        }}
      >
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#FF9A42] mb-2">
          // chcesz przyjechać?
        </div>
        <p className="text-[14px] text-[#E8E2D6]/60 mb-4 leading-snug">
          Limit miejsc 120. Rejestracja trwa.
        </p>
        <Link
          href="/#zapis"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-[#FF9A42] text-[#2D2D2A] font-bold uppercase tracking-[0.08em] text-[13px] shadow-[0_6px_0_0_#B5641F] hover:translate-y-0.5 hover:shadow-[0_4px_0_0_#B5641F] transition-all duration-150"
        >
          Zapisz się <span className="-rotate-45 inline-block font-black">→</span>
        </Link>
      </div>
    </aside>
  )
}

/* ═══════════════════════════════════ RELATED CARD ═══════════════════════════ */

const RelatedCard: React.FC<{ post: Post }> = ({ post }) => {
  const { slug, title, meta, publishedAt } = post
  const cat = categoryLabel(post)
  const gradient = pickGradient(post.id)

  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex flex-col rounded-[20px] overflow-hidden border border-white/[0.08] bg-[#2D2D2A] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9A42]/40"
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${gradient}`}
        style={{ aspectRatio: '4/3' }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg,transparent 0 10px,rgba(0,0,0,.18) 10px 11px)' }} />
        {post.heroImage && typeof post.heroImage === 'object' && (
          <Media
            resource={post.heroImage}
            size="33vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {cat && (
          <span className="absolute top-3 left-3 z-10 bg-white text-[#2D2D2A] font-bold text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-md">
            {cat}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <span className="font-mono text-[11px] tracking-[0.18em] text-[#FF9A42] uppercase mb-2">
          // {cat || 'newsy'}
        </span>
        <h3 className="font-rajdhani font-bold text-[20px] leading-[1.15] uppercase tracking-tight mb-2 group-hover:text-[#FF9A42] transition-colors">
          {title}
        </h3>
        {meta?.description && (
          <p className="text-[#E8E2D6]/60 text-[14px] line-clamp-2 flex-1">{meta.description}</p>
        )}
        <div className="mt-4 flex justify-between font-mono text-[11px] tracking-widest uppercase text-[#E8E2D6]/40">
          <span>{fmtDate(publishedAt)}</span>
          <span className="text-[#FF9A42]">↗</span>
        </div>
      </div>
    </Link>
  )
}
