import Supporters from '../../app/supporters/page'
import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'

export default {
  title: 'Pages/Supporters',
  component: Supporters,
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

export const MultipleTiers = {
  parameters: {
    mockScenario: 'multipleTiers',
  },
}