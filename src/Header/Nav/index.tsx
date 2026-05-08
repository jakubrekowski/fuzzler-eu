'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

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
      <a
        href="#zapis"
        className="ml-2 inline-flex items-center gap-2.5 rounded-full bg-orange px-5 py-2.5 text-[14px] font-bold uppercase tracking-[0.08em] text-graphite transition-all duration-150 hover:translate-y-0.5"
        style={{ boxShadow: '0 6px 0 0 #B5641F, 0 12px 32px -8px rgba(255,154,66,0.5)' }}
      >
        Zapisz się <span className="inline-block -rotate-45 font-black">→</span>
      </a>
    </nav>
  )
}
