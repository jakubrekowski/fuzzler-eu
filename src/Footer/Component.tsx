import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const {
    logoType,
    logoText,
    logoMedia,
    logoSubtext,
    description,
    columns,
    socialLinks,
    copyright,
    creditNote,
  } = footerData
  const displayLogoText = logoText || 'Fuzzler'

  return (
    <footer className="bg-graphite-dark pt-20 pb-10 px-7 border-t border-white/[0.05]">
      <div className="container">
        {/* Top grid */}
        <div
          className="grid gap-12 pb-12 border-b border-white/[0.08] lg:grid-cols-[2fr_1fr_1fr_1fr]"
          style={{ gridTemplateColumns: 'minmax(300px, 2fr) 1fr 1fr 1fr' }}
        >
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3.5 group">
              {logoType === 'media' && logoMedia ? (
                <Media
                  resource={logoMedia}
                  mediaSize="thumbnail"
                  priority
                  htmlElement={null}
                  imgClassName="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] bg-orange flex-shrink-0">
                    <img
                      src="/assets/bun_color.svg"
                      alt="Fuzzler Mark"
                      className="h-[90%] w-[90%] object-contain"
                    />
                  </span>
                  <div className="text-[32px] font-bold tracking-[0.04em] uppercase leading-[0.9] text-cream font-rajdhani">
                    {displayLogoText === 'Fuzzler' ? (
                      <>
                        Fuzz<span className="text-orange">ler</span>
                      </>
                    ) : (
                      displayLogoText
                    )}
                  </div>
                </>
              )}
            </Link>
            {description && (
              <p className="text-cream-dim text-[15px] leading-relaxed max-w-[36ch]">
                {description}
              </p>
            )}
          </div>

          {/* Dynamic columns from CMS */}
          {columns?.map((column, i) => (
            <div key={i} className="flex flex-col gap-1">
              <h5 className="text-[14px] uppercase tracking-[0.18em] mb-4 text-cream-dim font-semibold">
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
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 text-cream-dim text-[13px] tracking-[0.12em] uppercase font-jetbrains">
          <span>{copyright || `© ${new Date().getFullYear()} Fuzzler · Furr MeetUp`}</span>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socialLinks
              ?.filter((social) => social.icon)
              .map((social, i) => {
                const iconName = social.icon?.toLowerCase() || ''

                return (
                  <Link
                    key={i}
                    href={social.link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-[38px] w-[38px] flex items-center justify-center rounded-[10px] bg-graphite border border-white/[0.1] text-cream hover:bg-orange hover:text-graphite-dark hover:border-orange transition-all duration-300"
                  >
                    <span className="relative z-10">
                      <img
                        src={`https://cdn.simpleicons.org/${iconName}/white`}
                        alt={social.label}
                        className="h-4 w-4 object-contain transition-all duration-300 group-hover:brightness-0"
                      />
                    </span>
                  </Link>
                )
              })}
          </div>

          <div className="flex items-center gap-2">
            {creditNote || (
              <a
                href="https://reqlynx.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange transition-colors"
              >
                Crafted by <span className="text-orange">ReqLynx Digitalworks</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
