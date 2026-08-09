import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { invalidatePublicCache } from '@/utilities/cache/invalidatePublicCache'

export const revalidateSiteSettings: GlobalAfterChangeHook = async ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating site settings')

    revalidateTag('global_site-settings', 'max')
    await invalidatePublicCache({ paths: ['/'], purgeEverything: true })
  }

  return doc
}
