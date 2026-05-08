'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.08]"
      style={{ background: 'rgba(27,27,25,0.85)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex items-center justify-between gap-6 py-3.5">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3.5">
          <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] bg-orange">
            <img
              src="/assets/bun_color.svg"
              alt="Fuzzler"
              className="h-[90%] w-[90%] object-contain"
            />
          </span>
          <span className="font-bold text-[22px] uppercase tracking-[0.06em] text-cream font-rajdhani">
            Fuzzler
          </span>
        </Link>

        {/* Nav */}
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
