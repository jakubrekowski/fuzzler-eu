import { getPostOgData } from '@/utilities/og/data'
import { ogImageResponse } from '@/utilities/og/route'

export const runtime = 'nodejs'

type Args = {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: Args) {
  const { slug } = await params
  return ogImageResponse(await getPostOgData(slug))
}
