import type { CollectionConfig, SelectFieldSingleValidation } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

import { CATEGORY_BADGE_COLORS, type CategoryBadgeColor } from '../utilities/categoryBadge'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'badgeColor',
      type: 'select',
      label: 'Kolor badge',
      defaultValue: 'orange',
      required: true,
      options: [
        { label: 'Pomarańczowy', value: 'orange' },
        { label: 'Czerwony', value: 'red' },
        { label: 'Fioletowy', value: 'purple' },
        { label: 'Zielony', value: 'green' },
        { label: 'Biały', value: 'white' },
        { label: 'Kremowy', value: 'cream' },
      ],
      admin: {
        description: 'Kolor etykiety kategorii na kartach i stronach wpisów.',
      },
      validate: ((value: string | null | undefined) => {
        if (!value) return 'Wybierz kolor badge.'
        if (!CATEGORY_BADGE_COLORS.includes(value as CategoryBadgeColor)) {
          return 'Nieprawidłowy kolor badge.'
        }
        return true
      }) as SelectFieldSingleValidation,
    },
    slugField({
      position: undefined,
    }),
  ],
}
