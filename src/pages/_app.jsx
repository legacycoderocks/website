import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => 
    <AudioProvider>
      <Layout>
        {page}
      </Layout>
    </AudioProvider>
  )

  return getLayout(<Component {...pageProps} />)
}
