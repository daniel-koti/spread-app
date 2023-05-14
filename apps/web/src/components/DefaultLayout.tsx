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
        <div className="max-w-screen-xl mx-auto sm:px-6 lg:px-8 h-full">
          {children}
        </div>
      </main>
    </>
  )
}
