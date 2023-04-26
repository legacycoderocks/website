import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="antialiased h-full bg-brand-yellow-100" lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
        <link rel="icon" sizes="192x192" href="/favicon-192.png"></link>
        <link rel="shortcut icon" href="/favicon-192.png" type="image/png"></link>
        <link rel="apple-touch-icon" href="/favicon-192.png" type="image/png"></link>
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
