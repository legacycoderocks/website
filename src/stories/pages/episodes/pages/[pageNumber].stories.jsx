import PageNumber from '../../../../app/episodes/pages/[pageNumber]/page'
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

export const MiddlePage = {
  args: {
    params: {
      pageNumber: '2',
    },
  },
}

export const FirstPage = {
  args: {
    params: {
      pageNumber: '1',
    },
  },
}

export const LastPage = {
  args: {
    params: {
      pageNumber: '16',
    },
  },
}