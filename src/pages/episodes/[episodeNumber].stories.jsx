import Episode from './[episodeNumber]'
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

const sampleEpisode = {
  id: '162',
  number: 162,
  title: '162: Innovation in Legacy with Dave Thomas',
  published: '2024-09-16T12:00:00Z',
  description:
    'There are three groups of people around every legacy system - those who are stuck with it, those who don\'t want to be with it, and those who love it and see its value.',
  audio: {
    src: 'https://example.com/episode.mp3',
    type: 'audio/mpeg',
  },
  content: `
    <h2>Introduction</h2>
    <p>Welcome to this episode where we discuss innovation in legacy systems.</p>

    <h2>Main Topics</h2>
    <ul>
      <li>Understanding legacy code</li>
      <li>Strategies for modernization</li>
      <li>Working with stakeholders</li>
    </ul>

    <h2>Key Takeaways</h2>
    <p>Legacy code is not always bad code. It's code that has served its purpose and continues to provide value.</p>
  `,
}

export const Default = {
  args: {
    episode: sampleEpisode,
  },
}

export const LongContent = {
  args: {
    episode: {
      ...sampleEpisode,
      content: `
        <h2>Introduction</h2>
        <p>This is a much longer episode with extensive show notes and detailed information about the topics discussed.</p>

        <h2>Main Topics</h2>
        <p>We covered several important topics in this episode:</p>
        <ul>
          <li>Understanding the history of legacy systems</li>
          <li>Technical debt and its impact</li>
          <li>Refactoring strategies</li>
          <li>Team communication</li>
          <li>Documentation practices</li>
        </ul>

        <h2>Guest Background</h2>
        <p>Our guest has over 20 years of experience working with legacy systems across various industries.</p>

        <h2>Resources Mentioned</h2>
        <ul>
          <li>Working Effectively with Legacy Code by Michael Feathers</li>
          <li>Refactoring by Martin Fowler</li>
          <li>The Pragmatic Programmer</li>
        </ul>

        <h2>Key Takeaways</h2>
        <p>Legacy systems are valuable assets that deserve respect and careful maintenance.</p>
      `,
    },
  },
}