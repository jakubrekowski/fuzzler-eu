import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import { GalleryClient } from './Component.client'

type Props = GalleryBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const GalleryBlock = ({ className, disableInnerContainer, ...props }: Props) => (
  <GalleryClient className={className} disableInnerContainer={disableInnerContainer} {...props} />
)
