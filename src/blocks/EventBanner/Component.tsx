import React from 'react'

import type { EventBannerBlock as EventBannerBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { HighlightedText } from '@/components/HighlightedText'
import { cn } from '@/utilities/ui'

export const EventBannerBlockComponent: React.FC<EventBannerBlockProps> = ({
  metaLine,
  heading,
  showCapacity,
  capacityLimit,
  spotsRemaining,
  button,
}) => {
  const capacityVisible =
    showCapacity &&
    capacityLimit != null &&
    spotsRemaining != null

  return (
    <div className="container py-8">
      <div
        className="relative overflow-hidden rounded-[28px] border-2 border-graphite px-6 py-8 sm:px-10 sm:py-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        style={{
          background:
            'radial-gradient(60% 100% at 0% 100%, rgba(75,0,130,0.5), transparent 60%), linear-gradient(180deg, #ff9a42, #e07a28)',
          boxShadow: '0 30px 60px -10px rgba(255,154,66,0.4)',
        }}
      >
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-red/50 blur-[40px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3 min-w-0">
          {metaLine && (
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-graphite/80">
              // {metaLine}
            </p>
          )}

          {heading && (
            <h2 className="font-rajdhani font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.05] uppercase tracking-tight text-graphite">
              <HighlightedText highlightClassName="text-indigo">
                {heading}
              </HighlightedText>
            </h2>
          )}

          {capacityVisible && (
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-graphite">
              LIMIT MIEJSC: {capacityLimit} · ZOSTAŁO: {spotsRemaining}
            </p>
          )}
        </div>

        {button?.label && (
          <div className="relative z-10 flex-shrink-0">
            {(() => {
              const { label, appearance, ...linkProps } = button
              const resolvedAppearance =
                appearance === 'disabled'
                  ? 'disabled'
                  : appearance === 'outline'
                    ? 'outline'
                    : 'default'

              return (
                <CMSLink
                  {...linkProps}
                  appearance={resolvedAppearance}
                  size="lg"
                  label={label}
                  className={cn(
                    'inline-flex items-center bg-graphite text-cream px-8 py-[18px] rounded-full font-bold uppercase tracking-[0.14em] text-base shadow-none hover:translate-y-0 hover:shadow-none',
                    resolvedAppearance === 'disabled' && 'pointer-events-none opacity-50',
                  )}
                />
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
