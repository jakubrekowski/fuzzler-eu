import type { Block } from 'payload'

import { validatePublicApiDomain } from '@/utilities/publicApi'

export const Schedule: Block = {
  slug: 'schedule',
  interfaceName: 'ScheduleBlock',
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor Name (for # scroll)',
      admin: {
        description: 'Enables smooth scrolling to this section (e.g. "program").',
      },
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
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'dataSource',
      type: 'select',
      label: 'Źródło programu',
      required: true,
      defaultValue: 'file',
      options: [
        { label: 'Plik JSON', value: 'file' },
        { label: 'Publiczne API', value: 'api' },
      ],
    },
    {
      name: 'scheduleFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Schedule JSON file',
      filterOptions: () => {
        // Payload's Where type is strict; keep runtime filter but relax TS typing.
        return {
          or: [{ mimeType: { equals: 'application/json' } }, { filename: { like: '.json' } }],
        } as any
      },
      admin: {
        description: 'Upload/select a JSON file from Media.',
        condition: (_, siblingData) => siblingData?.dataSource !== 'api',
      },
    },
    {
      name: 'apiProtocol',
      type: 'select',
      label: 'Protokół API',
      required: true,
      defaultValue: 'https',
      options: [
        { label: 'HTTPS', value: 'https' },
        { label: 'HTTP', value: 'http' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.dataSource === 'api',
      },
    },
    {
      name: 'apiDomain',
      type: 'text',
      label: 'Domena API',
      validate: ((value: unknown, { siblingData }: { siblingData?: { dataSource?: string } }) => {
        if (siblingData?.dataSource === 'api' && !value) return 'Podaj domenę API.'
        return validatePublicApiDomain(value)
      }) as any,
      admin: {
        description: 'Np. event.example.org. Podaj samą domenę, bez protokołu i ścieżki.',
        condition: (_, siblingData) => siblingData?.dataSource === 'api',
      },
    },
  ],
}
