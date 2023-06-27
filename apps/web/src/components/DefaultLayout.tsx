import React from 'react'
import { Sidebar } from './UI/Sidebar'

interface DefaultLayoutProps {
  children: React.ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 overflow-scroll">{children}</main>
    </div>
  )
}
