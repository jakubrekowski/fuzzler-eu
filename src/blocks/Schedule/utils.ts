/** Festival day window: 08:00 → 04:00 next morning */
export const SCHEDULE_DAY_START = 8 * 60
export const SCHEDULE_DAY_END = (24 + 4) * 60
export const SCHEDULE_DAY_SPAN = SCHEDULE_DAY_END - SCHEDULE_DAY_START
export const HOUR_HEIGHT_PX = 140
export const COLLAPSED_VISIBLE_HOURS = 4

export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + (m || 0)
}

/** Times before 08:00 belong to the post-midnight portion of the festival day */
export function normalizeTimeMinutes(minutes: number): number {
  if (minutes < SCHEDULE_DAY_START) {
    return minutes + 24 * 60
  }
  return minutes
}

export function timeToOffset(time: string): number {
  return normalizeTimeMinutes(parseTimeToMinutes(time)) - SCHEDULE_DAY_START
}

export function eventDurationMinutes(startTime: string, endTime: string): number {
  let start = normalizeTimeMinutes(parseTimeToMinutes(startTime))
  let end = normalizeTimeMinutes(parseTimeToMinutes(endTime))
  if (end <= start) {
    end += 24 * 60
  }
  return end - start
}

export interface DayTimeRange {
  startOffset: number
  endOffset: number
  hours: number[]
  totalHeightPx: number
}

export function getDayTimeRange(
  events: { startTime: string; endTime: string }[],
): DayTimeRange {
  if (events.length === 0) {
    const hours = [0, 1, 2, 3]
    return {
      startOffset: 0,
      endOffset: 3 * 60,
      hours,
      totalHeightPx: hours.length * HOUR_HEIGHT_PX,
    }
  }

  let minOffset = Infinity
  let maxOffset = -Infinity

  for (const e of events) {
    const start = timeToOffset(e.startTime)
    const end = start + eventDurationMinutes(e.startTime, e.endTime)
    minOffset = Math.min(minOffset, start)
    maxOffset = Math.max(maxOffset, end)
  }

  minOffset = Math.max(0, minOffset - 60)
  maxOffset = Math.min(SCHEDULE_DAY_SPAN, maxOffset + 60)

  const startHourIdx = Math.floor(minOffset / 60)
  const endHourIdx = Math.ceil(maxOffset / 60)
  const hours = Array.from({ length: endHourIdx - startHourIdx + 1 }, (_, i) => startHourIdx + i)

  return {
    startOffset: startHourIdx * 60,
    endOffset: endHourIdx * 60,
    hours,
    totalHeightPx: hours.length * HOUR_HEIGHT_PX,
  }
}

export function formatScheduleHour(hourIndex: number): string {
  const h = Math.floor((SCHEDULE_DAY_START + hourIndex * 60) / 60) % 24
  return `${String(h).padStart(2, '0')}:00`
}

export function getCategoryPastelStyles(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const pr = Math.round(r * 0.7 + 255 * 0.3)
  const pg = Math.round(g * 0.7 + 255 * 0.3)
  const pb = Math.round(b * 0.7 + 255 * 0.3)
  const pastelColor = `rgb(${pr}, ${pg}, ${pb})`
  const luminance = (0.299 * pr + 0.587 * pg + 0.114 * pb) / 255
  const isLight = luminance > 0.6
  return {
    pastelColor,
    hex,
    textColor: isLight ? 'text-zinc-900' : 'text-white',
    subtextColor: isLight ? 'text-zinc-900/70' : 'text-white/70',
    badgeBg: isLight ? 'bg-black/10' : 'bg-white/20',
  }
}
