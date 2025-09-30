import PageNumber from '../../../../pages/episodes/pages/[pageNumber]'
import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'

export default {
  title: 'Pages/Episode List',
  component: PageNumber,
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
  id: `${152 - i}`,
  number: 152 - i,
  title: `${152 - i}: Episode Title ${152 - i}`,
  published: new Date(2024, 7, 16 - i).toISOString(),
  description: `This is a sample description for episode ${152 - i}. It contains information about the topics discussed and the guests featured.`,
  audio: {
    src: 'https://example.com/episode.mp3',
    type: 'audio/mpeg',
  },
}))

export const MiddlePage = {
  args: {
    pageNumber: 2,
    episodesForCurrentPage: sampleEpisodes,
    allPageNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
}

export const FirstPage = {
  args: {
    pageNumber: 1,
    episodesForCurrentPage: sampleEpisodes,
    allPageNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
}

export const LastPage = {
  args: {
    pageNumber: 10,
    episodesForCurrentPage: sampleEpisodes.slice(0, 5),
    allPageNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
}