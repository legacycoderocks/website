import Episode from '../../../app/episodes/[episodeNumber]/page'
import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'

export default {
  title: 'Pages/Episode Detail',
  component: Episode,
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

export const Default = {
  args: {
    params: {
      episodeNumber: '162',
    },
  },
}

export const Episode160 = {
  args: {
    params: {
      episodeNumber: '160',
    },
  },
}