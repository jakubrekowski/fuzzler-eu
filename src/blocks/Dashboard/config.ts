import type { Block, Field } from 'payload'

const statFields: Field[] = [
  { name: 'title', type: 'text', label: 'Title' },
  { name: 'value', type: 'text', label: 'Value' },
  {
    name: 'color',
    type: 'select',
    defaultValue: 'orange',
    options: [
      { label: 'Orange', value: 'orange' },
      { label: 'Red', value: 'red' },
      { label: 'Purple', value: 'purple' },
      { label: 'Graphite', value: 'graphite' },
    ],
  },
]

export const Dashboard: Block = {
  slug: 'dashboard',
  interfaceName: 'DashboardBlock',
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor Name',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mainMedia',
          type: 'group',
          label: 'Main Content (Large Left Card)',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'media',
              options: [
                { label: 'Image / Video', value: 'media' },
                { label: 'Google Maps', value: 'map' },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'media',
              },
            },
            {
              name: 'mapUrl',
              type: 'text',
              label: 'Google Maps Embed URL',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'map',
              },
            },
            { name: 'title', type: 'text', label: 'Overlay Title' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stat1',
          type: 'group',
          label: 'Stat Card 1 (Top Right)',
          fields: statFields,
        },
        {
          name: 'stat2',
          type: 'group',
          label: 'Stat Card 2 (Top Right)',
          fields: statFields,
        },
      ],
    },
    {
      name: 'infoCard',
      type: 'group',
      label: 'Info Card (Middle Right)',
      fields: [
        { name: 'title', type: 'text', label: 'Title' },
        { name: 'content', type: 'textarea', label: 'Content (supports newlines)' },
      ],
    },
    {
      name: 'featuresTagline',
      type: 'text',
      label: 'Features Section Tagline (e.g. // DOJAZD)',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature Items (Bottom Right Row)',
      maxRows: 3,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Lucide Icon Name (e.g. Car, Train, MapPin)',
          admin: {
            description: 'Check icons at lucide.dev',
          },
        },
        { name: 'title', type: 'text', label: 'Title' },
        { name: 'description', type: 'text', label: 'Short Description' },
      ],
    },
  ],
}
