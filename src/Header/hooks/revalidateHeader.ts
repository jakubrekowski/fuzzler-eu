import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { invalidatePublicCache } from '@/utilities/cache/invalidatePublicCache'

export const revalidateHeader: GlobalAfterChangeHook = async ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateTag('global_header', 'max')
    await invalidatePublicCache({ paths: ['/'], purgeEverything: true })
  }

  return doc
}
