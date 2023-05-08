import { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'

import Head from 'next/head'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { sessions, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AuthProvider>
      <Toaster richColors theme="light" position="top-center" closeButton />
      <Head>
        <title>Spread 🦑</title>
      </Head>

      {getLayout(
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>,
      )}
    </AuthProvider>
  )
}
