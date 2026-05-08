import React from 'react'
import type { PricingBlock as PricingBlockProps } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'
import { Check, Minus } from 'lucide-react'
import { Media } from '@/components/Media'
import { ActionButton } from '@/components/ActionButton'

export const PricingBlockComponent: React.FC<PricingBlockProps> = (props) => {
  const {
    tagline,
    title,
    description,
    plans,
    rows,
    hotelCard,
    packageType,
    packageCard,
    packageMedia,
    link,
    anchor,
  } = props

  const numPlans = plans?.length || 0
  const gridTemplateColumns = `1.5fr repeat(${numPlans}, minmax(0, 1fr))`

  return (
    <div className="container py-24" id={anchor || undefined}>
      <SectionHeader tagline={tagline} title={title} description={description} />

      {/* Pricing Table */}
      <div className="bg-[#1a1a1a]/50 border border-white/10 rounded-[32px] overflow-hidden mb-12 shadow-2xl backdrop-blur-sm">
        {/* Table Header */}
        <div
          className="grid border-b border-white/10 bg-white/[0.02]"
          style={{ gridTemplateColumns }}
        >
          <div className="p-8 md:p-12">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
              KORZYŚCI
            </span>
            <p className="mt-4 text-zinc-400 text-xs font-mono uppercase tracking-[0.2em]">
              CO DOSTAJESZ W PAKIECIE
            </p>
          </div>
          {plans?.map((plan, i) => (
            <div
              key={i}
              className="p-8 md:p-12 border-l border-white/10 text-center flex flex-col items-center justify-center relative"
            >
              {plan.badge && (
                <div className="absolute top-8 flex items-center gap-1.5 bg-zinc-800 text-white text-[9px] px-2 py-1 rounded uppercase font-bold tracking-widest border border-white/10">
                  <span className="text-orange-400">★</span> {plan.badge}
                </div>
              )}
              <div
                className={cn(
                  'mt-4 text-xs font-mono uppercase tracking-[0.2em]',
                  i === 0 ? 'text-zinc-400' : 'text-orange-400',
                )}
              >
                {plan.name}
              </div>
              <div className="text-4xl md:text-5xl font-bold font-rajdhani mt-2">
                {plan.price.split(' ')[0]}{' '}
                <span className="text-xl md:text-2xl text-zinc-500 font-normal">
                  {plan.price.split(' ')[1]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/5">
          {rows?.map((row, i) => (
            <div
              key={i}
              className="grid hover:bg-white/[0.01] transition-colors"
              style={{ gridTemplateColumns }}
            >
              <div className="p-6 md:px-12 md:py-8 text-zinc-300">
                <div className="text-sm font-bold uppercase tracking-widest font-rajdhani">
                  {row.name}
                </div>
                {row.description && (
                  <p className="mt-1.5 text-zinc-500 text-xs leading-relaxed max-w-sm">
                    {row.description}
                  </p>
                )}
              </div>
              {plans?.map((_, planIndex) => {
                const isChecked = row.checks?.[planIndex]?.checked
                return (
                  <div
                    key={planIndex}
                    className="p-6 md:py-8 border-l border-white/5 flex items-center justify-center"
                  >
                    {isChecked ? (
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110',
                          planIndex === 0
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-green-500/20 text-green-400',
                        )}
                      >
                        <Check size={18} strokeWidth={3} />
                      </div>
                    ) : (
                      <Minus size={18} className="text-zinc-800" />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
        {/* Hotel Card */}
        <div className="bg-[#222] border border-white/10 rounded-[32px] overflow-hidden flex flex-col md:flex-row relative group min-h-[340px]">
          {/* Glow effect */}
          <div className="absolute -inset-24 bg-purple-600/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="w-full md:w-[42%] relative z-10 shrink-0 overflow-hidden">
            {hotelCard?.image && (
              <Media
                resource={hotelCard.image}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fill
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#222]/90 hidden md:block pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#222]/90 to-transparent md:hidden pointer-events-none" />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-10 relative z-10 flex-1">
            <h4 className="text-3xl font-bold uppercase tracking-tight font-rajdhani mb-1">
              {hotelCard?.title}
            </h4>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-6">
              {hotelCard?.address}
            </p>

            {hotelCard?.price && (
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-[#ff9000] font-rajdhani">
                  {hotelCard.price.split(' ')[0]} {hotelCard.price.split(' ')[1]}
                </span>
                <span className="text-zinc-500 text-sm">{hotelCard?.priceSuffix}</span>
              </div>
            )}

            <ul className="space-y-2">
              {hotelCard?.details?.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-zinc-400 text-[13px] leading-snug"
                >
                  <span className="text-orange-500 mt-1">✦</span>
                  {detail.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Package & CTA Card */}
        <div className="flex flex-col gap-6">
          {packageType === 'media' && packageMedia ? (
            <div className="flex-1 bg-[#1a0b2e] border border-purple-500/20 rounded-[32px] overflow-hidden relative group">
              <Media
                resource={packageMedia}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fill
              />
            </div>
          ) : (
            <div className="flex-1 bg-[#1a0b2e] border border-purple-500/20 rounded-[32px] p-10 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl rounded-full" />
              <p className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.3em] mb-4">
                {packageCard?.tagline}
              </p>
              <h4 className="text-3xl font-bold uppercase tracking-tight font-rajdhani mb-4">
                {packageCard?.title}
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{packageCard?.description}</p>
            </div>
          )}

          {link && (
            <ActionButton 
              link={link} 
              size="lg" 
              className="w-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}
