'use client'
import { cn } from '@/utilities/ui'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { HeaderMobileMenu } from './Nav/MobileMenu'
import { Media } from '@/components/Media'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflowX = document.documentElement.style.overflowX
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflowX = 'clip'
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflowX = previousHtmlOverflowX
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const { logoType, logoText, logoMedia } = data
  const displayLogoText = logoText || 'Fuzzler'

  return (
    <header
      className={cn(
        'relative z-50 transition-all duration-500 w-full max-w-full overflow-x-hidden border-b',
        isScrolled
          ? 'py-3 bg-graphite-dark/80 backdrop-blur-xl border-white/10'
          : 'py-4 md:py-6 bg-transparent border-transparent backdrop-blur-none',
        mobileMenuOpen && 'bg-graphite-dark/95 backdrop-blur-xl border-white/10',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex min-w-0 max-w-full flex-col">
        <div className="flex min-w-0 w-full max-w-full items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 flex-1 shrink items-center gap-2.5 sm:gap-3.5">
            {logoType === 'media' && logoMedia ? (
              <span className="block min-w-0 max-w-[min(8.5rem,42vw)] sm:max-w-[min(10rem,48vw)] overflow-hidden">
                <Media
                  resource={logoMedia}
                  mediaSize="thumbnail"
                  loading="eager"
                  size="160px"
                  htmlElement={null}
                  pictureClassName="block max-w-full"
                  imgClassName="h-7 max-h-8 w-auto max-w-full object-contain object-left sm:h-8 sm:max-h-9 md:h-9 md:max-h-10"
                />
              </span>
            ) : (
              <>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-orange sm:h-9 sm:w-9 sm:rounded-[10px]">
                  <img
                    src="/assets/bun_color.svg"
                    alt="Fuzzler"
                    className="h-[88%] w-[88%] object-contain"
                  />
                </span>
                <span className="truncate font-bold text-[0.9375rem] uppercase tracking-[0.06em] text-cream font-rajdhani sm:text-[22px]">
                  {displayLogoText}
                </span>
              </>
            )}
          </Link>

          <div className="flex shrink-0 items-center">
            <HeaderNav
              data={data}
              mobileOpen={mobileMenuOpen}
              onMobileOpenChange={setMobileMenuOpen}
            />
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-nav" className="min-w-0 max-w-full overflow-x-hidden">
            <HeaderMobileMenu data={data} onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}
