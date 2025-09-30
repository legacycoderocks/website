import Home from './index'
import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'

export default {
  title: 'Pages/Home',
  component: Home,
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

const sampleEpisodes = Array.from({ length: 10 }, (_, i) => ({
  id: `${162 - i}`,
  number: 162 - i,
  title: `${162 - i}: Episode Title ${162 - i}`,
  published: new Date(2024, 8, 16 - i).toISOString(),
  description: `This is a sample description for episode ${162 - i}. It contains information about the topics discussed and the guests featured.`,
  audio: {
    src: 'https://example.com/episode.mp3',
    type: 'audio/mpeg',
  },
}))

export const Default = {
  args: {
    pageOneEpisodes: sampleEpisodes,
    allPageNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
}

export const FirstPage = {
  args: {
    pageOneEpisodes: sampleEpisodes,
    allPageNumbers: [1],
  },
}

export const FewEpisodes = {
  args: {
    pageOneEpisodes: sampleEpisodes.slice(0, 3),
    allPageNumbers: [1, 2],
  },
}