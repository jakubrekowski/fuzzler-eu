'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Post, Category } from '@/payload-types'
import { Media } from '@/components/Media'
import { useHeaderTheme } from '@/providers/HeaderTheme'

/* ─────────────────────────────────────────── helpers ── */

const GRADIENTS = [
  'from-[#4B0082] to-[#F84949]',   // v1 purple → red
  'from-[#FF9A42] to-[#F84949]',   // v2 orange → red
  'from-[#79E69C] to-[#4B0082]',   // v3 green  → purple
  'from-[#2A0049] to-[#FF9A42]',   // v4 deep   → orange
  'from-[#F84949] to-[#2A0049]',   // v5 red    → deep
  'from-[#FF9A42] to-[#79E69C]',   // v6 orange → green
]

function pickGradient(seed: string | number): string {
  const s = String(seed)
  const hash = s.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]!
}

const HATCH =
  'repeating-linear-gradient(-45deg, transparent 0 10px, rgba(0,0,0,.18) 10px 11px)'

function fmtDate(iso?: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function categoryLabel(post: Post): string {
  const cat = post.categories?.[0]
  return typeof cat === 'object' ? cat.title : ''
}

/* ─────────────────────────────────────────── types ── */

interface FuzzNewsClientProps {
  featuredPosts: Post[]
  gridPosts: Post[]
  categories: Category[]
  totalDocs: number
  totalPages: number
  currentPage: number
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════════════════════════════════ */

export const FuzzNewsClient: React.FC<FuzzNewsClientProps> = ({
  featuredPosts,
  gridPosts,
  categories,
  totalDocs,
  totalPages,
  currentPage,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<'newest' | 'title'>('newest')
  const router = useRouter()

  const filtered = useMemo(() => {
    let posts = [...gridPosts]

    if (activeCategory) {
      posts = posts.filter((p) =>
        p.categories?.some(
          (c) => typeof c === 'object' && c.title === activeCategory,
        ),
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.meta?.description?.toLowerCase().includes(q),
      )
    }

    if (sortKey === 'title') {
      posts = [...posts].sort((a, b) => a.title.localeCompare(b.title, 'pl'))
    }

    return posts
  }, [gridPosts, activeCategory, search, sortKey])

  const [hero, ...sidePosts] = featuredPosts

  return (
    <>
      {/* ── PAGE HERO ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-white/[0.08]"
        style={{
          background:
            'radial-gradient(80% 60% at 30% 20%, rgba(75,0,130,.55) 0%, transparent 60%), radial-gradient(60% 50% at 90% 80%, rgba(248,73,73,.25) 0%, transparent 60%), #1B1B19',
          padding: '80px 0 64px',
          paddingTop: 'calc(96px + 80px)',
        }}
      >
        <div className="container">
          {/* breadcrumbs */}
          <nav
            className="flex items-center gap-2.5 mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#E8E2D6]/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[#FF9A42] transition-colors">
              Fuzzler
            </Link>
            <span className="text-[#FF9A42]">/</span>
            <span className="text-[#E8E2D6]/80">Wieści</span>
          </nav>

          {/* title + meta row */}
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 items-end">
            <div>
              <h1 className="font-rajdhani font-bold uppercase leading-[0.86] tracking-tight"
                style={{ fontSize: 'clamp(72px, 11vw, 148px)' }}>
                Furr<br />
                Wieś<em className="not-italic text-[#FF9A42]">ci</em>
              </h1>
            </div>
            <div>
              <p className="text-[#E8E2D6]/70 text-lg leading-relaxed max-w-[42ch]">
                Co u nas piszczy. Aktualizacje programu, nowi prowadzący,
                kulisy organizacji i fotorelacje z poprzednich edycji.
              </p>
              <div className="mt-5 flex gap-4 flex-wrap font-mono text-[11px] uppercase tracking-[0.18em] text-[#E8E2D6]/50">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF9A42] rotate-45 shrink-0" />
                  {totalDocs} wpisów
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF9A42] rotate-45 shrink-0" />
                  Aktualizacja: {new Date().toLocaleDateString('pl-PL')}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF9A42] rotate-45 shrink-0" />
                  RSS dostępny
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ─────────────────────────────────────────── */}
      <div className="border-b border-white/[0.08] bg-[#1B1B19]/90 sticky top-[var(--header-h,64px)] z-20 backdrop-blur-sm">
        <div
          className="container flex flex-wrap items-center justify-between gap-4"
          style={{ padding: '20px 0' }}
        >
          {/* chips */}
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="Wszystko"
              count={totalDocs}
              active={activeCategory === null}
              onClick={() => setActiveCategory(null)}
            />
            {categories.map((cat) => (
              <FilterChip
                key={cat.id}
                label={cat.title}
                active={activeCategory === cat.title}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.title ? null : cat.title,
                  )
                }
              />
            ))}
          </div>

          {/* search */}
          <label className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] font-mono text-[13px] text-[#E8E2D6]/60">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Szukaj w wieściach…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-0 outline-none text-white placeholder:text-[#E8E2D6]/40 w-48 font-mono text-[13px]"
            />
            <span className="opacity-40">/</span>
          </label>
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <main className="container py-12 md:py-16 pb-24">

        {/* ── FEATURED ───────────────────────────────────────── */}
        {featuredPosts.length > 0 && !activeCategory && !search && (
          <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4 mb-14">
            {/* Primary hero card */}
            {hero && <FeatHeroCard post={hero} />}

            {/* Side stack */}
            {sidePosts.length > 0 && (
              <div className="flex flex-col gap-4">
                {sidePosts.map((p) => (
                  <FeatSideCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── GRID HEADER ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="font-mono text-[12px] tracking-[0.2em] text-[#FF9A42] uppercase mb-1.5">
              // 02 — wszystkie wpisy
            </div>
            <h2 className="font-rajdhani font-bold text-4xl md:text-5xl uppercase leading-none tracking-tight">
              Najnowsze <em className="not-italic text-[#FF9A42]">wieści</em>
            </h2>
          </div>

          {/* sort */}
          <div className="flex items-center gap-4 font-mono text-[12px] tracking-[0.16em] uppercase text-[#E8E2D6]/50">
            <span>// sortuj:</span>
            <button
              onClick={() => setSortKey('newest')}
              className={
                sortKey === 'newest'
                  ? 'text-white border-b border-[#FF9A42] pb-px'
                  : 'hover:text-white transition-colors pb-px border-b border-transparent'
              }
            >
              Najnowsze
            </button>
            <button
              onClick={() => setSortKey('title')}
              className={
                sortKey === 'title'
                  ? 'text-white border-b border-[#FF9A42] pb-px'
                  : 'hover:text-white transition-colors pb-px border-b border-transparent'
              }
            >
              A–Z
            </button>
          </div>
        </div>

        {/* ── NEWS GRID ──────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-[#E8E2D6]/30">
            <div className="font-mono text-[40px] mb-4">🔍</div>
            <p className="font-mono text-[13px] uppercase tracking-widest">
              Brak wyników
            </p>
          </div>
        )}

        {/* ── PAGINATION ─────────────────────────────────────── */}
        {totalPages > 1 && !activeCategory && !search && (
          <FuzzPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNavigate={(p) =>
              router.push(p === 1 ? '/posts' : `/posts/page/${p}`)
            }
          />
        )}

        {/* ── NEWSLETTER ─────────────────────────────────────── */}
        <NewsletterStrip />
      </main>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FILTER CHIP
══════════════════════════════════════════════════════════════════════════ */

const FilterChip: React.FC<{
  label: string
  count?: number
  active: boolean
  onClick: () => void
}> = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={[
      'px-4 py-2 rounded-full border font-bold text-[13px] uppercase tracking-[0.12em] transition-all duration-200',
      active
        ? 'bg-[#FF9A42] text-[#2D2D2A] border-[#FF9A42] shadow-[0_4px_0_0_#B5641F]'
        : 'border-white/[0.1] text-[#E8E2D6]/60 hover:text-white hover:border-[#E8E2D6]/40',
    ].join(' ')}
  >
    {label}
    {count !== undefined && (
      <span className="font-mono text-[11px] opacity-70 ml-1.5">{count}</span>
    )}
  </button>
)

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED — HERO (large left card)
══════════════════════════════════════════════════════════════════════════ */

const FeatHeroCard: React.FC<{ post: Post }> = ({ post }) => {
  const { slug, title, meta, publishedAt, categories, heroImage, populatedAuthors } = post
  const cat = categoryLabel(post)
  const gradient = pickGradient(post.id)
  const author = populatedAuthors?.[0]?.name

  return (
    <Link
      href={`/posts/${slug}`}
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/[0.08] bg-[#2D2D2A] min-h-[420px] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9A42]/40"
    >
      {/* thumb */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${gradient}`}
        style={{ aspectRatio: '16/9' }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: HATCH, opacity: 0.8 }} />
        {heroImage && typeof heroImage === 'object' && (
          <Media
            resource={heroImage}
            size="60vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3.5 left-3.5 z-10 bg-white text-[#2D2D2A] font-bold text-[11px] uppercase tracking-[0.16em] px-3 py-1.5 rounded-md">
          ★ Featured
        </span>
      </div>

      {/* body */}
      <div className="flex flex-col flex-1 p-7">
        <span className="font-mono text-[12px] tracking-[0.2em] text-[#FF9A42] uppercase mb-2.5">
          // {cat || 'newsy'} · {fmtDate(publishedAt)}
        </span>
        <h2 className="font-rajdhani font-bold text-[34px] leading-[1.05] uppercase tracking-tight mb-3 group-hover:text-[#FF9A42] transition-colors">
          {title}
        </h2>
        {meta?.description && (
          <p className="text-[#E8E2D6]/60 text-base flex-1 line-clamp-3 max-w-[54ch]">
            {meta.description}
          </p>
        )}
        <div className="mt-5 flex justify-between items-center font-mono text-[11px] tracking-[0.16em] text-[#E8E2D6]/40 uppercase">
          <span>{author ? `${author} · ` : ''}6 min czytania</span>
          <span className="text-[#FF9A42] font-bold">Czytaj ↗</span>
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED — SIDE (small stacked cards)
══════════════════════════════════════════════════════════════════════════ */

const FeatSideCard: React.FC<{ post: Post }> = ({ post }) => {
  const { slug, title, meta, publishedAt, heroImage } = post
  const cat = categoryLabel(post)
  const gradient = pickGradient(post.id)

  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex flex-col flex-1 rounded-3xl overflow-hidden border border-white/[0.08] bg-[#2D2D2A] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9A42]/40"
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${gradient}`}
        style={{ aspectRatio: '21/9' }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: HATCH, opacity: 0.8 }} />
        {heroImage && typeof heroImage === 'object' && (
          <Media
            resource={heroImage}
            size="40vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3 left-3 z-10 bg-[#FF9A42] text-[#2D2D2A] font-bold text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-md">
          {cat || 'Newsy'}
        </span>
      </div>

      <div className="flex flex-col flex-1 px-5 py-4">
        <span className="font-mono text-[11px] tracking-[0.2em] text-[#FF9A42] uppercase mb-2">
          // {cat || 'newsy'} · {fmtDate(publishedAt)}
        </span>
        <h3 className="font-rajdhani font-bold text-[22px] leading-[1.1] uppercase tracking-tight mb-1.5 group-hover:text-[#FF9A42] transition-colors">
          {title}
        </h3>
        {meta?.description && (
          <p className="text-[#E8E2D6]/55 text-[14px] line-clamp-2 flex-1">
            {meta.description}
          </p>
        )}
        <div className="mt-3 flex justify-between font-mono text-[11px] text-[#E8E2D6]/40 uppercase tracking-widest">
          <span>3 min</span>
          <span className="text-[#FF9A42]">↗</span>
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NEWS CARD (grid)
══════════════════════════════════════════════════════════════════════════ */

const NewsCard: React.FC<{ post: Post }> = ({ post }) => {
  const { slug, title, meta, publishedAt, heroImage } = post
  const cat = categoryLabel(post)
  const gradient = pickGradient(post.id)

  return (
    <article className="group flex flex-col rounded-[20px] overflow-hidden border border-white/[0.08] bg-[#2D2D2A] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9A42]/40">
      <Link href={`/posts/${slug}`} className="relative block overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0" style={{ backgroundImage: HATCH }} />
        </div>
        {heroImage && typeof heroImage === 'object' && (
          <Media
            resource={heroImage}
            size="33vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {cat && (
          <span className="absolute top-3 left-3 z-10 bg-white text-[#2D2D2A] font-bold text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-md">
            {cat}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <span className="font-mono text-[11px] tracking-[0.18em] text-[#FF9A42] uppercase mb-2">
          // {cat || 'newsy'}
        </span>
        <h3 className="font-rajdhani font-bold text-[20px] leading-[1.15] uppercase tracking-tight mb-2 group-hover:text-[#FF9A42] transition-colors">
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h3>
        {meta?.description && (
          <p className="text-[#E8E2D6]/60 text-[14px] line-clamp-2 flex-1">
            {meta.description}
          </p>
        )}
        <div className="mt-4 flex justify-between items-center font-mono text-[11px] tracking-[0.14em] text-[#E8E2D6]/40 uppercase">
          <span>{fmtDate(publishedAt)}</span>
          <Link href={`/posts/${slug}`} className="text-[#FF9A42] hover:underline decoration-[#FF9A42]/30">
            ↗ czytaj
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════════════════════════════════ */

const FuzzPagination: React.FC<{
  currentPage: number
  totalPages: number
  onNavigate: (page: number) => void
}> = ({ currentPage, totalPages, onNavigate }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      className="flex items-center justify-center gap-2.5 mt-14"
      aria-label="Paginacja"
    >
      <button
        disabled={!hasPrev}
        onClick={() => hasPrev && onNavigate(currentPage - 1)}
        className={[
          'h-10 px-4 rounded-xl border font-bold font-mono text-[14px] transition-all duration-200',
          hasPrev
            ? 'border-white/[0.1] text-white hover:border-white/40'
            : 'border-white/[0.04] text-white/20 cursor-not-allowed',
        ].join(' ')}
      >
        ← Poprz.
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onNavigate(p)}
          className={[
            'w-10 h-10 rounded-xl border font-bold font-mono text-[14px] transition-all duration-200',
            p === currentPage
              ? 'bg-[#FF9A42] text-[#2D2D2A] border-[#FF9A42] shadow-[0_4px_0_0_#B5641F]'
              : 'border-white/[0.1] text-[#E8E2D6]/50 hover:text-white hover:border-white/40',
          ].join(' ')}
        >
          {p}
        </button>
      ))}

      <button
        disabled={!hasNext}
        onClick={() => hasNext && onNavigate(currentPage + 1)}
        className={[
          'h-10 px-4 rounded-xl border font-bold font-mono text-[14px] transition-all duration-200',
          hasNext
            ? 'border-white/[0.1] text-white hover:border-white/40'
            : 'border-white/[0.04] text-white/20 cursor-not-allowed',
        ].join(' ')}
      >
        Nast. →
      </button>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NEWSLETTER STRIP
══════════════════════════════════════════════════════════════════════════ */

const NewsletterStrip: React.FC = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEmail('')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div
      className="mt-16 rounded-3xl overflow-hidden border p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 flex-wrap"
      style={{
        background:
          'linear-gradient(180deg, rgba(75,0,130,.4), rgba(75,0,130,.1))',
        borderColor: 'rgba(126,60,196,.4)',
      }}
    >
      <div>
        <h3 className="font-rajdhani font-bold text-3xl uppercase tracking-tight leading-none">
          Bądź na bieżąco
        </h3>
        <p className="text-[#E8E2D6]/60 text-[15px] mt-1.5 max-w-[42ch]">
          Mailowy digest raz na 2 tygodnie. Nowe wieści, zmiany w programie,
          ogłoszenia.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twoj@email.pl"
          className="px-5 py-3.5 rounded-full border border-white/[0.1] bg-black/30 text-white placeholder:text-[#E8E2D6]/40 outline-none font-rajdhani text-[15px] min-w-[240px] focus:border-[#FF9A42]/50 transition-colors"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FF9A42] text-[#2D2D2A] font-bold uppercase tracking-[0.08em] text-[14px] shadow-[0_6px_0_0_#B5641F,0_12px_32px_-8px_rgba(255,154,66,.5)] transition-all duration-150 hover:translate-y-0.5 hover:shadow-[0_4px_0_0_#B5641F,0_8px_22px_-8px_rgba(255,154,66,.5)]"
        >
          {sent ? '✓ Zapisano!' : <>Zapisz <span className="-rotate-45 inline-block font-black">→</span></>}
        </button>
      </form>
    </div>
  )
}
