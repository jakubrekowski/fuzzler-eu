import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import type { OgBranding } from '@/utilities/og/branding'

export const ogSize = {
  width: 1200,
  height: 630,
}

export const ogContentType = 'image/png'

const colors = {
  background: '#1b1b19',
  cream: '#fdf9f3',
  creamDim: '#e8e2d6',
  orange: '#ff9a42',
  indigo: '#4b0082',
  line: 'rgba(253,249,243,0.12)',
}

let rajdhaniBold: Promise<ArrayBuffer> | null = null

async function loadRajdhaniBold(): Promise<ArrayBuffer> {
  if (!rajdhaniBold) {
    rajdhaniBold = readFile(join(process.cwd(), 'src/utilities/og/fonts/Rajdhani-Bold.ttf'))
  }
  return rajdhaniBold
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}…`
}

export type OgImageKind = 'site' | 'page' | 'post'

export type RenderOgImageOptions = {
  title: string
  description?: string | null
  kind?: OgImageKind
  backgroundImageUrl?: string | null
  branding?: OgBranding
}

const kindLabels: Record<OgImageKind, string> = {
  site: 'FUZZLER',
  page: 'STRONA',
  post: 'FUZZ NEWS',
}

export async function renderOgImage({
  title,
  description,
  kind = 'site',
  backgroundImageUrl,
  branding,
}: RenderOgImageOptions): Promise<ImageResponse> {
  const fontData = await loadRajdhaniBold()

  const displayTitle = truncate(title, 90)
  const displayDescription = description ? truncate(description, 140) : null
  const label = kindLabels[kind]
  const icon = branding?.icon
  const logo = branding?.logo

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: colors.background,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {backgroundImageUrl ? (
          <img
            alt=""
            src={backgroundImageUrl}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : null}

        {backgroundImageUrl ? (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(105deg, rgba(6,6,5,0.72) 0%, rgba(10,10,9,0.55) 50%, rgba(14,14,13,0.35) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.3)',
              }}
            />
          </>
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 80% 70% at 100% 0%, rgba(75,0,130,0.45) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(255,154,66,0.2) 0%, transparent 50%)',
            }}
          />
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '56px 64px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {icon ? (
              <img
                alt=""
                src={icon.src}
                width={icon.width}
                height={icon.height}
                style={{ flexShrink: 0 }}
              />
            ) : null}
            {logo ? (
              <img
                alt=""
                src={logo.src}
                width={logo.width}
                height={logo.height}
                style={{ flexShrink: 0 }}
              />
            ) : null}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 960 }}>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                padding: '8px 18px',
                borderRadius: 999,
                border: `1px solid ${colors.line}`,
                background: 'rgba(12,12,11,0.75)',
                color: colors.orange,
                fontFamily: 'Rajdhani',
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: 'Rajdhani',
                fontSize: displayTitle.length > 48 ? 56 : 68,
                fontWeight: 700,
                lineHeight: 1.05,
                color: colors.cream,
                letterSpacing: '-0.01em',
              }}
            >
              {displayTitle}
            </div>

            {displayDescription ? (
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Rajdhani',
                  fontSize: 28,
                  fontWeight: 500,
                  lineHeight: 1.35,
                  color: colors.creamDim,
                }}
              >
                {displayDescription}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              height: 4,
              width: 120,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${colors.orange}, ${colors.indigo})`,
            }}
          />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: 'Rajdhani',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  )
}
