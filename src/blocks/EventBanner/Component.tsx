"use client"

import React, { useEffect, useState } from 'react'

import type { EventBannerBlock as EventBannerBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { HighlightedText } from '@/components/HighlightedText'
import { cn } from '@/utilities/ui'
import { getPublicApiUrl } from '@/utilities/publicApi'

interface Capacity {
  totalCapacity: number
  blockedUnoccupiedCapacity: number
  availableUnoccupiedCapacity: number
}

interface HotelAvailabilityResponse {
  overall: Capacity
  hotels: Array<{ id: string; availability: Capacity }>
}

function sumCapacity(capacities: Capacity[]): Capacity {
  return capacities.reduce(
    (sum, capacity) => ({
      totalCapacity: sum.totalCapacity + capacity.totalCapacity,
      blockedUnoccupiedCapacity: sum.blockedUnoccupiedCapacity + capacity.blockedUnoccupiedCapacity,
      availableUnoccupiedCapacity: sum.availableUnoccupiedCapacity + capacity.availableUnoccupiedCapacity,
    }),
    { totalCapacity: 0, blockedUnoccupiedCapacity: 0, availableUnoccupiedCapacity: 0 },
  )
}

export const EventBannerBlockComponent: React.FC<EventBannerBlockProps> = ({
  metaLine,
  heading,
  showCapacity,
  capacityLimit,
  spotsRemaining,
  capacitySource,
  capacityApiProtocol,
  capacityApiDomain,
  capacityScope,
  selectedHotelIds,
  button,
}) => {
  const [apiCapacity, setApiCapacity] = useState<Capacity | null>(null)
  const [capacityError, setCapacityError] = useState<string | null>(null)
  const usesApiCapacity = showCapacity && capacitySource === 'api'

  useEffect(() => {
    if (!usesApiCapacity) {
      setApiCapacity(null)
      setCapacityError(null)
      return
    }

    let endpoint: string
    try {
      endpoint = getPublicApiUrl(capacityApiProtocol, capacityApiDomain, '/api/public/v1/hotels/availability')
    } catch (error) {
      setApiCapacity(null)
      setCapacityError(error instanceof Error ? error.message : 'Nie udało się ustawić API hoteli.')
      return
    }

    const controller = new AbortController()
    setApiCapacity(null)
    setCapacityError(null)
    fetch(endpoint, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Nie udało się pobrać liczby miejsc (HTTP ${res.status}).`)
        return res.json() as Promise<HotelAvailabilityResponse>
      })
      .then((data) => {
        if (!data.overall || !Array.isArray(data.hotels)) {
          throw new Error('API zwróciło nieprawidłowy format dostępności hoteli.')
        }

        if (capacityScope === 'selectedHotels') {
          const ids = new Set(
            (selectedHotelIds ?? '')
              .split(',')
              .map((id) => id.trim())
              .filter(Boolean),
          )
          const hotels = data.hotels.filter((hotel) => ids.has(hotel.id))
          if (ids.size === 0) throw new Error('Nie wybrano hoteli do wyświetlenia.')
          if (hotels.length !== ids.size) throw new Error('Nie znaleziono co najmniej jednego wybranego hotelu.')
          setApiCapacity(sumCapacity(hotels.map((hotel) => hotel.availability)))
        } else {
          setApiCapacity(data.overall)
        }
      })
      .catch((error: unknown) => {
        if (typeof error === 'object' && error && 'name' in error && error.name === 'AbortError') return
        setApiCapacity(null)
        setCapacityError(error instanceof Error ? error.message : 'Nie udało się pobrać liczby miejsc.')
      })

    return () => controller.abort()
  }, [usesApiCapacity, capacityApiProtocol, capacityApiDomain, capacityScope, selectedHotelIds])

  const displayedCapacity = usesApiCapacity
    ? apiCapacity && {
        limit: apiCapacity.totalCapacity,
        remaining: apiCapacity.availableUnoccupiedCapacity + apiCapacity.blockedUnoccupiedCapacity,
      }
    : capacityLimit != null && spotsRemaining != null && { limit: capacityLimit, remaining: spotsRemaining }

  const capacityVisible = showCapacity && displayedCapacity

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
              LIMIT MIEJSC: {displayedCapacity.limit} · ZOSTAŁO: {displayedCapacity.remaining}
            </p>
          )}
          {showCapacity && usesApiCapacity && !displayedCapacity && !capacityError && (
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-graphite">
              ŁADOWANIE DOSTĘPNOŚCI…
            </p>
          )}
          {showCapacity && capacityError && (
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.12em] text-graphite">
              {capacityError}
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
