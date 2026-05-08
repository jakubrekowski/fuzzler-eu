import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor Name (for # scroll)',
      admin: {
        description: 'Enables smooth scrolling to this section (e.g. "integracja"). Use this name in links like "#integracja".',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        placeholder: '// 01 - CZEMU WARTO PRZYJECHAĆ',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        placeholder: 'TRZY DNI, TRZY POWODY',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Lucide Icon Name',
          admin: {
            placeholder: 'Users, Book, Coffee...',
          },
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'footerLeft',
          type: 'text',
        },
        {
          name: 'footerRight',
          type: 'text',
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'purple',
          options: [
            { label: 'Purple', value: 'purple' },
            { label: 'Brown', value: 'brown' },
            { label: 'Green', value: 'green' },
          ],
        },
        {
            name: 'link',
            type: 'text',
            label: 'Link URL',
        }
      ],
    },
  ],
}
