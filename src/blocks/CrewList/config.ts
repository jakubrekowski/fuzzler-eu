import type { Block } from 'payload'

import { link } from '@/fields/link'

export const CrewList: Block = {
  slug: 'crewList',
  interfaceName: 'CrewListBlock',
  labels: {
    singular: 'Crew List',
    plural: 'Crew Lists',
  },
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor Name (for # scroll)',
      admin: {
        description: 'Enables smooth scrolling to this section (e.g. "crew").',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: '// 05 — CREW',
      admin: {
        placeholder: '// 05 — GDZIE SIĘ SPOTKAMY',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: '[[OGRÓWKA.]] CREW',
      admin: {
        description: 'Use [[text]] for the orange highlighted part.',
        placeholder: '[[LOKALIZACJA.]] WIDZIMY SIĘ TUTAJ!',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Made by chill people and a lot of paws — the people behind the meetup and the magic on site.',
      admin: {
        description: 'Shown on the right side of the header (desktop).',
      },
    },
    {
      name: 'members',
      type: 'array',
      label: 'Crew members',
      minRows: 1,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role badge',
          required: true,
          admin: {
            placeholder: 'org, helper, magik od sceny…',
          },
        },
        {
          name: 'accentColor',
          type: 'select',
          label: 'Accent color',
          defaultValue: 'orange',
          required: true,
          options: [
            { label: 'Orange', value: 'orange' },
            { label: 'Green', value: 'green' },
            { label: 'White', value: 'white' },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'note',
          type: 'text',
          label: 'Note (smaller text below description)',
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            name: 'button',
            label: 'Action button',
          },
        }),
      ],
    },
  ],
}
