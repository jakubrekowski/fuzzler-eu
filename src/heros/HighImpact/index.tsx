'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex items-center justify-center text-cream bg-graphite-dark font-rajdhani overflow-hidden py-32 lg:py-48">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-indigo/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange/10 blur-[120px] rounded-full" />
      </div>

      <div className="container z-10 relative flex flex-col items-center justify-center text-center">
        <div className="max-w-[48rem]">
          {richText && (
            <RichText
              className="mb-8 prose-h1:text-[clamp(48px,8vw,90px)] prose-h1:font-bold prose-h1:uppercase prose-h1:tracking-tight prose-h1:leading-[0.9] prose-p:text-xl prose-p:text-cream-dim"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 flex-wrap">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      className={cn(
                        'h-12 px-8 rounded-full flex items-center justify-center font-bold uppercase tracking-wider text-sm transition-all duration-300',
                        i === 0
                          ? 'bg-orange text-graphite-dark hover:scale-105 hover:shadow-[0_0_20px_rgba(255,154,66,0.4)]'
                          : 'border border-white/10 hover:bg-white/5 hover:border-white/20',
                      )}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-0 opacity-30">
          <Media
            fill
            imgClassName="object-cover"
            mediaSize="xlarge"
            priority
            resource={media}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-graphite-dark via-transparent to-graphite-dark" />
        </div>
      )}
    </div>
  )
}
