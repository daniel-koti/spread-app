import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'sonner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster richColors theme="light" position="top-center" closeButton />
      <Component {...pageProps} />
    </>
  )
}
