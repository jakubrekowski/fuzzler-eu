import React from 'react'

import { AnchorScroll } from '@/components/AnchorScroll'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <AnchorScroll />
        {children}
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
