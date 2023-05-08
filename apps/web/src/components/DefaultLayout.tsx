import { Sidebar } from '@/components/Sidebar'
import React from 'react'

interface DefaultLayoutProps {
  children: React.ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex p-8 gap-8 h-screen">
      <Sidebar />
      <div className="flex-col flex-1">
        <main>{children}</main>
      </div>
    </div>
  )
}
