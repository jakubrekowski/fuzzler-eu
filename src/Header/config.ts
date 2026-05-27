import type { GlobalConfig } from 'payload'

import { adminGroups } from '@/admin/groups'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: adminGroups.layout,
  },
  fields: [
    {
      name: 'logoType',
      type: 'select',
      defaultValue: 'text',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Media', value: 'media' },
      ],
    },
    {
      name: 'logoText',
      type: 'text',
      admin: {
        condition: (_, { logoType } = {}) => logoType === 'text',
      },
    },
    {
      name: 'logoMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { logoType } = {}) => logoType === 'media',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Przycisk CTA',
      admin: {
        description: 'Pomarańczowy przycisk w menu (desktop i mobile), np. „Zapisz się”.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Pokaż przycisk',
          defaultValue: true,
        },
        link({
          overrides: {
            admin: {
              description: 'Link docelowy (np. kotwica #zapis na stronie głównej).',
            },
          },
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
