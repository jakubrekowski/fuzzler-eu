import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  const { logoType, logoText, logoMedia } = footerData
  const logoMediaUrl = typeof logoMedia === 'object' ? logoMedia?.url : null
  const displayLogoText = logoText || 'Fuzzler'

  return (
    <footer className="mt-auto bg-graphite-dark pt-20 pb-10 px-7">
      <div className="container">
        {/* Top grid */}
        <div
          className="grid gap-8 pb-12 border-b border-white/[0.08]"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}
        >
          {/* Brand column */}
          <div className="flex flex-col gap-3.5 max-w-[36ch]">
            <Link href="/" className="flex items-center gap-3">
              {logoType === 'media' && logoMediaUrl ? (
                <img
                  src={logoMediaUrl}
                  alt={displayLogoText}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-orange flex-shrink-0">
                    <img
                      src="/assets/bun_color.svg"
                      alt="Fuzzler"
                      className="h-[90%] w-[90%] object-contain"
                    />
                  </span>
                  <span className="font-bold text-[42px] uppercase tracking-[0.04em] leading-[0.9] text-cream font-rajdhani">
                    {displayLogoText === 'Fuzzler' ? (
                      <>
                        Fuzz<span className="text-orange">ler</span>
                      </>
                    ) : (
                      displayLogoText
                    )}
                  </span>
                </>
              )}
            </Link>
            <p className="text-cream-dim text-[15px]">
              Chill, integracja i futrzaki. Furr MeetUp — edycja 03.
            </p>
          </div>

          {/* Nav columns from CMS */}
          {navItems.length > 0 && (
            <div className="flex flex-col gap-1">
              <h5 className="text-[14px] uppercase tracking-[0.18em] mb-3.5 text-cream-dim font-semibold">
                Nawigacja
              </h5>
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="py-1.5 text-cream font-medium text-[15px] hover:text-orange transition-colors duration-200"
                />
              ))}
            </div>
          )}

          {/* Static link columns */}
          <div className="flex flex-col gap-1">
            <h5 className="text-[14px] uppercase tracking-[0.18em] mb-3.5 text-cream-dim font-semibold">
              Event
            </h5>
            {[
              { href: '#cennik', label: 'Cennik' },
              { href: '#program', label: 'Program' },
              { href: '#lokalizacja', label: 'Lokalizacja' },
              { href: '#faq', label: 'FAQ' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1.5 text-cream font-medium text-[15px] hover:text-orange transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-[14px] uppercase tracking-[0.18em] mb-3.5 text-cream-dim font-semibold">
              Kontakt
            </h5>
            {[
              { href: '#', label: 'Telegram' },
              { href: '#', label: 'E-mail' },
              { href: '#', label: 'Wieści' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-1.5 text-cream font-medium text-[15px] hover:text-orange transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-between flex-wrap gap-3.5 text-cream-dim text-[13px] tracking-[0.12em] uppercase font-jetbrains">
          <span>© {new Date().getFullYear()} Fuzzler — Furr MeetUp</span>

          {/* Socials */}
          <div className="flex gap-2">
            {[
              { href: '#', label: 'TG' },
              { href: '#', label: 'TW' },
              { href: '#', label: 'IG' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-graphite border border-white/[0.08] text-cream hover:bg-orange hover:text-graphite hover:border-orange transition-all duration-200 text-xs font-bold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
