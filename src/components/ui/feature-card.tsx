import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utilities/ui"
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'

const featureCardVariants = cva(
  "relative group p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden",
  {
    variants: {
      color: {
        purple: "bg-[#1a0b2e] border-purple-500/20 hover:border-purple-400/40 shadow-[0_0_40px_rgba(147,51,234,0.05)]",
        brown: "bg-[#2b1b12] border-orange-900/20 hover:border-orange-800/40 shadow-[0_0_40px_rgba(124,45,18,0.05)]",
        green: "bg-[#131d13] border-green-900/20 hover:border-green-800/40 shadow-[0_0_40px_rgba(20,83,45,0.05)]",
      },
    },
    defaultVariants: {
      color: "purple",
    },
  }
)

const bgGradientVariants = cva(
  "absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500",
  {
    variants: {
      color: {
        purple: "bg-gradient-to-br from-purple-500 to-transparent",
        brown: "bg-gradient-to-br from-orange-800 to-transparent",
        green: "bg-gradient-to-br from-green-800 to-transparent",
      },
    },
    defaultVariants: {
      color: "purple",
    },
  }
)

const iconBoxVariants = cva(
  "w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden p-2.5 transition-all duration-500 relative z-10",
  {
    variants: {
      color: {
        purple: "bg-purple-950/40 border-purple-500/30 text-purple-400 group-hover:bg-purple-900/60 group-hover:border-purple-400/50",
        brown: "bg-orange-950/40 border-orange-900/30 text-orange-400 group-hover:bg-orange-900/60 group-hover:border-orange-400/50",
        green: "bg-green-950/40 border-green-900/30 text-green-400 group-hover:bg-green-900/60 group-hover:border-green-400/50",
      },
    },
    defaultVariants: {
      color: "purple",
    },
  }
)

interface FeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureCardVariants> {
  iconName?: string
  index?: number
  footerLeft?: string
  footerRight?: string
  href?: string
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, color, iconName, index, title, children, footerLeft, footerRight, href, ...props }, ref) => {
    // @ts-ignore
    const Icon = iconName ? LucideIcons[iconName] || LucideIcons.HelpCircle : null

    const CardContent = (
      <>
        <div className={cn(bgGradientVariants({ color }))} />
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className={cn(iconBoxVariants({ color }))}>
            {Icon && <Icon size={24} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />}
          </div>
          <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest">
            // {index !== undefined ? String(index + 1).padStart(2, '0') : '01'}
          </span>
        </div>

        <h3 className="text-3xl font-bold uppercase mb-4 tracking-tight font-rajdhani leading-none relative z-10">
          {title}
        </h3>
        
        <div className="text-zinc-400 text-[22px] leading-tight mb-12 flex-1 relative z-10">
          {children}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest opacity-60 relative z-10">
          <span>{footerLeft}</span>
          {(footerRight || href) && (
            <div className="flex items-center gap-2 group-hover:text-white transition-colors cursor-pointer">
              <span>{footerRight}</span>
              {href && (
                <svg 
                  width="8" 
                  height="8" 
                  viewBox="0 0 8 8" 
                  fill="none" 
                  className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M1 7L7 1M7 1H2M7 1V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          )}
        </div>
      </>
    )

    if (href) {
      return (
        <Link
          href={href}
          className={cn(featureCardVariants({ color, className }))}
          // @ts-ignore
          ref={ref}
        >
          {CardContent}
        </Link>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(featureCardVariants({ color, className }))}
        {...props}
      >
        {CardContent}
      </div>
    )
  }
)
FeatureCard.displayName = "FeatureCard"

export { FeatureCard, featureCardVariants }
