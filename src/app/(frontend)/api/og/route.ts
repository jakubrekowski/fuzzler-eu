import { getSiteOgData } from '@/utilities/og/data'
import { ogImageResponse } from '@/utilities/og/route'

export const runtime = 'nodejs'

export async function GET() {
  return ogImageResponse(await getSiteOgData())
}
