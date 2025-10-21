import Home from '../../app/page'
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

export const Default = {
  parameters: {
    mockScenario: 'default',
  },
}

export const FewEpisodes = {
  parameters: {
    mockScenario: 'fewEpisodes',
  },
}

export const SinglePage = {
  parameters: {
    mockScenario: 'singlePage',
  },
}