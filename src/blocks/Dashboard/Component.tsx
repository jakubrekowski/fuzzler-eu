'use client'

import React from 'react'
import type { DashboardBlock as DashboardBlockProps, Media } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { HighlightedText } from '@/components/HighlightedText'
import { cn } from '@/utilities/ui'
import * as LucideIcons from 'lucide-react'
import { MapPin } from 'lucide-react'
import Image from 'next/image'

type StatCard = DashboardBlockProps['stat1']

export const DashboardBlockComponent: React.FC<DashboardBlockProps> = (props) => {
  const {
    tagline,
    title,
    description,
    mainMedia,
    stat1,
    stat2,
    infoCard,
    features,
    featuresTagline,
    anchor,
  } = props

  const renderIcon = (iconName: string | null | undefined, size: number = 24) => {
    if (!iconName) return null
    const normalizedName = iconName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')

    const IconComponent = (LucideIcons as any)[normalizedName] || (LucideIcons as any)[iconName]

    if (IconComponent) {
      return <IconComponent size={size} />
    }
    return <MapPin size={size} />
  }

  const renderStatCard = (stat: StatCard) => {
    if (!stat) return null
    const { title: sTitle, value, color } = stat
    const colorKey = (color as 'orange' | 'red' | 'purple' | 'graphite') || 'orange'
    const colorClasses = {
      orange:
        'bg-orange text-graphite shadow-[0_8px_0_0_#b36500,0_16px_32px_-10px_rgba(255,144,0,0.35)]',
      red: 'bg-red-500 text-white shadow-[0_8px_0_0_#991b1b,0_16px_32px_-10px_rgba(239,68,68,0.35)]',
      purple:
        'bg-purple-600 text-white shadow-[0_8px_0_0_#6b21a8,0_16px_32px_-10px_rgba(147,51,234,0.35)]',
      graphite:
        'bg-zinc-800 text-white shadow-[0_8px_0_0_#18181b,0_16px_32px_-10px_rgba(0,0,0,0.5)]',
    }[colorKey]

    const isLightText = colorKey === 'orange'

    return (
      <div
        className={cn(
          'rounded-2xl p-5 flex flex-col justify-center min-h-[120px]',
          colorClasses,
        )}
      >
        <p
          className={cn(
            'text-[9px] font-mono uppercase tracking-[0.2em] font-bold opacity-70 mb-1',
            isLightText ? 'text-graphite' : 'text-white/80',
          )}
        >
          <HighlightedText>{sTitle}</HighlightedText>
        </p>
        <h4
          className={cn(
            'text-2xl font-black uppercase tracking-tight font-rajdhani leading-none',
            isLightText ? 'text-graphite' : 'text-white',
          )}
        >
          <HighlightedText>{value}</HighlightedText>
        </h4>
      </div>
    )
  }

  const hasDojazd = Boolean(featuresTagline || (features && features.length > 0))

  return (
    <div className="container py-24" id={anchor || undefined}>
      {(tagline || title || description) && (
        <div className="mb-16">
          <SectionHeader
            tagline={tagline || undefined}
            title={title || ''}
            description={description || undefined}
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Map — left column */}
        <div className="lg:flex-[3] relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group min-h-[360px] lg:min-h-[480px]">
          {mainMedia?.type === 'map' && mainMedia.mapUrl ? (
            <iframe
              src={mainMedia.mapUrl}
              className="absolute inset-0 w-full h-full border-0 grayscale invert contrast-[1.2] brightness-[0.8] opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : mainMedia?.image ? (
            <Image
              src={(mainMedia.image as Media).url || ''}
              alt={mainMedia.title || ''}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
              <MapPin className="text-white/5" size={120} />
            </div>
          )}

          {mainMedia?.title && (
            <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                <HighlightedText>{mainMedia.title}</HighlightedText>
              </span>
            </div>
          )}
        </div>

        {/* Sidebar — right column */}
        <div className="lg:flex-[2] flex flex-col justify-center gap-5 min-w-0">
          {/* Stat cards */}
          {(stat1 || stat2) && (
            <div className="grid grid-cols-2 gap-4">
              {renderStatCard(stat1)}
              {renderStatCard(stat2)}
            </div>
          )}

          {/* Info card */}
          {infoCard?.title && (
            <div className="rounded-2xl p-6 bg-zinc-900/60 border border-white/10 flex flex-col justify-center">
              <h4 className="text-xl font-black uppercase tracking-tight font-rajdhani mb-3 text-white leading-none">
                <HighlightedText>{infoCard.title}</HighlightedText>
              </h4>
              {infoCard.content && (
                <div className="space-y-1">
                  {infoCard.content.split('\n').map((line, i) => (
                    <p
                      key={i}
                      className="text-zinc-400 font-mono text-[11px] uppercase tracking-wide leading-relaxed"
                    >
                      <HighlightedText>{line}</HighlightedText>
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dojazd section */}
          {hasDojazd && (
            <div className="flex flex-col gap-3">
              {featuresTagline && (
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 px-1">
                  <HighlightedText>{featuresTagline}</HighlightedText>
                </p>
              )}
              {features && features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {features.map((feature, i) => (
                    <div
                      key={feature.id ?? i}
                      className="rounded-2xl p-4 bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-colors flex flex-col gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-orange/15 border border-orange/20 flex items-center justify-center text-orange shrink-0">
                        {renderIcon(feature.icon, 18)}
                      </div>
                      {feature.title && (
                        <h5 className="text-sm font-black uppercase tracking-wider text-white leading-tight">
                          <HighlightedText>{feature.title}</HighlightedText>
                        </h5>
                      )}
                      {feature.description && (
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          <HighlightedText>{feature.description}</HighlightedText>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
