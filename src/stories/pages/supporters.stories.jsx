import Supporters from '../../pages/supporters'
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

const samplePatrons = [
  {
    title: 'Sustainer',
    amount_cents: 500,
    patrons: [
      { id: '1', full_name: 'Daniel' },
      { id: '2', full_name: 'Edwin Kortman' },
      { id: '3', full_name: 'Peter M Clausen' },
      { id: '4', full_name: 'Richard Giraud' },
      { id: '5', full_name: 'Ryan B Harvey' },
      { id: '6', full_name: 'Subhrajyoti Sen' },
    ],
  },
  {
    title: 'Maintainer',
    amount_cents: 2500,
    patrons: [],
  },
  {
    title: 'Mender',
    amount_cents: 5000,
    patrons: [],
  },
]

export const Default = {
  args: {
    patrons: samplePatrons,
  },
}

export const MultipleTiers = {
  args: {
    patrons: [
      {
        title: 'Sustainer',
        amount_cents: 500,
        patrons: [
          { id: '1', full_name: 'Alice Johnson' },
          { id: '2', full_name: 'Bob Smith' },
          { id: '3', full_name: 'Carol Williams' },
        ],
      },
      {
        title: 'Maintainer',
        amount_cents: 2500,
        patrons: [
          { id: '4', full_name: 'David Brown' },
          { id: '5', full_name: 'Eve Davis' },
        ],
      },
      {
        title: 'Mender',
        amount_cents: 5000,
        patrons: [
          { id: '6', full_name: 'Frank Miller' },
        ],
      },
    ],
  },
}