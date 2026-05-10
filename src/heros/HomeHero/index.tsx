'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import { StatItem } from '@/components/ui/stat-item'
import { ArrowRight } from 'lucide-react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ActionButton } from '@/components/ActionButton'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const HomeHero: React.FC<Page['hero']> = (props) => {
  const {
    eyebrow,
    titleType,
    homeTitle,
    titleMedia,
    richText,
    meta,
    links,
    stats,
    homeArt,
  } = props

  const displayTitle = homeTitle || 'FUZZLER'
  const titleMediaUrl = typeof titleMedia === 'object' ? titleMedia?.url : null

  const displayEyebrow = eyebrow || 'Furr MeetUp · Edycja 03 · Wrzesień 2026'
  
  const displayMeta = meta || [
    { label: '4–6 września' },
    { label: 'Hotel Ameliówka' },
    { label: 'Mąchocice Kapitulne' },
  ]

  const displayStats = stats || [
    { label: 'Dni', value: '3', suffix: '/full' },
    { label: 'Paneli', value: '12', suffix: '+' },
    { label: 'Uczestników', value: '120', suffix: 'cap' },
    { label: 'Ognisk', value: '∞' },
  ]

  const artImage = typeof homeArt?.image === 'object' ? homeArt.image?.url : '/assets/bun_color.svg'
  const displayTags = homeArt?.tags || [
    { label: '★ Edycja 2026', color: 'green', rotation: -6 },
    { label: 'Hotel Ameliówka', color: 'orange', rotation: 5 },
    { label: '3 dni / 2 noce', color: 'white', rotation: -3 },
  ]

  return (
    <section className="relative overflow-hidden bg-graphite-dark border-b border-white/10 font-rajdhani text-cream selection:bg-orange/30">
      {/* Premium Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[10%] w-[60%] h-[60%] bg-indigo/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-red/10 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center py-20 lg:pt-40 lg:pb-24">
        <div className="flex flex-col animate-in fade-in slide-in-from-left duration-700">
          {/* Eyebrow Badge */}
          <Badge dot variant="default" className="w-fit">
            {displayEyebrow}
          </Badge>

          {/* Main Title with SVG-like Wing */}
          <div className="relative mt-6 group">
            {titleType === 'media' && titleMedia ? (
              <Media
                resource={titleMedia}
                alt={displayTitle}
                mediaSize={(props as any).titleSize}
                imgClassName="h-auto object-contain"
              />
            ) : (
              <h1 className="text-[clamp(64px,10vw,140px)] font-bold leading-[0.85] tracking-tight uppercase select-none">
                {displayTitle === 'FUZZLER' ? (
                  <span className="relative inline-block">
                    FUZZLER
                    <span className="absolute -top-[5%] -right-[15%] w-[40%] h-[80%] pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-cream">
                        <path d="M80,40 L60,35 C60,35 75,30 80,20 C85,10 85,0 85,0 L70,5 C70,5 75,0 72,-10 C70,-20 60,-30 60,-30 C60,-30 50,-15 45,-5 C40,5 35,10 35,10 L45,25 L48,40 C48,40 55,42 60,42 C65,42 80,40 80,40 Z" />
                      </svg>
                    </span>
                  </span>
                ) : (
                  displayTitle
                )}
              </h1>
            )}
          </div>

          <div className="mt-6 text-[22px] text-cream-dim max-w-[520px] leading-relaxed">
            {richText ? (
              <RichText data={richText} enableGutter={false} className="prose-invert" />
            ) : (
              'Chill, integracja i futrzaki. Trzy dni offline z ludźmi, których kojarzysz tylko z nicków na Telegramie.'
            )}
          </div>

          {/* Meta Info */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3.5 text-[15px] text-cream-dim uppercase tracking-[0.1em] font-semibold">
            {displayMeta.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange rotate-45" />
                {item.label}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-4">
            {Array.isArray(links) && links.length > 0 ? (
              links.map(({ link }, i) => (
                <ActionButton key={i} link={link} />
              ))
            ) : (
              <>
                <Badge variant="orange" className="h-12 px-6 rounded-full cursor-pointer">
                  Zapisz się <ArrowRight className="ml-2 w-4 h-4 -rotate-45" />
                </Badge>
                <Badge variant="outline" className="h-12 px-6 rounded-full cursor-pointer">
                  Zobacz program
                </Badge>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-6">
            {displayStats.map((stat, i) => (
              <StatItem
                key={i}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix || undefined}
              />
            ))}
          </div>
        </div>

        {/* Hero Art */}
        <div className="relative aspect-square w-full max-w-[600px] mx-auto lg:ml-auto animate-in fade-in zoom-in duration-1000">
          <div className="absolute inset-0 grid place-items-center">
            {/* Background Shape */}
            <div
              className="absolute inset-[6%] rounded-[32px] overflow-hidden"
              style={{
                background:
                  'conic-gradient(from 220deg at 50% 50%, var(--color-indigo) 0deg, var(--color-red) 120deg, var(--color-orange) 240deg, var(--color-indigo) 360deg)',
                boxShadow:
                  'inset 0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px -30px rgba(75,0,130,0.6)',
              }}
            >
              {/* Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent 0 18px, rgba(0,0,0,0.5) 18px 19px), radial-gradient(60% 50% at 50% 30%, transparent 0%, rgba(0,0,0,0.8) 100%)',
                }}
              />
            </div>

            {/* Mascot Image */}
            {homeArt?.image && (
              <Media
                resource={homeArt.image}
                alt="Hero Art"
                mediaSize={(homeArt as any).imageSize}
                imgClassName="relative z-10 h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] transition-transform duration-700 hover:scale-[1.02]"
              />
            )}

            {/* Tags */}
            {displayTags.map((tag, i) => (
              <Badge
                key={i}
                variant={tag.color as any || 'white'}
                className="absolute z-20 rounded-lg shadow-[0_6px_0_0_rgba(0,0,0,0.25)] whitespace-nowrap"
                style={{
                  transform: `rotate(${tag.rotation}deg)`,
                  top: i === 0 ? '8%' : 'auto',
                  left: i === 0 ? '-2%' : i === 2 ? '18%' : 'auto',
                  bottom: i === 1 ? '14%' : i === 2 ? '-2%' : 'auto',
                  right: i === 1 ? '-4%' : 'auto',
                }}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
