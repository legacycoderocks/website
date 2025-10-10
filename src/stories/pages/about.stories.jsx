import About from '../../app/about/page'
import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'

export default {
  title: 'Pages/About',
  component: About,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AudioProvider>
        <Layout>
          <Story />
        </Layout>
      </AudioProvider>
    ),
  ],
}

export const Default = {}