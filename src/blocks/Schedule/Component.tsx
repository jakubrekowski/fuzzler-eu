'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { ScheduleBlock as ScheduleBlockProps } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { HighlightedText } from '@/components/HighlightedText'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/ui'
import { X, Calendar, Clock, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react'
import {
  COLLAPSED_VISIBLE_HOURS,
  HOUR_HEIGHT_PX,
  eventDurationMinutes,
  formatScheduleHour,
  getCategoryPastelStyles,
  getDayTimeRange,
  timeToOffset,
} from './utils'

interface Day {
  id: string
  date: string
  label: string
}
interface Room {
  id: string
  name: string
}
interface Category {
  id: string
  name: string
  color: string
}
interface Presenter {
  id: string
  name: string
  bio?: string
}
interface Event {
  id: string
  dayId: string
  roomId: string
  categoryId: string
  presenterIds?: string[]
  startTime: string
  endTime: string
  title: string
  description?: string
  location_detail?: string
}
interface ScheduleData {
  days: Day[]
  rooms: Room[]
  categories: Category[]
  presenters: Presenter[]
  events: Event[]
}

interface ScheduleEventCardProps {
  event: Event
  rangeStartOffset: number
  category?: Category
  presenterNames: string
  onSelect: (event: Event) => void
}

function ScheduleEventCard({
  event,
  rangeStartOffset,
  category,
  presenterNames,
  onSelect,
}: ScheduleEventCardProps) {
  const startOffset = timeToOffset(event.startTime)
  const duration = eventDurationMinutes(event.startTime, event.endTime)
  const topPx = ((startOffset - rangeStartOffset) / 60) * HOUR_HEIGHT_PX + 4
  const heightPx = (duration / 60) * HOUR_HEIGHT_PX - 8

  const hex = category?.color || '#333'
  const { pastelColor, textColor, subtextColor, badgeBg } = getCategoryPastelStyles(hex)

  const isShort = duration <= 30
  const isMedium = duration <= 60

  return (
    <div
      onClick={() => onSelect(event)}
      className={cn(
        'absolute left-1 right-1 rounded-2xl border pointer-events-auto transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group overflow-hidden cursor-pointer flex flex-col',
        isShort ? 'p-2.5 px-3' : 'p-4',
      )}
      style={{
        top: `${topPx}px`,
        height: `${Math.max(heightPx, isShort ? 64 : 28)}px`,
        background: `linear-gradient(135deg, ${pastelColor} 0%, ${hex} 100%)`,
        borderColor: `${hex}40`,
        boxShadow: `0 10px 30px -10px ${hex}40, inset 0 0 0 1px rgba(255,255,255,0.1)`,
      }}
    >
      <div
        className={cn(
          'flex justify-between items-start gap-2 shrink-0',
          isShort ? 'mb-1' : 'mb-2',
        )}
      >
        <span
          className={cn(
            'font-black uppercase rounded backdrop-blur-sm leading-tight',
            isShort ? 'text-[9px] px-1.5 py-0.5' : 'text-[11px] px-2 py-1',
            badgeBg,
            textColor,
          )}
        >
          <HighlightedText>{category?.name}</HighlightedText>
        </span>
        <span
          className={cn(
            'font-mono font-bold shrink-0',
            isShort ? 'text-[9px] opacity-90' : 'text-[11px] opacity-70 group-hover:opacity-100',
            subtextColor,
          )}
        >
          {event.startTime} {!isShort && `– ${event.endTime}`}
        </span>
      </div>

      <h5
        className={cn(
          'font-bold uppercase tracking-tight font-rajdhani leading-tight',
          isShort ? 'text-[14px] line-clamp-2 mb-1' : 'text-[15px] line-clamp-2 mb-1',
          textColor,
        )}
      >
        <HighlightedText>{event.title}</HighlightedText>
      </h5>

      <div className={cn('flex flex-col gap-0.5 shrink-0 min-h-0', !isShort && 'mt-auto')}>
        {!isShort && presenterNames && (
          <p className={cn('truncate font-bold uppercase tracking-wide text-[12px]', subtextColor)}>
            {presenterNames}
          </p>
        )}
        {isShort && presenterNames && (
          <p className={cn('truncate font-bold uppercase tracking-wide text-[11px]', subtextColor)}>
            {presenterNames}
          </p>
        )}
        {!isShort && event.location_detail && !isMedium && (
          <p
            className={cn(
              'text-[10px] font-mono uppercase tracking-[0.12em] font-bold truncate',
              subtextColor,
            )}
          >
            <HighlightedText>{event.location_detail}</HighlightedText>
          </p>
        )}
      </div>

      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[150%] pointer-events-none" />
    </div>
  )
}

export const ScheduleBlockComponent: React.FC<ScheduleBlockProps> = (props) => {
  const scheduleUrl = (props as ScheduleBlockProps & { scheduleUrl?: string }).scheduleUrl
  const scheduleFile = (props as ScheduleBlockProps & { scheduleFile?: any }).scheduleFile
  const { tagline, title, description, anchor } = props
  const [data, setData] = useState<ScheduleData | null>(null)
  const [activeDayId, setActiveDayId] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fileUrl =
      typeof scheduleFile === 'string'
        ? scheduleFile
        : scheduleFile?.url || scheduleFile?.sizes?.original?.url

    const source = fileUrl || scheduleUrl
    if (!source) return

    fetch(source)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch schedule data')
        return res.json()
      })
      .then((json) => {
        setData(json)
        if (json.days?.length > 0) {
          setActiveDayId(json.days[0].id)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
        setLoading(false)
      })
  }, [scheduleUrl, scheduleFile])

  const headerScrollRef = useRef<HTMLDivElement | null>(null)
  const bodyScrollRef = useRef<HTMLDivElement | null>(null)
  const syncingRef = useRef(false)

  const scrollerClass = useMemo(
    () =>
      cn(
        'overflow-x-auto overflow-y-visible',
        '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
      ),
    [],
  )

  const syncScroll = (from: 'header' | 'body') => {
    const src = from === 'header' ? headerScrollRef.current : bodyScrollRef.current
    const dst = from === 'header' ? bodyScrollRef.current : headerScrollRef.current
    if (!src || !dst) return
    if (syncingRef.current) return
    syncingRef.current = true
    dst.scrollLeft = src.scrollLeft
    requestAnimationFrame(() => {
      syncingRef.current = false
    })
  }

  const handleDayChange = (dayId: string) => {
    setActiveDayId(dayId)
  }

  if (loading) return <div className="container py-24 text-center">Loading schedule...</div>
  if (error) return <div className="container py-24 text-center text-red-500">Error: {error}</div>
  if (!data || !activeDayId) return null

  const activeDay = data.days.find((d) => d.id === activeDayId)
  const dayEvents = data.events.filter((e) => e.dayId === activeDayId)
  const timeRange = getDayTimeRange(dayEvents)
  const gridColumns = `80px repeat(${data.rooms.length}, 1fr)`
  const collapsedMaxHeight = COLLAPSED_VISIBLE_HOURS * HOUR_HEIGHT_PX
  const showExpand = timeRange.totalHeightPx > collapsedMaxHeight

  const getPresenterNames = (ids?: string[]) => {
    if (!ids) return ''
    return ids
      .map((id) => data.presenters.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(', ')
  }

  const getCategory = (id: string) => data.categories.find((c) => c.id === id)
  const getRoomName = (id: string) => data.rooms.find((r) => r.id === id)?.name

  return (
    <div className="container py-24" id={anchor || undefined}>
      <div className="mb-12">
        <SectionHeader tagline={tagline} title={title} description={description} />
      </div>

      {/*
        overflow-hidden on this card breaks position:sticky (header would only stick inside the clipped box).
        Rounded corners: top on sticky strip, bottom on the body/footer block.
      */}
      <div className="relative bg-[#1a1a1a]/50 border border-white/10 rounded-[32px] shadow-2xl">
        {/* Sticky: day picker + room headers — below fixed site header (set --header-h on layout if needed) */}
        <div
          className={cn(
            'sticky z-[35] rounded-t-[32px] bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10',
            'top-[var(--header-h,5.75rem)]',
          )}
        >
          <div className="px-4 pt-4 pb-3 md:px-6">
                {/* Mobile: custom select */}
                <div className="md:hidden">
                  <Select value={activeDayId} onValueChange={handleDayChange}>
                    <SelectTrigger
                      className={cn(
                        'h-12 w-full rounded-[24px] border-white/15 bg-white/[0.05] px-5',
                        'text-[13px] font-bold uppercase tracking-widest text-white',
                        'focus-visible:ring-orange/30 focus-visible:border-orange/40',
                        '[&_svg]:text-orange',
                      )}
                    >
                      <SelectValue>
                        {activeDay && (
                          <>
                            <span className="opacity-60 mr-2">{activeDay.date}</span>
                            <HighlightedText>{activeDay.label}</HighlightedText>
                          </>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      className={cn(
                        'rounded-2xl border-white/15 bg-[#1f1f1f] text-white',
                        'shadow-2xl backdrop-blur-md',
                      )}
                    >
                      {data.days.map((day) => (
                        <SelectItem
                          key={day.id}
                          value={day.id}
                          className={cn(
                            'rounded-xl py-3 text-[13px] font-bold uppercase tracking-widest',
                            'focus:bg-orange/20 focus:text-white',
                          )}
                        >
                          <span className="opacity-60 mr-2">{day.date}</span>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Desktop: pill tabs */}
                <div className="hidden md:flex justify-center">
                  <div className="flex flex-wrap justify-center gap-3 p-2 bg-white/[0.03] border border-white/10 rounded-[40px]">
                    {data.days.map((day) => (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => handleDayChange(day.id)}
                        className={cn(
                          'px-8 py-3 rounded-[32px] text-[13px] font-bold uppercase tracking-widest transition-all duration-300',
                          activeDayId === day.id
                            ? 'bg-orange text-graphite shadow-[0_8px_24px_-8px_rgba(255,144,0,0.5)]'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5',
                        )}
                      >
                        <span className="opacity-60 mr-2">{day.date}</span>
                        <HighlightedText>{day.label}</HighlightedText>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

          <div className="border-t border-white/10 bg-white/[0.02]">
            <div className="grid" style={{ gridTemplateColumns: gridColumns }}>
              <div className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center border-r border-white/10">
                Godz.
              </div>
              <div
                ref={headerScrollRef}
                onScroll={() => syncScroll('header')}
                className={scrollerClass}
              >
                <div
                  className="grid min-w-[920px]"
                  style={{ gridTemplateColumns: `repeat(${data.rooms.length}, 1fr)` }}
                >
                  {data.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="p-4 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 text-center"
                    >
                      <HighlightedText>{room.name}</HighlightedText>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body: one horizontal scroller (no visible scrollbar) */}
        <div className="relative overflow-hidden rounded-b-[32px]">
          <div
            className={cn(
              'relative transition-[max-height] duration-500 ease-out',
              !expanded && showExpand && 'overflow-hidden',
            )}
            style={!expanded && showExpand ? { maxHeight: `${collapsedMaxHeight}px` } : undefined}
          >
            <div className="grid" style={{ gridTemplateColumns: '80px 1fr' }}>
              {/* Time column */}
              <div className="border-r border-white/10">
                {timeRange.hours.map((hourIdx) => (
                  <div
                    key={hourIdx}
                    className="border-b border-white/5 flex items-start justify-center pt-4 text-[13px] font-mono text-zinc-600"
                    style={{ height: `${HOUR_HEIGHT_PX}px` }}
                  >
                    {formatScheduleHour(hourIdx)}
                  </div>
                ))}
              </div>

              {/* Rooms area (scroll X) */}
              <div
                ref={bodyScrollRef}
                onScroll={() => syncScroll('body')}
                className={scrollerClass}
              >
                <div
                  className="relative min-w-[920px]"
                  style={{ height: `${timeRange.totalHeightPx}px` }}
                >
                  {/* Background grid */}
                  <div className="absolute inset-0">
                    {timeRange.hours.map((hourIdx) => (
                      <div
                        key={hourIdx}
                        className="grid border-b border-white/5"
                        style={{
                          gridTemplateColumns: `repeat(${data.rooms.length}, 1fr)`,
                          height: `${HOUR_HEIGHT_PX}px`,
                        }}
                      >
                        {data.rooms.map((room) => (
                          <div key={room.id} className="border-r border-white/5 last:border-r-0" />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Events overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none grid h-full"
                    style={{ gridTemplateColumns: `repeat(${data.rooms.length}, 1fr)` }}
                  >
                    {data.rooms.map((room) => (
                      <div key={room.id} className="relative h-full">
                        {dayEvents
                          .filter((e) => e.roomId === room.id)
                          .map((event) => (
                            <ScheduleEventCard
                              key={event.id}
                              event={event}
                              rangeStartOffset={timeRange.startOffset}
                              category={getCategory(event.categoryId)}
                              presenterNames={getPresenterNames(event.presenterIds)}
                              onSelect={setSelectedEvent}
                            />
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {!expanded && showExpand && (
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, #1a1a1a 0%, #1a1a1ae6 35%, transparent 100%)',
                }}
              />
            )}
          </div>

          {showExpand && (
            <div className="flex justify-center border-t border-white/5 bg-[#1a1a1a]/80 py-4">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className={cn(
                  'inline-flex items-center gap-2 px-8 py-3 rounded-[32px]',
                  'text-[12px] font-bold uppercase tracking-widest transition-all duration-300',
                  'border border-white/15 bg-white/[0.05] text-zinc-300',
                  'hover:text-white hover:bg-white/10 hover:border-orange/30',
                )}
              >
                {expanded ? (
                  <>
                    Zwiń program
                    <ChevronUp size={16} className="text-orange" />
                  </>
                ) : (
                  <>
                    Rozwiń program
                    <ChevronDown size={16} className="text-orange" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-8 text-zinc-500 text-xs font-mono text-center uppercase tracking-widest opacity-40">
        Przesuń tabelę w poziomie, aby zobaczyć wszystkie sale →
      </p>

      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-graphite/80 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          />

          <div className="relative bg-zinc-900 border border-white/10 rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div
              className="h-4 sm:h-6 w-full"
              style={{ backgroundColor: getCategory(selectedEvent.categoryId)?.color }}
            />

            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                  style={{
                    backgroundColor: `${getCategory(selectedEvent.categoryId)?.color}15`,
                    borderColor: `${getCategory(selectedEvent.categoryId)?.color}30`,
                    color: getCategory(selectedEvent.categoryId)?.color,
                  }}
                >
                  <HighlightedText>{getCategory(selectedEvent.categoryId)?.name}</HighlightedText>
                </span>
                <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
                  // {selectedEvent.startTime} – {selectedEvent.endTime}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight font-rajdhani mb-8 text-white leading-none">
                <HighlightedText>{selectedEvent.title}</HighlightedText>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">
                        Dzień
                      </p>
                      <p className="font-bold">
                        {activeDay?.date} · <HighlightedText>{activeDay?.label}</HighlightedText>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">
                        Czas
                      </p>
                      <p className="font-bold">
                        {selectedEvent.startTime} – {selectedEvent.endTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">
                        Miejsce
                      </p>
                      <p className="font-bold">
                        <HighlightedText>{getRoomName(selectedEvent.roomId)}</HighlightedText>
                        {selectedEvent.location_detail && (
                          <span className="text-zinc-500 font-normal ml-1">
                            (
                            <HighlightedText>{selectedEvent.location_detail}</HighlightedText>
                            )
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.presenterIds && (
                    <div className="flex items-center gap-4 text-zinc-300">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange shrink-0">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">
                          Prowadzący
                        </p>
                        <p className="font-bold">
                          <HighlightedText>
                            {getPresenterNames(selectedEvent.presenterIds)}
                          </HighlightedText>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedEvent.description && (
                <div className="pt-10 border-t border-white/5">
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    <HighlightedText>{selectedEvent.description}</HighlightedText>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
