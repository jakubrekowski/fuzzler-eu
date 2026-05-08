'use client'

import React, { useState, useEffect } from 'react'
import type { CountdownBlock as CountdownBlockProps } from '@/payload-types'
import { ActionButton } from '@/components/ActionButton'
import { cn } from '@/utilities/ui'

export const CountdownBlockComponent: React.FC<CountdownBlockProps> = (props) => {
  const {
    title,
    endDate,
    limitText,
    showNotifyButton,
    notifyButton,
    anchor,
    layout = 'side',
    size = 'default',
  } = props

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!endDate) return

    const targetDate = new Date(endDate).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [endDate])

  const isBig = size === 'big'
  const isCentered = layout === 'center'
  const isLeft = layout === 'left'

  const TimerBox = ({ value, label }: { value: number; label: string }) => (
    <div
      className={cn(
        'flex flex-col items-center justify-center bg-[#222] border border-white/5 rounded-2xl shadow-inner transition-all duration-500',
        isBig ? 'w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-48' : 'w-20 h-24 sm:w-24 sm:h-28',
      )}
    >
      <span
        className={cn(
          'font-bold text-orange font-mono',
          isBig ? 'text-4xl sm:text-6xl md:text-8xl' : 'text-3xl sm:text-4xl',
        )}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        className={cn(
          'font-mono text-zinc-500 uppercase tracking-widest mt-1',
          isBig ? 'text-[10px] sm:text-xs md:text-sm' : 'text-[9px] sm:text-[10px]',
        )}
      >
        {label}
      </span>
    </div>
  )

  return (
    <div className="container py-8" id={anchor || undefined}>
      <div
        className={cn(
          'relative bg-[#1a1a1a]/80 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-sm transition-all duration-500',
          isBig ? 'p-10 md:p-20' : 'p-6 md:p-10',
          isCentered && 'text-center',
        )}
      >
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange/5 blur-[150px] rounded-full pointer-events-none" />

        <div
          className={cn(
            'relative flex transition-all duration-500',
            layout === 'side'
              ? 'flex-col lg:flex-row items-center justify-between gap-12'
              : 'flex-col gap-12 md:gap-20',
            isCentered ? 'items-center' : 'items-start',
          )}
        >
          {/* Timer Section */}
          <div className={cn('flex flex-col gap-6', isCentered ? 'items-center' : 'items-start')}>
            <p
              className={cn(
                'font-mono text-zinc-500 uppercase tracking-[0.3em]',
                isBig ? 'text-sm sm:text-lg md:text-xl' : 'text-xs sm:text-sm',
              )}
            >
              // {title}
            </p>
            <div
              className={cn(
                'flex flex-wrap gap-3 sm:gap-4 md:gap-6',
                isCentered ? 'justify-center' : 'justify-start',
              )}
            >
              <TimerBox value={timeLeft.days} label="Dni" />
              <TimerBox value={timeLeft.hours} label="Godz." />
              <TimerBox value={timeLeft.minutes} label="Min" />
              <TimerBox value={timeLeft.seconds} label="Sek" />
            </div>
          </div>

          {/* CTA Section */}
          {(limitText || (showNotifyButton && notifyButton)) && (
            <div
              className={cn(
                'flex flex-col gap-6',
                layout === 'side'
                  ? 'items-center lg:items-end'
                  : isCentered
                    ? 'items-center'
                    : 'items-start',
              )}
            >
              {limitText && (
                <p
                  className={cn(
                    'font-mono text-zinc-500 uppercase tracking-[0.3em]',
                    isBig ? 'text-sm sm:text-lg md:text-xl' : 'text-xs sm:text-sm',
                  )}
                >
                  // {limitText}
                </p>
              )}
              {showNotifyButton && notifyButton && (
                <ActionButton
                  link={notifyButton}
                  size="lg"
                  className={cn(
                    'bg-red-500 hover:bg-red-600 shadow-[0_6px_0_0_#991b1b,0_12px_32px_-8px_rgba(239,68,68,0.5)]',
                    isBig && 'h-20 px-16 text-xl',
                  )}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
