import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const { logoType, logoText, logoMedia, description, columns, socialLinks, copyright } = footerData
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
            {description && <p className="text-cream-dim text-[15px]">{description}</p>}
          </div>

          {/* Dynamic columns from CMS */}
          {columns?.map((column, i) => (
            <div key={i} className="flex flex-col gap-1">
              <h5 className="text-[14px] uppercase tracking-[0.18em] mb-3.5 text-cream-dim font-semibold">
                {column.label}
              </h5>
              {column.navItems?.map(({ link }, j) => (
                <CMSLink
                  key={j}
                  {...link}
                  className="py-1.5 text-cream font-medium text-[15px] hover:text-orange transition-colors duration-200"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-8">
          <div className="flex items-center justify-between flex-wrap gap-6 text-cream-dim text-[12px] tracking-[0.15em] uppercase font-jetbrains border-t border-white/[0.05] pt-8">
            <div className="flex items-center gap-4">
              <span>{copyright || `© ${new Date().getFullYear()} Fuzzler — Furr MeetUp`}</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks?.map((social, i) => {
                const iconName = social.icon?.toLowerCase() || ''
                
                return (
                  <CMSLink
                    key={i}
                    {...social.link}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.08] text-cream hover:bg-orange hover:border-orange hover:-translate-y-1 transition-all duration-300 ease-out"
                  >
                    <span className="relative z-10">
                      {iconName ? (
                        <img
                          src={`https://cdn.simpleicons.org/${iconName}/white`}
                          alt={social.label}
                          className="h-5 w-5 object-contain transition-all duration-300 group-hover:brightness-0"
                        />
                      ) : (
                        <span className="text-[10px] font-bold tracking-tighter">
                          {social.label?.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-orange/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </CMSLink>
                )
              })}
            </div>
          </div>

          {/* Credit Note */}
          <div className="flex justify-center md:justify-end">
            <a
              href="https://reqlynx.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] text-cream/20 uppercase tracking-[0.3em] font-medium hover:text-orange transition-colors duration-300"
            >
              <span className="h-px w-8 bg-white/10 group-hover:bg-orange/50 transition-colors" />
              Crafted by ReqLynx Digitalworks
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
