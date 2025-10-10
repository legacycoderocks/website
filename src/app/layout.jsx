import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import 'focus-visible'

export const metadata = {
  title: 'Legacy Code Rocks - Explore the world of modernizing existing software applications',
  description: 'Explore the world of modernizing existing software applications',
}

export default function RootLayout({ children }) {
  return (
    <html className="antialiased h-full bg-brand-yellow-100" lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
        <link rel="icon" sizes="192x192" href="/favicon-192.png" />
        <link rel="shortcut icon" href="/favicon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-192.png" type="image/png" />
      </head>
      <body className="h-full">
        <AudioProvider>
          <Layout>
            {children}
          </Layout>
        </AudioProvider>
      </body>
    </html>
  )
}
