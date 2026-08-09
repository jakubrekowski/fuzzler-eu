import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { invalidatePublicCache } from '@/utilities/cache/invalidatePublicCache'

export const revalidateFooter: GlobalAfterChangeHook = async ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateTag('global_footer', 'max')
    await invalidatePublicCache({ paths: ['/'], purgeEverything: true })
  }

  return doc
}
