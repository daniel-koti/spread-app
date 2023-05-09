import { Sidebar } from '@/components/Sidebar'
import React from 'react'
import { Header } from './Header'

interface DefaultLayoutProps {
  children: React.ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex gap-2 h-screen bg-zinc-800 p-4">
      <Sidebar />
      <main className="flex-1 bg-white p-4 rounded-3xl overflow-hidden">
        <Header />
        <div className="overflow-auto h-full mt-4 py-6">{children}</div>
      </main>
    </div>
  )
}
