import type { Block } from 'payload'
import { link } from '@/fields/link'

export const Countdown: Block = {
  slug: 'countdown',
  interfaceName: 'CountdownBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'side',
      options: [
        { label: 'Side (Timer Left, CTA Right)', value: 'side' },
        { label: 'Centered', value: 'center' },
        { label: 'Left Aligned', value: 'left' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Big', value: 'big' },
      ],
    },
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor Name (for # scroll)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title/Tagline',
      defaultValue: 'PRESALE OTWIERA SIĘ ZA',
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date & Time',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'limitText',
      type: 'text',
      label: 'Limit Text (Right side)',
      defaultValue: 'LIMIT MIEJSC: 120',
    },
    {
      name: 'showNotifyButton',
      type: 'checkbox',
      label: 'Show Notify Button',
      defaultValue: true,
    },
    link({
      overrides: {
        name: 'notifyButton',
        label: 'Notify Button',
        admin: {
          condition: (_, siblingData) => siblingData?.showNotifyButton,
        },
      },
    }),
  ],
}
