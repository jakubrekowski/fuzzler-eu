'use client'
import { cn } from '@/utilities/ui'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const { logoType, logoText, logoMedia } = data
  const logoMediaUrl = typeof logoMedia === 'object' ? logoMedia?.url : null
  const displayLogoText = logoText || 'Fuzzler'

  return (
    <header
      className={cn(
        'transition-all duration-500 w-full border-b',
        isScrolled
          ? 'py-3 bg-graphite-dark/80 backdrop-blur-xl border-white/10'
          : 'py-6 bg-transparent border-transparent backdrop-blur-none',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3.5">
          {logoType === 'media' && logoMediaUrl ? (
            <img
              src={logoMediaUrl}
              alt={displayLogoText}
              style={{ height: 'auto', width: data.logoResolution ? `${data.logoResolution}px` : 'auto' }}
              className="object-contain"
            />
          ) : (
            <>
              <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] bg-orange">
                <img
                  src="/assets/bun_color.svg"
                  alt="Fuzzler"
                  className="h-[90%] w-[90%] object-contain"
                />
              </span>
              <span className="font-bold text-[22px] uppercase tracking-[0.06em] text-cream font-rajdhani">
                {displayLogoText}
              </span>
            </>
          )}
        </Link>

        {/* Nav */}
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
