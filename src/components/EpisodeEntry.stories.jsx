import { EpisodeEntry } from './EpisodeEntry'
import { AudioProvider } from './AudioProvider'

export default {
  title: 'Components/EpisodeEntry',
  component: EpisodeEntry,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AudioProvider>
        <div className="max-w-3xl">
          <Story />
        </div>
      </AudioProvider>
    ),
  ],
}

const sampleEpisode = {
  id: '12345',
  number: 42,
  title: '42: Understanding Legacy Code',
  published: '2023-04-15T12:00:00Z',
  description: 'In this episode, we explore the intricacies of working with legacy code and discuss strategies for modernizing existing applications. We talk about technical debt, refactoring approaches, and how to make the case for modernization to stakeholders.',
  audio: {
    src: 'https://example.com/episode.mp3',
    type: 'audio/mpeg',
  },
}

export const Default = {
  args: {
    episode: sampleEpisode,
  },
}

export const ShortDescription = {
  args: {
    episode: {
      ...sampleEpisode,
      description: 'A brief episode about legacy code.',
    },
  },
}

export const LongTitle = {
  args: {
    episode: {
      ...sampleEpisode,
      title: '42: Understanding Legacy Code: A Comprehensive Guide to Modernizing Complex Enterprise Applications with Multiple Stakeholders',
    },
  },
}