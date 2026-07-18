'use client'

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Media } from '@/components/Media'
import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = GalleryBlockProps & {
  className?: string
}

export const GalleryClient = ({
  autoplay,
  autoplayInterval = 5,
  className,
  images,
  layout = 'grid',
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [thumbnailStart, setThumbnailStart] = useState(0)
  const [thumbnailDirection, setThumbnailDirection] = useState<'up' | 'down'>('down')
  const items = images?.filter((item) => item.image) || []
  const total = items.length
  const supportsActiveImage = layout === 'carousel' || layout === 'mainGallery'

  useEffect(() => {
    if (!supportsActiveImage || !autoplay || total < 2) return

    const timer = window.setInterval(
      () => {
        setActiveIndex((current) => (current + 1) % total)
      },
      Math.max(2, autoplayInterval ?? 5) * 1000,
    )

    return () => window.clearInterval(timer)
  }, [autoplay, autoplayInterval, supportsActiveImage, total])

  useEffect(() => {
    if (layout !== 'mainGallery') return

    setThumbnailStart((currentStart) => {
      const maxStart = Math.max(0, total - 4)
      if (activeIndex < currentStart) return activeIndex
      if (activeIndex > currentStart + 3) return Math.min(activeIndex - 3, maxStart)
      return Math.min(currentStart, maxStart)
    })
  }, [activeIndex, layout, total])

  if (!total) return null

  // The gallery remains constrained even when inserted into a full-width page layout.
  const containerClass = cn('container max-w-[1120px]', className)
  const imageClass = 'h-full w-full rounded-[0.8rem] border border-border object-cover'
  const activeImageAnimation = autoplay
    ? 'animate-in fade-in slide-in-from-bottom-3 duration-700'
    : undefined

  if (layout === 'masonry') {
    return (
      <section className={containerClass} aria-label="Galeria zdjęć">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <div className="mb-4 break-inside-avoid" key={item.id}>
              <Media imgClassName={imageClass} mediaSize="large" resource={item.image} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (layout === 'carousel') {
    const previous = () => setActiveIndex((activeIndex - 1 + total) % total)
    const next = () => setActiveIndex((activeIndex + 1) % total)
    const active = items[activeIndex]

    return (
      <section className={containerClass} aria-label="Galeria zdjęć">
        <div className="relative overflow-hidden rounded-[0.8rem]">
          <div className={activeImageAnimation} key={active.id ?? activeIndex}>
            <Media
              imgClassName={cn(imageClass, 'aspect-video bg-muted')}
              mediaSize="xlarge"
              resource={active.image}
            />
          </div>
          {total > 1 && (
            <>
              <button
                aria-label="Poprzednia grafika"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-sm transition hover:bg-background"
                onClick={previous}
                type="button"
              >
                <ChevronLeft aria-hidden="true" size={20} />
              </button>
              <button
                aria-label="Następna grafika"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-sm transition hover:bg-background"
                onClick={next}
                type="button"
              >
                <ChevronRight aria-hidden="true" size={20} />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-background/80 px-3 py-2">
                {items.map((item, index) => (
                  <button
                    aria-label={`Pokaż grafikę ${index + 1}`}
                    aria-current={index === activeIndex}
                    className={cn(
                      'h-2 w-2 rounded-full transition',
                      index === activeIndex
                        ? 'bg-foreground'
                        : 'bg-muted-foreground/50 hover:bg-muted-foreground',
                    )}
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    )
  }

  if (layout === 'mainGallery') {
    const active = items[activeIndex]
    const visibleThumbnails = items.slice(thumbnailStart, thumbnailStart + 4)
    const maxThumbnailStart = Math.max(0, total - 4)
    const scrollThumbnails = (direction: 'up' | 'down') => {
      setThumbnailDirection(direction)
      setThumbnailStart((currentStart) => {
        const nextStart = currentStart + (direction === 'down' ? 1 : -1)
        return Math.min(maxThumbnailStart, Math.max(0, nextStart))
      })
    }
    const thumbnailAnimation =
      thumbnailDirection === 'down'
        ? 'animate-in fade-in slide-in-from-bottom-2 duration-300'
        : 'animate-in fade-in slide-in-from-top-2 duration-300'

    return (
      <section className={containerClass} aria-label="Galeria zdjęć">
        <div className="grid gap-4 lg:h-[clamp(22rem,45vw,34rem)] lg:grid-cols-[minmax(0,1fr)_9rem]">
          <div
            className={cn(
              'relative aspect-[16/10] overflow-hidden rounded-[0.8rem] lg:h-full lg:aspect-auto',
              activeImageAnimation,
            )}
            key={active.id ?? activeIndex}
          >
            <Media
              className="absolute inset-0"
              fill
              imgClassName="object-cover"
              mediaSize="xlarge"
              resource={active.image}
            />
          </div>
          {total > 1 && (
            <div className="relative min-h-0 lg:h-full lg:overflow-hidden">
              <div className={cn(thumbnailAnimation, 'lg:h-full')} key={thumbnailStart}>
                <div className="flex gap-2 overflow-hidden lg:h-full lg:flex-col">
                  {visibleThumbnails.map((item, visibleIndex) => {
                    const index = thumbnailStart + visibleIndex

                    return (
                      <button
                        aria-label={`Pokaż grafikę ${index + 1}`}
                        aria-current={index === activeIndex}
                        className={cn(
                          'relative h-16 min-w-0 flex-1 overflow-hidden rounded-[0.65rem] border-2 transition lg:h-auto lg:min-h-0 lg:w-full lg:flex-1',
                          index === activeIndex
                            ? 'border-primary opacity-100'
                            : 'border-transparent opacity-65 hover:opacity-100',
                        )}
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        type="button"
                      >
                        <Media
                          className="absolute inset-0"
                          fill
                          imgClassName="object-cover"
                          mediaSize="medium"
                          resource={item.image}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
              {total > 4 && (
                <>
                  <button
                    aria-label="Przewiń miniatury w lewo"
                    className="absolute left-2 top-1/2 flex -translate-y-1/2 rounded-full bg-background/90 p-1.5 text-foreground shadow-sm disabled:cursor-not-allowed disabled:opacity-40 lg:hidden"
                    disabled={thumbnailStart === 0}
                    onClick={() => scrollThumbnails('up')}
                    type="button"
                  >
                    <ChevronLeft aria-hidden="true" size={16} />
                  </button>
                  <button
                    aria-label="Przewiń miniatury w prawo"
                    className="absolute right-2 top-1/2 flex -translate-y-1/2 rounded-full bg-background/90 p-1.5 text-foreground shadow-sm disabled:cursor-not-allowed disabled:opacity-40 lg:hidden"
                    disabled={thumbnailStart === maxThumbnailStart}
                    onClick={() => scrollThumbnails('down')}
                    type="button"
                  >
                    <ChevronRight aria-hidden="true" size={16} />
                  </button>
                  <button
                    aria-label="Przewiń miniatury w górę"
                    className="absolute left-1/2 top-2 hidden -translate-x-1/2 rounded-full bg-background/90 p-1.5 text-foreground shadow-sm disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
                    disabled={thumbnailStart === 0}
                    onClick={() => scrollThumbnails('up')}
                    type="button"
                  >
                    <ChevronUp aria-hidden="true" size={16} />
                  </button>
                  <button
                    aria-label="Przewiń miniatury w dół"
                    className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full bg-background/90 p-1.5 text-foreground shadow-sm disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
                    disabled={thumbnailStart === maxThumbnailStart}
                    onClick={() => scrollThumbnails('down')}
                    type="button"
                  >
                    <ChevronDown aria-hidden="true" size={16} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    )
  }

  if (layout === 'featured') {
    return (
      <section className={containerClass} aria-label="Galeria zdjęć">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Media
              imgClassName={cn(imageClass, 'aspect-[4/3]', {
                'sm:col-span-2 sm:row-span-2 sm:aspect-auto': index === 0,
              })}
              key={item.id}
              mediaSize={index === 0 ? 'xlarge' : 'large'}
              resource={item.image}
            />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={containerClass} aria-label="Galeria zdjęć">
      <div
        className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', {
          'lg:grid-cols-2': layout === 'grid2',
          'lg:grid-cols-3': layout !== 'grid2',
        })}
      >
        {items.map((item) => (
          <Media
            imgClassName={cn(imageClass, 'aspect-[4/3]')}
            mediaSize="large"
            resource={item.image}
            key={item.id}
          />
        ))}
      </div>
    </section>
  )
}
