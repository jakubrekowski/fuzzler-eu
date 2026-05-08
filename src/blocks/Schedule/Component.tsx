'use client'

import React, { useState, useEffect } from 'react'
import type { ScheduleBlock as ScheduleBlockProps } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'
import { X, Calendar, Clock, MapPin, User } from 'lucide-react'

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

export const ScheduleBlockComponent: React.FC<ScheduleBlockProps> = (props) => {
  const { tagline, title, description, scheduleUrl, anchor } = props
  const [data, setData] = useState<ScheduleData | null>(null)
  const [activeDayId, setActiveDayId] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!scheduleUrl) return

    fetch(scheduleUrl)
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
  }, [scheduleUrl])

  if (loading) return <div className="container py-24 text-center">Loading schedule...</div>
  if (error) return <div className="container py-24 text-center text-red-500">Error: {error}</div>
  if (!data) return null

  const activeDay = data.days.find((d) => d.id === activeDayId)
  const dayEvents = data.events.filter((e) => e.dayId === activeDayId)

  // Calculate time range
  const allTimes = data.events
    .filter((e) => e.dayId === activeDayId)
    .flatMap((e) => [e.startTime, e.endTime])
  
  const startHour = allTimes.length > 0 ? Math.min(...allTimes.map(t => parseInt(t.split(':')[0]))) : 9
  const endHour = allTimes.length > 0 ? Math.max(...allTimes.map(t => parseInt(t.split(':')[0]))) + 1 : 20
  
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)

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
      {/* Header Section */}
      <div className="mb-12">
        <SectionHeader tagline={tagline} title={title} description={description} />
      </div>

      {/* Day Selector */}
      <div className="flex justify-center mb-10">
        <div className="flex flex-wrap justify-center gap-3 p-2 bg-white/[0.03] border border-white/10 rounded-[40px]">
          {data.days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDayId(day.id)}
              className={cn(
                'px-8 py-3 rounded-[32px] text-[13px] font-bold uppercase tracking-widest transition-all duration-300',
                activeDayId === day.id
                  ? 'bg-orange text-graphite shadow-[0_8px_24px_-8px_rgba(255,144,0,0.5)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              <span className="opacity-60 mr-2">{day.date}</span>
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="relative bg-[#1a1a1a]/50 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Header Row */}
            <div 
              className="grid border-b border-white/10 bg-white/[0.02] sticky top-0 z-20 backdrop-blur-md"
              style={{ gridTemplateColumns: `80px repeat(${data.rooms.length}, 1fr)` }}
            >
              <div className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center border-r border-white/10">
                Godz.
              </div>
              {data.rooms.map((room) => (
                <div key={room.id} className="p-4 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 text-center">
                  {room.name}
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              {hours.map((hour) => (
                <div 
                  key={hour}
                  className="grid border-b border-white/5"
                  style={{ gridTemplateColumns: `80px repeat(${data.rooms.length}, 1fr)`, height: '140px' }}
                >
                  <div className="flex items-start justify-center pt-4 text-[13px] font-mono text-zinc-600 border-r border-white/10">
                    {String(hour).padStart(2, '0')}:00
                  </div>
                  {data.rooms.map((room) => (
                    <div key={room.id} className="border-r border-white/5 last:border-r-0" />
                  ))}
                </div>
              ))}

              {/* Events Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ 
                    gridTemplateColumns: `80px repeat(${data.rooms.length}, 1fr)`,
                    marginLeft: '80px', // Offset for time column
                    width: 'calc(100% - 80px)'
                }}
              >
                <div 
                  className="grid h-full"
                  style={{ gridTemplateColumns: `repeat(${data.rooms.length}, 1fr)` }}
                >
                  {data.rooms.map((room, roomIdx) => (
                    <div key={room.id} className="relative h-full">
                      {dayEvents
                        .filter((e) => e.roomId === room.id)
                        .map((event) => {
                          const start = event.startTime.split(':').map(Number)
                          const end = event.endTime.split(':').map(Number)
                          
                          const startMinutes = (start[0] - startHour) * 60 + start[1]
                          const endMinutes = (end[0] - startHour) * 60 + end[1]
                          const duration = endMinutes - startMinutes

                          const category = getCategory(event.categoryId)
                          const hex = category?.color || '#333'
                          
                          // Simple hex to pastel gradient logic
                          const r = parseInt(hex.slice(1, 3), 16)
                          const g = parseInt(hex.slice(3, 5), 16)
                          const b = parseInt(hex.slice(5, 7), 16)
                          
                          // Mix with white to pastel-ify (70% color, 30% white)
                          const pr = Math.round(r * 0.7 + 255 * 0.3)
                          const pg = Math.round(g * 0.7 + 255 * 0.3)
                          const pb = Math.round(b * 0.7 + 255 * 0.3)
                          const pastelColor = `rgb(${pr}, ${pg}, ${pb})`
                          
                          // Choose text color based on luminance
                          const luminance = (0.299 * pr + 0.587 * pg + 0.114 * pb) / 255
                          const textColor = luminance > 0.6 ? 'text-zinc-900' : 'text-white'
                          const subtextColor = luminance > 0.6 ? 'text-zinc-900/60' : 'text-white/60'
                          const badgeBg = luminance > 0.6 ? 'bg-black/10' : 'bg-white/20'

                          const isShort = duration <= 30
                          const isMedium = duration <= 60

                          return (
                            <div
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={cn(
                                "absolute left-1 right-1 rounded-2xl border pointer-events-auto transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group overflow-hidden cursor-pointer flex flex-col",
                                isShort ? "p-2 px-3" : "p-4"
                              )}
                              style={{
                                top: `${(startMinutes / 60) * 140 + 4}px`,
                                height: `${(duration / 60) * 140 - 8}px`,
                                background: `linear-gradient(135deg, ${pastelColor} 0%, ${hex} 100%)`,
                                borderColor: `${hex}40`,
                                boxShadow: `0 10px 30px -10px ${hex}40, inset 0 0 0 1px rgba(255,255,255,0.1)`,
                              }}
                            >
                              {/* Event Badge & Time */}
                              <div className={cn(
                                "flex justify-between items-center shrink-0",
                                isShort ? "mb-0.5" : "mb-2"
                              )}>
                                <span 
                                    className={cn(
                                        "font-black uppercase rounded backdrop-blur-sm",
                                        isShort ? "text-[7px] px-1 py-0.5" : "text-[8px] px-1.5 py-0.5",
                                        badgeBg,
                                        textColor
                                    )}
                                >
                                    {category?.name}
                                </span>
                                <span className={cn(
                                    "font-mono font-bold transition-opacity", 
                                    isShort ? "text-[8px] opacity-80" : "text-[10px] opacity-60 group-hover:opacity-100",
                                    subtextColor
                                )}>
                                  {event.startTime} {!isShort && `– ${event.endTime}`}
                                </span>
                              </div>

                              <h5 className={cn(
                                "font-bold uppercase tracking-tight font-rajdhani leading-none", 
                                isShort ? "text-[12px] line-clamp-1 mb-1" : "text-[14px] line-clamp-2 mb-1",
                                textColor
                              )}>
                                {event.title}
                              </h5>
                              
                              <div className="flex flex-col gap-0.5 mt-auto shrink-0">
                                  {event.presenterIds && (
                                      <p className={cn(
                                          "truncate font-bold uppercase tracking-wide", 
                                          isShort ? "text-[7px] opacity-60" : "text-[10px]",
                                          subtextColor
                                      )}>
                                          {getPresenterNames(event.presenterIds)}
                                      </p>
                                  )}
                                  {!isShort && event.location_detail && !isMedium && (
                                      <p className={cn("text-[9px] font-mono uppercase tracking-[0.15em] font-bold truncate", subtextColor)}>
                                          {event.location_detail}
                                      </p>
                                  )}
                              </div>

                              {/* Glass shine effect */}
                              <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[150%] pointer-events-none" />
                            </div>
                          )
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-zinc-500 text-xs font-mono text-center uppercase tracking-widest opacity-40">
        Przesuń tabelę w poziomie, aby zobaczyć wszystkie sale →
      </p>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-graphite/80 backdrop-blur-md" 
            onClick={() => setSelectedEvent(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-zinc-900 border border-white/10 rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header / Banner */}
            <div 
              className="h-4 sm:h-6 w-full"
              style={{ backgroundColor: getCategory(selectedEvent.categoryId)?.color }}
            />
            
            <button 
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
                    color: getCategory(selectedEvent.categoryId)?.color 
                  }}
                >
                  {getCategory(selectedEvent.categoryId)?.name}
                </span>
                <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
                  // {selectedEvent.startTime} – {selectedEvent.endTime}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight font-rajdhani mb-8 text-white leading-none">
                {selectedEvent.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">Dzień</p>
                      <p className="font-bold">{activeDay?.date} · {activeDay?.label}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">Czas</p>
                      <p className="font-bold">{selectedEvent.startTime} – {selectedEvent.endTime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">Miejsce</p>
                      <p className="font-bold">{getRoomName(selectedEvent.roomId)} {selectedEvent.location_detail && <span className="text-zinc-500 font-normal ml-1">({selectedEvent.location_detail})</span>}</p>
                    </div>
                  </div>

                  {selectedEvent.presenterIds && (
                    <div className="flex items-center gap-4 text-zinc-300">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange shrink-0">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">Prowadzący</p>
                        <p className="font-bold">{getPresenterNames(selectedEvent.presenterIds)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedEvent.description && (
                <div className="pt-10 border-t border-white/5">
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {selectedEvent.description}
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
