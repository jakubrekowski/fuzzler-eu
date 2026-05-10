'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'

export const SubPageHero: React.FC<Page['hero']> = ({ links, richText, eyebrow }) => {
  return (
    <section className="relative bg-graphite-dark font-rajdhani text-cream overflow-hidden py-24 lg:py-40 border-b border-white/10">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-indigo/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange/5 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        {eyebrow && (
          <Badge dot variant="default" className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {eyebrow}
          </Badge>
        )}

        <div className="max-w-[56rem]">
          {richText && (
            <RichText
              className="mb-10 prose-h1:text-[clamp(48px,8vw,96px)] prose-h1:font-bold prose-h1:uppercase prose-h1:tracking-tight prose-h1:leading-[0.85] prose-p:text-xl prose-p:text-cream-dim prose-em:not-italic prose-em:text-orange"
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 flex-wrap animate-in fade-in slide-in-from-bottom-6 duration-1000">
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
    </section>
  )
}
