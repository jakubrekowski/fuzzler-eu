import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Fuzzler — wydarzenie, społeczność i aktualności ze świata fuzzingu i bezpieczeństwa.',
  siteName: 'Fuzzler',
  title: 'Fuzzler',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  const { images, ...rest } = og ?? {}

  return {
    ...defaultOpenGraph,
    ...rest,
    ...(images ? { images } : {}),
  }
}
