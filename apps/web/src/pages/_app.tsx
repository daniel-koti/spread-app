import { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Barlow, Heebo } from 'next/font/google'
import Head from 'next/head'

import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'

import dayjs from 'dayjs'
import 'dayjs/locale/pt'

import '@/styles/globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
})

export const heebo = Heebo({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-heebo',
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { sessions, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  dayjs.locale('pt')

  return (
    <AuthProvider>
      <Toaster richColors theme="light" position="top-center" closeButton />
      <Head>
        <title>Spread 🦑</title>
      </Head>

      {getLayout(
        <main className={`${barlow.variable} font-sans`}>
          <Component {...pageProps} />
        </main>,
      )}
    </AuthProvider>
  )
}
