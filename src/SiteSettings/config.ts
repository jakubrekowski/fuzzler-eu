import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Ustawienia witryny',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Open Graph',
          fields: [
            {
              name: 'og',
              type: 'group',
              label: 'Grafiki social (Open Graph)',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Logo wyświetlane na generowanych grafikach udostępniania (np. PNG/SVG z przezroczystym tłem).',
                  },
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Ikona maskotki w lewym górnym rogu — bez tła, najlepiej PNG/SVG z przezroczystością.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Ogólne',
          fields: [
            {
              name: 'general',
              type: 'group',
              admin: {
                description: 'Miejsce na kolejne ustawienia witryny (np. analityka, integracje, SEO globalne).',
              },
              fields: [],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
