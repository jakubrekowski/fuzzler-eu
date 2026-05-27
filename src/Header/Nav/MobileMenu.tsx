'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { AnchorLink } from '@/components/Link/AnchorLink'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Button, ButtonArrow } from '@/components/ui/button'

type HeaderMobileMenuProps = {
  data: HeaderType
  onNavigate?: () => void
}

export const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({ data, onNavigate }) => {
  const navItems = data?.navItems || []

  return (
    <nav
      className="md:hidden flex w-full min-w-0 max-w-full flex-col gap-1 overflow-x-hidden border-t border-white/10 pt-4 pb-2 font-semibold text-[15px] uppercase tracking-[0.08em] font-rajdhani"
      aria-label="Menu główne"
    >
      {navItems.map(({ link }, i) => (
        <CMSLink
          key={i}
          {...link}
          appearance="inline"
          className="block w-full max-w-full min-w-0 px-3 py-3 text-left rounded-lg text-cream-dim hover:text-cream hover:bg-white/[0.06] transition-colors duration-200"
          onClick={onNavigate}
        />
      ))}
      <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
        <Link
          href="/search"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-cream-dim hover:text-cream hover:bg-white/[0.06] transition-colors duration-200"
          onClick={onNavigate}
        >
          <SearchIcon className="h-4 w-4 shrink-0" />
          Szukaj
        </Link>
        <Button asChild className="w-full justify-center">
          <AnchorLink href="#zapis" onClick={onNavigate}>
            Zapisz się <ButtonArrow />
          </AnchorLink>
        </Button>
      </div>
    </nav>
  )
}
