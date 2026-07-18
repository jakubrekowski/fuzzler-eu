import type { Block } from 'payload'

export const RecommendedOrganizations: Block = {
  slug: 'recommendations',
  interfaceName: 'RecommendedOrganizationsBlock',
  labels: {
    singular: 'Polecam Allegrowicza',
    plural: 'Polecam Allegrowicza',
  },
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'Kotwica sekcji',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Nadtytuł',
      defaultValue: '// POLECAM ALLEGROWICZA',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Tytuł',
      required: true,
      defaultValue: 'WARTO [[ICH POZNAĆ.]]',
      admin: {
        description: 'Użyj [[tekst]] aby wyróżnić fragment kolorem.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis sekcji',
    },
    {
      name: 'organizations',
      type: 'array',
      label: 'Polecane organizacje',
      minRows: 1,
      labels: {
        singular: 'Organizacja',
        plural: 'Organizacje',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nazwa',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Opis',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Grafika',
          required: true,
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'url',
              type: 'text',
              label: 'Adres URL',
              required: true,
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Otwórz w nowej karcie',
              defaultValue: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Tekst przycisku',
              required: true,
              defaultValue: 'Poznaj organizację',
            },
          ],
        },
      ],
    },
  ],
}
