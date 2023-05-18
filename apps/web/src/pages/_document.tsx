import { Html, Head, Main, NextScript } from 'next/document'

import { heebo } from './_app'

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body className={`${heebo.variable} font-alt bg-slate-100`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
