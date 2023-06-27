import { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Barlow, Inter } from 'next/font/google'

import Head from 'next/head'

import { AuthProvider } from '@/contexts/AuthContext'
import { Toast } from '@/components/UI/Toast'

import dayjs from 'dayjs'

import 'dayjs/locale/pt'

import '@/styles/globals.css'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
})

export const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
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
      <Toast />
      <Head>
        <title>Spread 🦑</title>
      </Head>

      {getLayout(
        <main className="w-full">
          <Component {...pageProps} />
        </main>,
      )}
    </AuthProvider>
  )
}
