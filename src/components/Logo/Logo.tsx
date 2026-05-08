import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span className={clsx('flex items-center gap-3', className)}>
      <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] bg-orange flex-shrink-0">
        <img
          src="/assets/bun_color.svg"
          alt="Fuzzler mascot"
          className="h-[90%] w-[90%] object-contain"
        />
      </span>
      <span className="font-bold text-[22px] uppercase tracking-[0.06em] text-cream font-rajdhani leading-none">
        Fuzzler
      </span>
    </span>
  )
}
