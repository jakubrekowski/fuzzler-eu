'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'
import { Plus, X } from 'lucide-react'

export const FAQBlockComponent: React.FC<FAQBlockProps> = (props) => {
  const { tagline, title, description, questions, anchor } = props
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="container py-24" id={anchor || undefined}>
      {/* Classic Section Header (Left-Right) */}
      {(tagline || title || description) && (
        <SectionHeader 
          tagline={tagline || undefined} 
          title={title || ''} 
          description={description || undefined}
          className="mb-12" // Reduced margin
        />
      )}

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {questions?.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div 
              key={index}
              className={cn(
                "group rounded-[32px] border transition-all duration-500 overflow-hidden",
                isOpen 
                  ? "bg-[#1c1c1c] border-orange/20 shadow-[0_0_40px_-10px_rgba(255,144,0,0.1)]" 
                  : "bg-zinc-900/30 border-white/5 hover:border-white/10"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-7 sm:p-9 text-left outline-none"
              >
                <span className={cn(
                  "font-mono text-sm sm:text-[15px] font-black uppercase tracking-widest transition-colors duration-300",
                  isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                )}>
                  {item.question}
                </span>
                
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ml-6",
                  isOpen 
                    ? "bg-orange text-graphite" 
                    : "bg-white/5 text-zinc-500 group-hover:bg-white/10 group-hover:text-zinc-300"
                )}>
                  {isOpen ? <X size={20} strokeWidth={4} /> : <Plus size={20} strokeWidth={4} />}
                </div>
              </button>

              <div className={cn(
                "grid transition-all duration-500 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}>
                <div className="overflow-hidden">
                  <div className="p-7 sm:p-9 pt-0">
                    <p className="text-zinc-400 font-mono text-sm sm:text-base leading-relaxed uppercase tracking-wide max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
