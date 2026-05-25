import type { Block } from 'payload'

import { link } from '@/fields/link'

export const EventBanner: Block = {
  slug: 'eventBanner',
  interfaceName: 'EventBannerBlock',
  labels: {
    singular: 'Event Banner',
    plural: 'Event Banners',
  },
  fields: [
    {
      name: 'metaLine',
      type: 'text',
      label: 'Meta line (date · location)',
      defaultValue: '04-06.09.2026 · HOTEL AMELIÓWKA',
      admin: {
        description: 'Displayed after the // prefix, e.g. dates and venue.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'WPADNIJ NA [[FURR MEETUP.]]',
      admin: {
        description: 'Use [[text]] for the purple highlighted part.',
      },
    },
    {
      name: 'showCapacity',
      type: 'checkbox',
      label: 'Show capacity info',
      defaultValue: true,
    },
    {
      name: 'capacityLimit',
      type: 'number',
      label: 'Place limit',
      defaultValue: 120,
      admin: {
        condition: (_, siblingData) => siblingData?.showCapacity,
      },
    },
    {
      name: 'spotsRemaining',
      type: 'number',
      label: 'Spots remaining',
      defaultValue: 47,
      admin: {
        condition: (_, siblingData) => siblingData?.showCapacity,
      },
    },
    {
      name: 'showCheckIcon',
      type: 'checkbox',
      label: 'Show checkmark on button',
      defaultValue: true,
    },
    link({
      appearances: ['default', 'outline', 'disabled'],
      overrides: {
        name: 'button',
        label: 'CTA button',
      },
    }),
  ],
}
