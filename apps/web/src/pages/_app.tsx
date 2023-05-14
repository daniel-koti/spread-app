import { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Barlow } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'

import dayjs from 'dayjs'
import 'dayjs/locale/pt'

import Head from 'next/head'

import '@/styles/globals.css'

const poppins = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>,
      )}
    </AuthProvider>
  )
}
