'use client'

import { useEffect, useState } from 'react'
import {
  HOUR_HEIGHT_MOBILE_PX,
  HOUR_HEIGHT_PX,
  SCHEDULE_ROOMS_MIN_WIDTH_DESKTOP,
  SCHEDULE_ROOMS_MIN_WIDTH_MOBILE,
  SCHEDULE_TIME_COL_DESKTOP,
  SCHEDULE_TIME_COL_MOBILE,
} from './utils'

export function useScheduleLayout() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return {
    isMobile,
    hourHeightPx: isMobile ? HOUR_HEIGHT_MOBILE_PX : HOUR_HEIGHT_PX,
    timeColWidth: isMobile ? SCHEDULE_TIME_COL_MOBILE : SCHEDULE_TIME_COL_DESKTOP,
    roomsMinWidth: isMobile ? SCHEDULE_ROOMS_MIN_WIDTH_MOBILE : SCHEDULE_ROOMS_MIN_WIDTH_DESKTOP,
  }
}
