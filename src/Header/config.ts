import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { mediaSizeOptions } from '@/utilities/mediaSizeOptions'

export const Header: GlobalConfig = {
  slug: 'header',
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
