import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="bg-graphite-dark font-rajdhani text-cream py-20 lg:py-32 border-b border-white/10">
      <div className="container">
        <div className="max-w-[48rem]">
          {children || (
            richText && (
              <RichText
                className="prose-h1:text-[clamp(36px,5vw,60px)] prose-h1:font-bold prose-h1:uppercase prose-h1:tracking-tight prose-h1:leading-[0.95] prose-p:text-lg prose-p:text-cream-dim"
                data={richText}
                enableGutter={false}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
