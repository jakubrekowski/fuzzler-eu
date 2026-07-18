import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Galeria',
    plural: 'Galerie',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Grafiki',
      minRows: 1,
      required: true,
      labels: {
        singular: 'Grafika',
        plural: 'Grafiki',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Grafika',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Układ wyświetlania',
      defaultValue: 'grid',
      required: true,
      options: [
        { label: 'Siatka', value: 'grid' },
        { label: 'Mozaika', value: 'masonry' },
        { label: 'Karuzela', value: 'carousel' },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Automatycznie zmieniaj grafikę',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'carousel',
      },
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      label: 'Czas między zmianami (sekundy)',
      defaultValue: 5,
      min: 2,
      max: 60,
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'carousel' && siblingData.autoplay,
        description: 'Od 2 do 60 sekund.',
      },
    },
  ],
}
