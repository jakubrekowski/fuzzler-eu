import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { mediaSizeOptions } from '@/utilities/mediaSizeOptions'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
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
      name: 'logoSize',
      type: 'select',
      defaultValue: 'original',
      options: mediaSizeOptions,
      admin: {
        condition: (_, { logoType } = {}) => logoType === 'media',
        description: 'Select the file size to load for the logo',
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
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
