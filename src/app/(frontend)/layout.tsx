import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Rajdhani, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import React from 'react'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

import { AdminBar } from '@/components/AdminBar'
import { FixedHeaderHeight } from '@/components/FixedHeaderHeight'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { getThemeInitScript } from '@/providers/Theme/themeInitScript'
import { getMetadataBase } from '@/utilities/getMetadataBase'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getSiteOgImageUrl } from '@/utilities/og/url'
import { draftMode } from 'next/headers'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        rajdhani.variable,
        jetbrainsMono.variable,
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
        />
        <Providers>
          <div className="fixed top-0 left-0 right-0 z-[100] w-full max-w-full overflow-x-hidden pointer-events-none">
            <FixedHeaderHeight className="pointer-events-auto flex min-w-0 w-full max-w-full flex-col overflow-x-hidden">
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />
              <Header />
            </FixedHeaderHeight>
          </div>

          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: await getMetadataBase(),
    openGraph: mergeOpenGraph({
      images: [{ url: getSiteOgImageUrl() }],
    }),
    twitter: {
      card: 'summary_large_image',
      images: [getSiteOgImageUrl()],
    },
  }
}
