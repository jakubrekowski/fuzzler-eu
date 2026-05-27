'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import { StatItem } from '@/components/ui/stat-item'
import { ArrowRight } from 'lucide-react'
import type { Page } from '@/payload-types'
import { ActionButton } from '@/components/ActionButton'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { HighlightedText } from '@/components/HighlightedText'

export const HomeHero: React.FC<Page['hero']> = (props) => {
  const { eyebrow, titleType, homeTitle, titleMedia, richText, meta, links, stats, homeArt } = props

  const displayTitle = homeTitle || 'FUZZLER'

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

      <div className="container relative z-10 grid min-w-0 lg:grid-cols-[1.15fr_1fr] gap-12 items-center py-20 lg:pt-40 lg:pb-24">
        <div className="flex min-w-0 max-w-full flex-col animate-in fade-in slide-in-from-left duration-700">
          {/* Eyebrow Badge */}
          <Badge dot variant="default" className="w-fit">
            <HighlightedText>{displayEyebrow}</HighlightedText>
          </Badge>

          {/* Main Title with SVG-like Wing */}
          <div className="relative mt-6 min-w-0 max-w-full group">
            {titleType === 'media' && titleMedia ? (
              <div className="w-full max-w-[min(100%,15rem)] sm:max-w-[min(100%,18rem)] md:max-w-[min(100%,22rem)] lg:max-w-[400px]">
                <Media
                  resource={titleMedia}
                  mediaSize="medium"
                  priority
                  htmlElement={null}
                  pictureClassName="block w-full max-w-full"
                  imgClassName="h-auto w-full max-w-full object-contain object-left"
                />
              </div>
            ) : (
              <h1 className="w-full min-w-0 max-w-full text-[clamp(1.6875rem,8.75vw,3.5rem)] font-bold leading-[0.85] tracking-tighter uppercase select-none sm:text-[clamp(1.875rem,10vw,4.25rem)] md:text-[clamp(2rem,8.5vw,5rem)] lg:text-[clamp(2.375rem,7vw,6.875rem)] lg:tracking-tight">
                {displayTitle === 'FUZZLER' ? (
                  <span className="relative inline-block">
                    FUZZLER
                    <span className="absolute -top-[6%] right-0 w-[22%] h-[62%] sm:-top-[5%] sm:right-[-6%] sm:w-[26%] sm:h-[68%] md:right-[-8%] md:w-[30%] md:h-[72%] lg:-right-[15%] lg:w-[40%] lg:h-[80%] pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-cream">
                        <path d="M80,40 L60,35 C60,35 75,30 80,20 C85,10 85,0 85,0 L70,5 C70,5 75,0 72,-10 C70,-20 60,-30 60,-30 C60,-30 50,-15 45,-5 C40,5 35,10 35,10 L45,25 L48,40 C48,40 55,42 60,42 C65,42 80,40 80,40 Z" />
                      </svg>
                    </span>
                  </span>
                ) : (
                  <HighlightedText>{displayTitle}</HighlightedText>
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
                <HighlightedText>{item.label}</HighlightedText>
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-4">
            {Array.isArray(links) && links.length > 0 ? (
              links.map(({ link }, i) => <ActionButton key={i} link={link} />)
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
        <div className="relative mx-auto aspect-square w-full min-w-0 max-w-[min(100%,600px)] lg:ml-auto animate-in fade-in zoom-in duration-1000 max-lg:overflow-x-clip">
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
              <div className="relative z-10 mx-auto w-[78%] min-w-0 max-w-full">
                <Media
                  resource={homeArt.image}
                  mediaSize="large"
                  htmlElement={null}
                  imgClassName="relative z-10 h-auto w-full max-w-full object-contain drop-shadow-[0_30px_50_rgba(0,0,0,0.55)] transition-transform duration-700 hover:scale-[1.02] block"
                />
              </div>
            )}

            {/* Tags */}
            {displayTags.map((tag, i) => {
              const cornerPosition =
                i === 0
                  ? 'top-[8%] left-2 lg:left-[-2%]'
                  : i === 1
                    ? 'bottom-[12%] right-2 lg:bottom-[14%] lg:right-[-4%]'
                    : 'bottom-2 left-[10%] lg:bottom-[-2%] lg:left-[18%]'
              return (
                <Badge
                  key={i}
                  variant={(tag.color as any) || 'white'}
                  className={cn(
                    'absolute z-20 max-w-[min(100vw-3rem,18rem)] rounded-lg shadow-[0_6px_0_0_rgba(0,0,0,0.25)] whitespace-normal px-3 py-1.5 text-center leading-tight sm:max-w-none sm:whitespace-nowrap lg:px-2.5 lg:py-0.5 lg:leading-none',
                    cornerPosition,
                  )}
                  style={{ transform: `rotate(${tag.rotation}deg)` }}
                >
                  <HighlightedText>{tag.label}</HighlightedText>
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
