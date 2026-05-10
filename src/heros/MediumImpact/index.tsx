import React from 'react'
import { cn } from '@/utilities/ui'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative bg-graphite-dark font-rajdhani overflow-hidden py-24 lg:py-32 border-b border-white/10 text-cream">
      {/* Subtle Background Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo/10 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        <div>
          {richText && (
            <RichText
              className="mb-8 prose-h1:text-[clamp(40px,6vw,72px)] prose-h1:font-bold prose-h1:uppercase prose-h1:tracking-tight prose-h1:leading-[0.95] prose-p:text-lg prose-p:text-cream-dim prose-em:not-italic prose-em:text-orange"
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4 flex-wrap">
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

        {media && typeof media === 'object' && (
          <div className="relative">
            <div className="relative z-10 rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
              <Media
                className="aspect-[4/3]"
                imgClassName="object-cover h-full w-full"
                mediaSize="large"
                priority
                resource={media}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            {/* Glass decoration */}
            <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full -z-10" />
            
            {media?.caption && (
              <div className="mt-4 text-sm text-cream-dim italic font-medium px-2">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
