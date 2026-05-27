import type { Block } from 'payload'

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
      name: 'scheduleFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Schedule JSON file',
      required: true,
      filterOptions: () => {
        // Payload's Where type is strict; keep runtime filter but relax TS typing.
        return {
          or: [{ mimeType: { equals: 'application/json' } }, { filename: { like: '.json' } }],
        } as any
      },
      admin: {
        description: 'Upload/select a JSON file from Media.',
      },
    },
  ],
}
