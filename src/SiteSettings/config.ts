import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/admin/groups'
import { link } from '@/fields/link'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Ustawienia witryny',
  access: {
    read: () => true,
  },
  admin: {
    group: adminGroups.layout,
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
          label: 'Posts',
          fields: [
            {
              name: 'postSidebarCta',
              type: 'group',
              label: 'Karta CTA w poście',
              admin: {
                description:
                  'Pomarańczowa karta w prawym panelu artykułu (np. „Zapisz się” na FuzzNews).',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Pokaż kartę',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Nagłówek (mono)',
                  defaultValue: '// chcesz przyjechać?',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Opis',
                  defaultValue: 'Nie zwlekaj! Rejestracja trwa.',
                },
                link({
                  appearances: false,
                  overrides: {
                    admin: {
                      description: 'Docelowy adres przycisku (np. sekcja zapisu na stronie głównej).',
                    },
                  },
                }),
              ],
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
