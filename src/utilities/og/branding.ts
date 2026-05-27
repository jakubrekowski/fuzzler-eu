import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getMediaUrl } from '@/utilities/og/getMediaUrl'
import {
  fitImageForOg,
  getDefaultOgIcon,
  type OgImageAsset,
} from '@/utilities/og/resolveImageDataUri'

export type OgBranding = {
  icon: OgImageAsset
  logo: OgImageAsset | null
}

export async function getOgBranding(): Promise<OgBranding> {
  const fallbackIcon = await getDefaultOgIcon()

  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })

    const og = settings?.og
    const iconSource = getMediaUrl(og?.icon)
    const logoSource = getMediaUrl(og?.logo)

    const [icon, logo] = await Promise.all([
      fitImageForOg(iconSource, { maxWidth: 88, maxHeight: 108 }),
      fitImageForOg(logoSource, { maxWidth: 440, maxHeight: 80 }),
    ])

    return {
      icon: icon ?? fallbackIcon,
      logo,
    }
  } catch {
    return {
      icon: fallbackIcon,
      logo: null,
    }
  }
}
