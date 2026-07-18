'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Media } from '@/components/Media'
import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = GalleryBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const GalleryClient = ({
  autoplay,
  autoplayInterval = 5,
  className,
  disableInnerContainer,
  images,
  layout = 'grid',
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
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

  if (!total) return null

  const containerClass = cn(
    { container: !disableInnerContainer, 'px-7': disableInnerContainer },
    className,
  )
  const imageClass = 'h-full w-full rounded-[0.8rem] border border-border object-cover'

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
          <Media
            imgClassName={cn(imageClass, 'aspect-video bg-muted')}
            mediaSize="xlarge"
            resource={active.image}
          />
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

    return (
      <section className={containerClass} aria-label="Galeria zdjęć">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_13rem]">
          <Media
            imgClassName={cn(imageClass, 'aspect-[4/3] bg-muted')}
            mediaSize="xlarge"
            resource={active.image}
          />
          {total > 1 && (
            <div className="flex max-h-[36rem] gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1">
              {items.map((item, index) => (
                <button
                  aria-label={`Pokaż grafikę ${index + 1}`}
                  aria-current={index === activeIndex}
                  className={cn(
                    'w-24 shrink-0 overflow-hidden rounded-[0.8rem] border-2 transition lg:w-full',
                    index === activeIndex
                      ? 'border-primary opacity-100'
                      : 'border-transparent opacity-65 hover:opacity-100',
                  )}
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <Media
                    imgClassName="aspect-[4/3] w-full object-cover"
                    mediaSize="medium"
                    resource={item.image}
                  />
                </button>
              ))}
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
