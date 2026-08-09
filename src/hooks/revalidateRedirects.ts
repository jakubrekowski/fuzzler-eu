import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { invalidatePublicCache } from '@/utilities/cache/invalidatePublicCache'

export const revalidateRedirects: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  revalidateTag('redirects', 'max')
  await invalidatePublicCache({ paths: [doc.from] })

  return doc
}
