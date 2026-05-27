'use client'

import React, { useEffect, useRef } from 'react'

type FixedHeaderHeightProps = {
  children: React.ReactNode
  className?: string
}

/** Measures the fixed site header stack and sets `--header-h` on `<html>`. */
export function FixedHeaderHeight({ children, className }: FixedHeaderHeightProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)

    // Header padding changes on scroll (py-6 → py-3)
    window.addEventListener('scroll', update, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
