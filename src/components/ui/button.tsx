import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold uppercase tracking-[0.08em] transition-all duration-150 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60 font-rajdhani",
  {
    variants: {
      variant: {
        default:
          'bg-orange text-graphite shadow-[0_6px_0_0_#B5641F] hover:translate-y-0.5 hover:shadow-[0_4px_0_0_#B5641F]',
        destructive:
          'bg-red text-cream hover:bg-red/90 shadow-[0_6px_0_0_rgba(0,0,0,0.3)] hover:translate-y-0.5',
        outline:
          'border border-white/10 bg-transparent text-cream hover:bg-white/[0.06] hover:border-cream-dim shadow-none hover:translate-y-0 hover:shadow-none',
        secondary:
          'bg-graphite text-cream border border-white/10 hover:bg-white/[0.06] shadow-[0_6px_0_0_rgba(0,0,0,0.4)] hover:-translate-y-0.5',
        ghost:
          'text-cream hover:bg-white/[0.06] shadow-none hover:translate-y-0 hover:shadow-none',
        link: 'text-orange underline-offset-4 hover:underline font-semibold uppercase tracking-[0.06em] shadow-none hover:translate-y-0',
        disabled:
          'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 grayscale pointer-events-none shadow-none hover:translate-y-0',
      },
      size: {
        clear: '',
        sm: 'px-4 py-2.5 text-[13px]',
        default: 'px-5 py-2.5 text-sm',
        lg: 'px-8 py-3.5 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export function ButtonArrow({ className }: { className?: string }) {
  return <span className={cn('-rotate-45 inline-block font-black', className)}>→</span>
}

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
