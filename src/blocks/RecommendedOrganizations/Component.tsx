'use client'

import React, { useEffect, useState } from 'react'

import type { Media, RecommendedOrganizationsBlock } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import { SectionHeader } from '@/components/SectionHeader'
import { HighlightedText } from '@/components/HighlightedText'

type Organization = NonNullable<RecommendedOrganizationsBlock['organizations']>[number]

const ROTATION_INTERVAL = 6000

export const RecommendedOrganizationsBlockComponent: React.FC<
  RecommendedOrganizationsBlock & { disableInnerContainer?: boolean }
> = ({ anchor, tagline, title, description, organizations }) => {
  const items = organizations ?? []
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % items.length)
    }, ROTATION_INTERVAL)

    return () => window.clearInterval(interval)
  }, [items.length])

  useEffect(() => {
    if (activeIndex >= items.length) setActiveIndex(0)
  }, [activeIndex, items.length])

  if (items.length === 0) return null

  const organization = items[activeIndex] as Organization
  const image = typeof organization.image === 'object' ? (organization.image as Media) : null
  const hasLink = Boolean(organization.link?.url)
  const content = (
    <>
      <div className="relative aspect-video overflow-hidden bg-graphite">
        {image ? (
          <MediaComponent
            resource={image}
            fill
            className="absolute inset-0"
            imgClassName="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 p-6 sm:p-7 lg:p-8">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-orange">
            // POLECAM ALLEGROWICZA
          </p>
          <h3 className="font-rajdhani text-3xl font-bold uppercase leading-none tracking-tight text-cream sm:text-4xl">
            <HighlightedText>{organization.name}</HighlightedText>
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            <HighlightedText>{organization.description}</HighlightedText>
          </p>
        </div>
        {hasLink && (
          <span className="inline-flex self-start rounded-full border border-orange/70 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-orange transition-colors group-hover:bg-orange group-hover:text-graphite">
            {organization.link.label} <span aria-hidden>→</span>
          </span>
        )}
      </div>
    </>
  )

  const cardClassName =
    'group grid overflow-hidden rounded-[28px] border border-cream/15 bg-graphite-dark shadow-2xl transition-colors duration-300 hover:border-orange/60 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]'

  return (
    <section className="container py-14 sm:py-16" id={anchor || undefined}>
      <SectionHeader
        tagline={tagline || undefined}
        title={title}
        description={description || undefined}
        className="mb-8 sm:mb-10"
      />

      <div className="relative">
        <div
          className="animate-in fade-in slide-in-from-bottom-3 duration-700"
          key={organization.id ?? activeIndex}
        >
          {hasLink ? (
            <CMSLink {...organization.link} className={cardClassName}>
              {content}
            </CMSLink>
          ) : (
            <article className={cardClassName}>{content}</article>
          )}
        </div>

        {items.length > 1 && (
          <div
            className="mt-5 flex items-center justify-center gap-2"
            aria-label="Polecane organizacje"
          >
            {items.map((item, index) => (
              <button
                aria-label={`Pokaż: ${item.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-8 bg-orange' : 'w-2.5 bg-cream/30 hover:bg-cream/60'
                }`}
                key={item.id ?? index}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
