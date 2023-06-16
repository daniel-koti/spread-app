import React from 'react'
import { Header } from './UI/Header'

interface DefaultLayoutProps {
  children: React.ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <main className="h-full">
        <div className="">{children}</div>
      </main>
    </>
  )
}
