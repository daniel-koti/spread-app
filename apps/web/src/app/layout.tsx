import '../lib/dayjs'

import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Space_Grotesk as SpaceGrotesk } from 'next/font/google'

import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toast } from '@/components/Toast'

const spaceGrotesk = SpaceGrotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Spread | Gestão de eventos',
  description: 'SPREAD | Plataforma de divulgação de eventos.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt_BR">
      <body
        className={`${spaceGrotesk.className} bg-zinc-100 relative min-h-screen`}
      >
        <AuthProvider>
          <Toast />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
