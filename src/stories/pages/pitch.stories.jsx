import Pitch from '../../app/pitch/page'
import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'

export default {
  title: 'Pages/Pitch a Guest',
  component: Pitch,
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