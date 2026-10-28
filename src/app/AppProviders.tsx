import type { ReactNode } from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import { ToastProvider } from '../context/ToastContext'
import { OutletProvider } from '../context/OutletContext'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <ToastProvider>
      <OutletProvider>{children}</OutletProvider>
    </ToastProvider>
  </ThemeProvider>
)
