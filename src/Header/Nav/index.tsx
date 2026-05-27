'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Menu, SearchIcon, X } from 'lucide-react'
import { ButtonArrow } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type HeaderNavProps = {
  data: HeaderType
  mobileOpen: boolean
  onMobileOpenChange: (open: boolean) => void
}

const defaultHeaderCtaLink = {
  type: 'custom' as const,
  url: '#zapis',
  label: 'Zapisz się',
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, mobileOpen, onMobileOpenChange }) => {
  const navItems = data?.navItems || []
  const cta = data?.cta
  const showCta = cta?.enabled !== false

  return (
    <>
      <nav
        className="hidden md:flex items-center gap-1.5 font-semibold text-[15px] uppercase tracking-[0.08em] font-rajdhani"
        aria-label="Menu główne"
      >
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="px-3.5 py-2 rounded-full text-cream-dim hover:text-cream hover:bg-white/[0.06] transition-colors duration-200"
            />
          )
        })}
        <Link
          href="/search"
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream-dim hover:text-cream hover:border-cream-dim transition-colors duration-200"
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="h-4 w-4" />
        </Link>
        {showCta && (
          <CMSLink
            {...(cta?.link ?? defaultHeaderCtaLink)}
            appearance="default"
            className="ml-2"
          >
            <ButtonArrow />
          </CMSLink>
        )}
      </nav>

      <button
        type="button"
        className={cn(
          'md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-cream',
          'hover:bg-white/[0.06] hover:border-cream-dim transition-colors duration-200',
        )}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
        onClick={() => onMobileOpenChange(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </>
  )
}
