import type { Block } from 'payload'

import { link } from '@/fields/link'
import { validatePublicApiDomain } from '@/utilities/publicApi'

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
      name: 'capacitySource',
      type: 'select',
      label: 'Źródło danych o miejscach',
      defaultValue: 'static',
      options: [
        { label: 'Dane wprowadzone ręcznie', value: 'static' },
        { label: 'Publiczne API hoteli', value: 'api' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showCapacity,
      },
    },
    {
      name: 'capacityLimit',
      type: 'number',
      label: 'Place limit',
      defaultValue: 120,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.showCapacity && siblingData?.capacitySource !== 'api',
      },
    },
    {
      name: 'spotsRemaining',
      type: 'number',
      label: 'Spots remaining',
      defaultValue: 47,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.showCapacity && siblingData?.capacitySource !== 'api',
      },
    },
    {
      name: 'capacityApiProtocol',
      type: 'select',
      label: 'Protokół API hoteli',
      required: true,
      defaultValue: 'https',
      options: [
        { label: 'HTTPS', value: 'https' },
        { label: 'HTTP', value: 'http' },
      ],
      admin: {
        condition: (_, siblingData) =>
          siblingData?.showCapacity && siblingData?.capacitySource === 'api',
      },
    },
    {
      name: 'capacityApiDomain',
      type: 'text',
      label: 'Domena API hoteli',
      validate: ((
        value: unknown,
        { siblingData }: { siblingData?: { showCapacity?: boolean; capacitySource?: string } },
      ) => {
        if (siblingData?.showCapacity && siblingData?.capacitySource === 'api' && !value) {
          return 'Podaj domenę API hoteli.'
        }
        return validatePublicApiDomain(value)
      }) as any,
      admin: {
        description: 'Np. event.example.org. Podaj samą domenę, bez protokołu i ścieżki.',
        condition: (_, siblingData) =>
          siblingData?.showCapacity && siblingData?.capacitySource === 'api',
      },
    },
    {
      name: 'capacityScope',
      type: 'select',
      label: 'Zakres danych o miejscach',
      defaultValue: 'overall',
      options: [
        { label: 'Wszystkie hotele', value: 'overall' },
        { label: 'Wybrane hotele', value: 'selectedHotels' },
      ],
      admin: {
        condition: (_, siblingData) =>
          siblingData?.showCapacity && siblingData?.capacitySource === 'api',
      },
    },
    {
      name: 'selectedHotelIds',
      type: 'textarea',
      label: 'Identyfikatory wybranych hoteli',
      validate: ((
        value: unknown,
        { siblingData }: { siblingData?: { showCapacity?: boolean; capacitySource?: string; capacityScope?: string } },
      ) => {
        if (
          siblingData?.showCapacity &&
          siblingData?.capacitySource === 'api' &&
          siblingData?.capacityScope === 'selectedHotels' &&
          !value
        ) {
          return 'Podaj co najmniej jeden identyfikator hotelu.'
        }
        return true
      }) as any,
      admin: {
        description: 'Wpisz identyfikatory UUID oddzielone przecinkami. Są dostępne w odpowiedzi API hoteli.',
        condition: (_, siblingData) =>
          siblingData?.showCapacity &&
          siblingData?.capacitySource === 'api' &&
          siblingData?.capacityScope === 'selectedHotels',
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
