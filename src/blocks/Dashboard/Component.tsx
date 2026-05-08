'use client'

import React from 'react'
import type { DashboardBlock as DashboardBlockProps, Media } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'
import * as LucideIcons from 'lucide-react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import Image from 'next/image'

export const DashboardBlockComponent: React.FC<DashboardBlockProps> = (props) => {
  const { tagline, title, description, mainMedia, stat1, stat2, infoCard, features, featuresTagline, anchor } = props

  const renderIcon = (iconName: string | null | undefined, size: number = 24) => {
    if (!iconName) return null
    const normalizedName = iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')
    
    const IconComponent = (LucideIcons as any)[normalizedName] || (LucideIcons as any)[iconName]
    
    if (IconComponent) {
      return <IconComponent size={size} />
    }
    return <MapPin size={size} />
  }

  const renderStatCard = (stat: any) => {
    if (!stat) return null
    const { title: sTitle, value, color } = stat
    const colorKey = (color as 'orange' | 'red' | 'purple' | 'graphite') || 'orange'
    const colorClasses = {
      orange: 'bg-orange text-graphite shadow-[0_12px_0_0_#b36500,0_20px_40px_-10px_rgba(255,144,0,0.4)]',
      red: 'bg-red-500 text-white shadow-[0_12px_0_0_#991b1b,0_20px_40px_-10px_rgba(239,68,68,0.4)]',
      purple: 'bg-purple-600 text-white shadow-[0_12px_0_0_#6b21a8,0_20px_40px_-10px_rgba(147,51,234,0.4)]',
      graphite: 'bg-zinc-800 text-white shadow-[0_12px_0_0_#18181b,0_20px_40px_-10px_rgba(0,0,0,0.5)]',
    }[colorKey]

    return (
      <div className={cn(
        "relative group rounded-[40px] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 active:translate-y-2 cursor-default h-full",
        colorClasses
      )}>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] font-black opacity-60 mb-2">
            {sTitle}
          </p>
          <h4 className="text-4xl font-black uppercase tracking-tight font-rajdhani leading-none">
            {value}
          </h4>
        </div>
        <ArrowUpRight className="absolute top-8 right-10 opacity-30 group-hover:opacity-100 transition-opacity" size={28} />
      </div>
    )
  }

  return (
    <div className="container py-24" id={anchor || undefined}>
      {/* Header */}
      {(tagline || title || description) && (
        <div className="mb-16">
          <SectionHeader 
            tagline={tagline || undefined} 
            title={title || ''} 
            description={description || undefined} 
          />
        </div>
      )}

      {/* Static Mosaic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(140px,auto)] gap-6">
        {/* Main Content (Left Side) - Spans all rows on the right */}
        <div className="md:col-span-8 md:row-span-3 lg:row-span-3 relative rounded-[40px] overflow-hidden bg-zinc-900 border border-white/10 group min-h-[400px]">
          {mainMedia?.type === 'map' && mainMedia.mapUrl ? (
            <iframe
              src={mainMedia.mapUrl}
              className="w-full h-full border-0 grayscale invert contrast-[1.2] brightness-[0.8] opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : mainMedia?.image ? (
            <Image 
              src={(mainMedia.image as Media).url || ''} 
              alt={mainMedia.title || ''} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
              <MapPin className="text-white/5" size={120} />
            </div>
          )}
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {mainMedia?.title && (
            <div className="absolute top-8 right-8 px-5 py-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white">
                {mainMedia.title}
              </span>
            </div>
          )}
        </div>

        {/* Top Row Right: Stat Cards */}
        <div className="md:col-span-2 md:row-span-1 h-[160px] md:h-full">
          {renderStatCard(stat1)}
        </div>
        <div className="md:col-span-2 md:row-span-1 h-[160px] md:h-full">
          {renderStatCard(stat2)}
        </div>

        {/* Middle Row Right: Info Card */}
        <div className="md:col-span-4 md:row-span-1 rounded-[40px] p-8 bg-zinc-900/40 border border-white/10 backdrop-blur-sm flex flex-col justify-center hover:bg-zinc-900/60 transition-colors duration-300">
          <h4 className="text-2xl font-black uppercase tracking-tight font-rajdhani mb-4 text-white leading-none">
            {infoCard?.title}
          </h4>
          <div className="space-y-1">
            {infoCard?.content?.split('\n').map((line, i) => (
              <p key={i} className="text-zinc-400 font-mono text-[12px] uppercase tracking-wide">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom Row Right: Features Tagline + Row */}
        <div className="md:col-span-4 md:row-span-1 flex flex-col gap-4">
          {featuresTagline && (
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 px-2">
              {featuresTagline}
            </p>
          )}
          <div className="grid grid-cols-3 gap-4 flex-1">
            {features?.map((feature, i) => (
              <div 
                key={i} 
                className="rounded-[32px] p-4 bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all group flex flex-col items-center justify-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-orange mb-3 group-hover:bg-orange group-hover:text-graphite transition-all duration-300 shrink-0">
                  {renderIcon(feature.icon, 20)}
                </div>
                <h5 className="text-[9px] font-black uppercase tracking-widest text-white leading-tight">
                  {feature.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
