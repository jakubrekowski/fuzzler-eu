import type { Block } from 'payload'

export const MarqueeBlock: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  labels: {
    singular: 'Marquee Strip',
    plural: 'Marquee Strips',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 1,
      admin: {
        description: 'Text items that scroll in the strip. Add at least 3–4 for a good effect.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'speed',
      type: 'select',
      label: 'Speed',
      defaultValue: 'normal',
      options: [
        { label: 'Slow', value: 'slow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Fast', value: 'fast' },
      ],
    },
    {
      name: 'direction',
      type: 'select',
      label: 'Direction',
      defaultValue: 'left',
      options: [
        { label: '← Left', value: 'left' },
        { label: '→ Right', value: 'right' },
      ],
    },
    {
      name: 'separator',
      type: 'text',
      label: 'Separator',
      defaultValue: '✦',
      admin: {
        description: 'Character placed between items.',
      },
    },
    {
      name: 'colorScheme',
      type: 'select',
      label: 'Colour Scheme',
      defaultValue: 'orange',
      options: [
        { label: 'Orange (brand)', value: 'orange' },
        { label: 'Dark', value: 'dark' },
        { label: 'Transparent', value: 'transparent' },
      ],
    },
  ],
}
