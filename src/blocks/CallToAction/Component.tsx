import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container py-16">
      <div
        className="relative overflow-hidden rounded-[28px] p-14 flex items-center justify-between gap-8 flex-wrap border-2 border-graphite"
        style={{
          background:
            'radial-gradient(60% 100% at 0% 100%, rgba(75,0,130,0.5), transparent 60%), linear-gradient(180deg, #ff9a42, #e07a28)',
          boxShadow: '0 12px 0 0 #B5641F, 0 30px 60px -10px rgba(255,154,66,0.4)',
        }}
      >
        {/* Decorative blur blob */}
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-red/50 blur-[40px] pointer-events-none" />

        <div className="max-w-[46ch] relative z-10">
          {richText && (
            <RichText
              className="mb-0 text-graphite [&_h1]:text-graphite [&_h2]:text-graphite [&_h3]:text-graphite [&_p]:text-graphite/80 [&_h1]:uppercase [&_h2]:uppercase [&_strong]:font-bold"
              data={richText}
              enableGutter={false}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 relative z-10 flex-shrink-0">
          {(links || []).map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                size="lg"
                {...link}
                className="inline-flex items-center gap-3 bg-graphite text-cream px-8 py-[18px] rounded-full font-bold uppercase tracking-[0.14em] text-base shadow-[0_6px_0_0_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-transform duration-200"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
