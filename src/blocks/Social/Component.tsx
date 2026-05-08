'use client'

import React from 'react'
import type { SocialBlock as SocialBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Image from 'next/image'

export const SocialBlockComponent: React.FC<SocialBlockProps> = (props) => {
  const { tagline, title, description, links, anchor } = props

  const renderTitle = (text: string) => {
    if (!text) return null
    const parts = text.split(/(\[\[.*?\]\])/g)
    return parts.map((part, i) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        return (
          <span key={i} className="text-[#ff9000]">
            {part.slice(2, -2)}
          </span>
        )
      }
      return part
    })
  }

  const colorVariants = {
    purple: 'bg-gradient-to-b from-[#4B0082]/30 to-[#4B0082]/5 border-[#4B0082]/50',
    orange: 'bg-gradient-to-b from-[#FF9A42]/30 to-[#F84949]/10 border-[#FF9A42]/50',
    green: 'bg-gradient-to-b from-[#79E69C]/20 to-[#79E69C]/5 border-[#79E69C]/45',
    red: 'bg-gradient-to-b from-[#F84949]/30 to-[#F84949]/10 border-[#F84949]/50',
    graphite: 'bg-zinc-900/50 border-white/10 hover:border-white/20',
  }

  const iconColors = {
    purple: '#FF9A42', // Orange icon on purple
    orange: '#FFFFFF', // White icon on orange
    green: '#79E69C', // Green icon on green
    red: '#FFFFFF', // White icon on red
    graphite: '#FF9A42', // Orange icon on graphite
  }

  return (
    <div className="container py-24" id={anchor || undefined}>
      <div className="max-w-4xl mx-auto text-center mb-16">
        {tagline && (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff9000] mb-4">
            {tagline}
          </p>
        )}
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-rajdhani leading-none mb-6">
          {renderTitle(title)}
        </h2>
        {description && (
          <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
        {links?.map((link, index) => {
          const colorKey = (link.color as keyof typeof colorVariants) || 'graphite'
          const iconColor = iconColors[colorKey].replace('#', '')
          
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-5 p-5 md:px-8 md:py-6 rounded-[32px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange/5',
                colorVariants[colorKey]
              )}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center p-3 shrink-0">
                <img
                  src={`https://cdn.simpleicons.org/${link.icon}/${iconColor}`}
                  alt={link.label}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <div className="font-bold text-xl md:text-2xl uppercase tracking-wider text-white leading-tight">
                  {link.label}
                </div>
                {link.subtext && (
                  <div className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.15em] text-zinc-500 mt-1 font-bold">
                    {link.subtext}
                  </div>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
