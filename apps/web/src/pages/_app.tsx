import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'

import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Toaster richColors theme="light" position="top-center" closeButton />
      <Head>
        <title>Spread 🦑</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
