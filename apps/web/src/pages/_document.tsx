import { Html, Head, Main, NextScript } from 'next/document'

import { inter, barlow } from './_app'

export default function Document() {
  return (
    <Html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <Head />

      <body className="bg-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
