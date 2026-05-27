import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import sharp from 'sharp'

import { getServerSideURL } from '../getURL'

export type OgImageAsset = {
  src: string
  width: number
  height: number
}

type FitOptions = {
  maxWidth: number
  maxHeight: number
}

function mimeFromPath(pathname: string): string {
  const ext = pathname.split('.').pop()?.toLowerCase()

  switch (ext) {
    case 'svg':
      return 'image/svg+xml'
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'webp':
      return 'image/webp'
    case 'gif':
      return 'image/gif'
    default:
      return 'image/png'
  }
}

async function loadImageBuffer(url: string): Promise<Buffer | null> {
  if (url.startsWith('data:')) {
    const match = url.match(/^data:[^;]+;base64,(.+)$/)
    if (!match) return null
    return Buffer.from(match[1], 'base64')
  }

  const serverUrl = getServerSideURL()

  if (url.startsWith(serverUrl) || url.startsWith('/media/')) {
    const absoluteUrl = url.startsWith('/') ? `${serverUrl}${url}` : url

    try {
      const { pathname } = new URL(absoluteUrl)
      if (pathname.startsWith('/media/')) {
        return readFile(join(process.cwd(), 'public', pathname))
      }
    } catch {
      // Fall through to fetch
    }
  }

  try {
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) return null
    return Buffer.from(await response.arrayBuffer())
  } catch {
    return null
  }
}

async function fitImageFromBuffer(
  buffer: Buffer,
  { maxWidth, maxHeight }: FitOptions,
): Promise<OgImageAsset> {
  const { data, info } = await sharp(buffer)
    .resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer({ resolveWithObject: true })

  return {
    src: `data:image/png;base64,${data.toString('base64')}`,
    width: info.width,
    height: info.height,
  }
}

export async function fitImageForOg(
  url: string | null,
  options: FitOptions,
): Promise<OgImageAsset | null> {
  if (!url) return null

  const buffer = await loadImageBuffer(url)
  if (!buffer) return null

  return fitImageFromBuffer(buffer, options)
}

export async function getDefaultOgIcon(): Promise<OgImageAsset> {
  const buffer = await readFile(join(process.cwd(), 'public/assets/bun_color.svg'))
  return fitImageFromBuffer(buffer, { maxWidth: 88, maxHeight: 108 })
}

const ogBackgroundWidth = 1200
const ogBackgroundHeight = 630

export async function prepareOgBackgroundImage(url: string | null): Promise<string | null> {
  if (!url) return null

  const buffer = await loadImageBuffer(url)
  if (!buffer) return null

  try {
    const resized = await sharp(buffer)
      .resize(ogBackgroundWidth, ogBackgroundHeight, {
        fit: 'cover',
        position: 'centre',
      })
      .toBuffer()

    const darkened = await sharp(resized)
      .modulate({ brightness: 0.72 })
      .composite([
        {
          input: {
            create: {
              width: ogBackgroundWidth,
              height: ogBackgroundHeight,
              channels: 4,
              background: { r: 0, g: 0, b: 0, alpha: 0.48 },
            },
          },
          blend: 'over',
        },
      ])
      .jpeg({ quality: 85 })
      .toBuffer()

    return `data:image/jpeg;base64,${darkened.toString('base64')}`
  } catch {
    return null
  }
}
