import React from 'react'

import type { CrewListBlock as CrewListBlockProps, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import { HighlightedText } from '@/components/HighlightedText'
import { SectionHeader } from '@/components/SectionHeader'
import {
  type CategoryBadgeColor,
  getCategoryBadgeStyles,
} from '@/utilities/categoryBadge'
import { cn } from '@/utilities/ui'

type CrewAccentColor = 'orange' | 'green' | 'white'

const accentFilledButtonClasses: Record<CrewAccentColor, string> = {
  orange:
    'bg-orange text-graphite border-orange shadow-[0_4px_0_0_#B5641F] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#B5641F]',
  green:
    'bg-green text-graphite border-green shadow-[0_4px_0_0_#4A9E65] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#4A9E65]',
  white:
    'bg-cream text-graphite border-cream shadow-[0_4px_0_0_#C9C3B8] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#C9C3B8]',
}

const accentOutlineButtonClasses: Record<CrewAccentColor, string> = {
  orange: 'bg-transparent border-orange text-orange shadow-none hover:translate-y-0',
  green: 'bg-transparent border-green text-green shadow-none hover:translate-y-0',
  white: 'bg-transparent border-cream text-cream shadow-none hover:translate-y-0',
}

function resolveAccentColor(color?: string | null): CrewAccentColor {
  if (color === 'green' || color === 'white') return color
  return 'orange'
}

type CrewMember = NonNullable<CrewListBlockProps['members']>[number]

const CrewMemberCard: React.FC<{ member: CrewMember }> = ({ member }) => {
  const { photo, name, role, accentColor, description, note, button } = member
  const color = resolveAccentColor(accentColor)
  const { background, foreground } = getCategoryBadgeStyles(color)

  const photoResource =
    photo && typeof photo === 'object' ? (photo as Media) : null

  return (
    <article className="flex flex-col rounded-[20px] border border-cream/25 bg-graphite-dark p-5 sm:p-6 min-h-[280px]">
      <div className="flex gap-4 items-start">
        <div className="relative w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] shrink-0 rounded-2xl overflow-hidden border border-cream/15 bg-graphite">
          {photoResource ? (
            <MediaComponent
              resource={photoResource}
              fill
              imgClassName="object-cover"
              className="absolute inset-0"
            />
          ) : (
            <div className="absolute inset-0 bg-graphite" aria-hidden />
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          {name && (
            <h3 className="font-rajdhani font-bold text-2xl sm:text-[1.75rem] leading-none tracking-tight uppercase text-cream">
              <HighlightedText>{name}</HighlightedText>
            </h3>
          )}

          {role && (
            <span
              className="inline-flex self-start shrink-0 items-center px-3 py-1 rounded-lg font-mono text-[11px] uppercase tracking-[0.12em] font-bold"
              style={{
                backgroundColor: background,
                color: foreground,
              }}
            >
              {role}
            </span>
          )}
        </div>
      </div>

      {description && (
        <p className="mt-5 text-zinc-400 text-[15px] sm:text-base leading-relaxed flex-1">
          <HighlightedText>{description}</HighlightedText>
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        {note && (
          <p className="text-zinc-500 text-sm leading-snug sm:max-w-[70%]">
            <HighlightedText>{note}</HighlightedText>
          </p>
        )}

        {button?.label && (
          <div className={cn('flex shrink-0', !note && 'ml-auto')}>
            {(() => {
              const { label, appearance, ...linkProps } = button
              const isOutline = appearance === 'outline'

              return (
                <CMSLink
                  {...linkProps}
                  appearance="inline"
                  label={label}
                  className={cn(
                    'inline-flex items-center px-4 py-2 rounded-xl border font-mono text-[11px] uppercase tracking-[0.14em] font-bold transition-all duration-150',
                    isOutline
                      ? accentOutlineButtonClasses[color]
                      : accentFilledButtonClasses[color],
                  )}
                />
              )
            })()}
          </div>
        )}
      </div>
    </article>
  )
}

export const CrewListBlockComponent: React.FC<
  CrewListBlockProps & { disableInnerContainer?: boolean }
> = ({ tagline, title, description, members, anchor }) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {members?.map((member, index) => (
          <CrewMemberCard key={member.id ?? index} member={member} />
        ))}
      </div>
    </div>
  )
}
