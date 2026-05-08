import type { Block } from 'payload'
import { link } from '@/fields/link'

export const PricingBlock: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor Name (for # scroll)',
      admin: {
        description: 'Enables smooth scrolling to this section (e.g. "cennik"). Use this name in links like "#cennik".',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        placeholder: '// 03 - AKREDYTACJA & NOCLEG',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        placeholder: 'CENNIK [[AKREDYTACJA]]',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Plans (Columns)',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Label (Optional)',
        },
        {
            name: 'color',
            type: 'select',
            defaultValue: 'white',
            options: [
                { label: 'White', value: 'white' },
                { label: 'Orange', value: 'orange' },
                { label: 'Green', value: 'green' },
            ]
        }
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Feature Rows',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Row Description (Optional)',
        },
        {
          name: 'checks',
          type: 'array',
          label: 'Checks (Match order of plans)',
          fields: [
            {
              name: 'checked',
              type: 'checkbox',
              label: 'Included?',
            }
          ]
        }
      ],
    },
    {
      name: 'hotelCard',
      type: 'group',
      label: 'Hotel Card',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'address',
          type: 'text',
        },
        {
          name: 'price',
          type: 'text',
        },
        {
            name: 'priceSuffix',
            type: 'text',
            defaultValue: '/ os.',
        },
        {
          name: 'details',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
            }
          ]
        }
      ]
    },
    {
      name: 'packageType',
      type: 'select',
      defaultValue: 'card',
      options: [
        { label: 'Text Card', value: 'card' },
        { label: 'Media (Image/Video)', value: 'media' },
      ],
    },
    {
      name: 'packageCard',
      type: 'group',
      label: 'Package Info Card',
      admin: {
        condition: (_, siblingData) => siblingData?.packageType === 'card',
      },
      fields: [
        {
          name: 'tagline',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        }
      ]
    },
    {
        name: 'packageMedia',
        type: 'upload',
        relationTo: 'media',
        label: 'Package Media',
        admin: {
            condition: (_, siblingData) => siblingData?.packageType === 'media',
        },
    },
    link({
        overrides: {
            admin: {
                // Remove condition
            },
        },
    }),
  ],
}
