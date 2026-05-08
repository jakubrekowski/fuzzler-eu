import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold uppercase tracking-[0.08em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60 font-rajdhani",
  {
    variants: {
      variant: {
        default:
          'rounded-full bg-orange text-graphite shadow-[0_6px_0_0_#B5641F,0_12px_32px_-8px_rgba(255,154,66,0.5)] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#B5641F,0_8px_22px_-8px_rgba(255,154,66,0.5)] active:translate-y-0.5 active:shadow-none',
        destructive:
          'rounded-full bg-red text-cream hover:bg-red/90 shadow-[0_6px_0_0_rgba(0,0,0,0.3)]',
        outline:
          'rounded-full border border-white/10 bg-transparent text-cream hover:bg-white/[0.06] hover:border-cream-dim',
        secondary:
          'rounded-full bg-graphite text-cream border border-white/10 hover:bg-white/[0.06]',
        ghost:
          'rounded-full text-cream hover:bg-white/[0.06]',
        link: 'text-orange underline-offset-4 hover:underline font-semibold uppercase tracking-[0.06em]',
      },
      size: {
        clear: '',
        default: 'h-12 px-6 text-sm',
        sm: 'h-9 px-4 text-[13px]',
        lg: 'h-14 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
