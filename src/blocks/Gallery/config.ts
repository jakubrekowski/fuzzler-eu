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
        { label: 'Siatka (3 kolumny)', value: 'grid' },
        { label: 'Siatka (2 kolumny)', value: 'grid2' },
        { label: 'Mozaika', value: 'masonry' },
        { label: 'Wyróżnione zdjęcie + kafelki', value: 'featured' },
        { label: 'Karuzela', value: 'carousel' },
        { label: 'Main + gallery (duże zdjęcie i miniatury)', value: 'mainGallery' },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Automatycznie zmieniaj grafikę',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) =>
          siblingData.layout === 'carousel' || siblingData.layout === 'mainGallery',
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
        condition: (_, siblingData) =>
          (siblingData.layout === 'carousel' || siblingData.layout === 'mainGallery') &&
          siblingData.autoplay,
        description: 'Od 2 do 60 sekund.',
      },
    },
  ],
}
