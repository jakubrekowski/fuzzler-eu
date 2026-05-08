import type { Block } from 'payload'

export const SocialBlock: Block = {
  slug: 'social',
  interfaceName: 'SocialBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: '// 07 — SOCIAL',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Bądź [[na bieżąco]]',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Nie przegap żadnych informacji — sprawdź nasze social media. Najwięcej dzieje się na Telegramie.',
    },
    {
      name: 'links',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'subtext',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Simple Icons Name (e.g. telegram, x, tiktok)',
          required: true,
        },
        {
          name: 'color',
          type: 'select',
          options: [
            { label: 'Purple', value: 'purple' },
            { label: 'Orange', value: 'orange' },
            { label: 'Green', value: 'green' },
            { label: 'Red', value: 'red' },
            { label: 'Graphite', value: 'graphite' },
          ],
          defaultValue: 'graphite',
        },
      ],
    },
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor (ID for scroll)',
    },
  ],
}
