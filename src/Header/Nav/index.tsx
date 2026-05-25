'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Button, ButtonArrow } from '@/components/ui/button'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-1.5 font-semibold text-[15px] uppercase tracking-[0.08em] font-rajdhani">
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
      <Button asChild className="ml-2">
        <a href="#zapis">
          Zapisz się <ButtonArrow />
        </a>
      </Button>
    </nav>
  )
}
