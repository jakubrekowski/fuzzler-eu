import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

/** Shared 16:9 frame — object-contain keeps the full image visible (no uneven cropping). */
export const POST_HERO_ASPECT_CLASS = 'aspect-video'

type PostHeroImageProps = {
  heroImage?: (number | null) | MediaType | null
  gradient: string
  hatch?: boolean
  size?: string
  priority?: boolean
  className?: string
  imageClassName?: string
  children?: React.ReactNode
}

const HATCH =
  'repeating-linear-gradient(-45deg, transparent 0 10px, rgba(0,0,0,.18) 10px 11px)'

export const PostHeroImage: React.FC<PostHeroImageProps> = ({
  heroImage,
  gradient,
  hatch = true,
  size = '50vw',
  priority,
  className,
  imageClassName,
  children,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-br',
        POST_HERO_ASPECT_CLASS,
        gradient,
        className,
      )}
    >
      {hatch && (
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: HATCH }} />
      )}
      {heroImage && typeof heroImage === 'object' && (
        <Media
          resource={heroImage}
          size={size}
          priority={priority}
          className={cn(
            'absolute inset-0 w-full h-full object-contain object-center',
            imageClassName,
          )}
        />
      )}
      {children}
    </div>
  )
}
