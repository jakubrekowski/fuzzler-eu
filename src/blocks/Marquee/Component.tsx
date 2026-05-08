'use client'

import React, { useId } from 'react'
import { cn } from '@/utilities/ui'

export type MarqueeBlockProps = {
  items?: Array<{ text: string }>
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  separator?: string
  colorScheme?: 'orange' | 'dark' | 'transparent'
  /** Set by RenderBlocks — ignored here */
  disableInnerContainer?: boolean
  blockType?: string
}

const SPEED_MAP = {
  slow: '60s',
  normal: '38s',
  fast: '18s',
}

/**
 * Seamless infinite marquee.
 *
 * The trick: render the track content TWICE inside the same flex container,
 * then animate translateX(0 → -50%). When -50% is reached the first copy has
 * scrolled fully off-screen and the second copy is exactly where the first
 * started — the browser jumps back to 0 which is visually invisible.
 * No JS, no ResizeObserver, no requestAnimationFrame needed.
 */
export const MarqueeBlockComponent: React.FC<MarqueeBlockProps> = ({
  items,
  speed = 'normal',
  direction = 'left',
  separator = '✦',
  colorScheme = 'orange',
}) => {
  const uid = useId()

  const displayItems =
    items && items.length > 0
      ? items
      : [
          { text: 'FUZZLER' },
          { text: '04.09' },
          { text: '05.09' },
          { text: '06.09' },
          { text: 'AMELIÓWKA' },
          { text: 'CHILL · INTEGRACJA · FUTRZAKI' },
        ]

  const duration = SPEED_MAP[speed] ?? SPEED_MAP.normal
  const reverse = direction === 'right'

  const schemeClasses: Record<string, string> = {
    orange: 'bg-orange text-graphite border-y-2 border-graphite-dark',
    dark: 'bg-graphite-dark text-cream border-y border-white/[0.08]',
    transparent: 'bg-transparent text-cream',
  }

  // Build a single segment: all items separated by the separator glyph
  const Segment = () => (
    <span className="flex items-center gap-7 shrink-0" aria-hidden>
      {displayItems.map((item, i) => (
        <React.Fragment key={i}>
          <span className="font-bold uppercase tracking-[0.14em] text-[18px]">{item.text}</span>
          <span
            className={cn(
              'text-[18px] shrink-0',
              colorScheme === 'orange' ? 'text-indigo' : 'text-orange',
            )}
          >
            {separator}
          </span>
        </React.Fragment>
      ))}
    </span>
  )

  return (
    <div
      className={cn(
        'relative overflow-hidden py-3.5 select-none font-rajdhani',
        schemeClasses[colorScheme] ?? schemeClasses.orange,
      )}
      aria-label="Marquee strip"
      role="marquee"
    >
      {/* Inject keyframe scoped to this instance so multiple marquees on one
          page can run at different speeds / directions independently. */}
      <style>{`
        @keyframes fuzzler-marquee-${uid.replace(/:/g, '')} {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track-${uid.replace(/:/g, '')} {
          animation: fuzzler-marquee-${uid.replace(/:/g, '')} ${duration} linear infinite;
          ${reverse ? 'animation-direction: reverse;' : ''}
        }
      `}</style>

      {/* The track: TWO identical copies — seamless loop */}
      <div
        className={`flex whitespace-nowrap gap-7 w-max marquee-track-${uid.replace(/:/g, '')}`}
      >
        <Segment />
        <Segment />
      </div>
    </div>
  )
}
